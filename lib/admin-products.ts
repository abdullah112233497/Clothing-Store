import { sql } from "@/lib/db";
import { isCloudinaryImageUrl } from "@/lib/product-images";

export type AdminColor = { name: string; hex: string };
export type AdminProductMetadata = {
  productType: string;
  fitType: string;
  fabric: string;
  season: string;
  sizeSystem: "alpha" | "waist" | "footwear" | "free";
  sizes: string[];
  colors: AdminColor[];
};

const cleanList = (values: unknown, limit: number) =>
  Array.isArray(values)
    ? [...new Set(values.map((value) => String(value).trim()).filter(Boolean))].slice(0, limit)
    : [];

export function parseAdminMetadata(body: Record<string, unknown>): AdminProductMetadata {
  const sizeSystem = ["alpha", "waist", "footwear", "free"].includes(String(body.sizeSystem))
    ? String(body.sizeSystem) as AdminProductMetadata["sizeSystem"]
    : "alpha";
  const sizes = sizeSystem === "free" ? ["Standard"] : cleanList(body.sizes, 20);
  const rawColors = Array.isArray(body.colors) ? body.colors : [];
  const colors = rawColors
    .map((color) => {
      const value = color as Record<string, unknown>;
      return { name: String(value.name || "").trim(), hex: String(value.hex || "#111111").trim() };
    })
    .filter((color) => color.name && /^#[0-9a-f]{6}$/i.test(color.hex))
    .slice(0, 20);
  return {
    productType: String(body.productType || "Apparel").trim().slice(0, 150),
    fitType: String(body.fitType || "Regular Fit").trim().slice(0, 100),
    fabric: String(body.fabric || "Premium Fabric").trim().slice(0, 200),
    season: String(body.season || "All-Season Essential").trim().slice(0, 100),
    sizeSystem,
    sizes: sizes.length ? sizes : ["Standard"],
    colors: colors.length ? colors : [{ name: "Standard", hex: "#111111" }],
  };
}

export function validateImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const images = [...new Set(value.map((item) => String(item).trim()).filter(Boolean))].slice(0, 10);
  for (const image of images) {
    if (!isCloudinaryImageUrl(image)) {
      throw new Error("Every product image must be uploaded to Cloudinary first.");
    }
    if (image.length > 1_000) throw new Error("A Cloudinary image URL is too long.");
  }
  return images;
}

export async function resolveCategoryId(body: Record<string, unknown>) {
  const categoryId = Number(body.categoryId);
  if (Number.isInteger(categoryId) && categoryId > 0) {
    const rows = await sql`SELECT id FROM categories WHERE id=${categoryId} LIMIT 1`;
    return rows[0] ? Number(rows[0].id) : null;
  }
  const slug = String(body.categorySlug || "").trim().toLowerCase();
  const name = String(body.categoryName || "").trim();
  const rows = await sql`SELECT id FROM categories WHERE slug=${slug} OR LOWER(name)=LOWER(${name}) ORDER BY parent_id NULLS LAST LIMIT 1`;
  return rows[0] ? Number(rows[0].id) : null;
}

export async function syncProductImages(productId: number, name: string, images: string[]) {
  const records = images.map((url, index) => ({ url, altText: name, sortOrder: index, isPrimary: index === 0 }));
  await sql`WITH removed AS (DELETE FROM product_images WHERE product_id=${productId})
    INSERT INTO product_images(product_id,url,alt_text,sort_order,is_primary)
    SELECT ${productId},x.url,x."altText",x."sortOrder",x."isPrimary"
    FROM jsonb_to_recordset(${JSON.stringify(records)}::jsonb)
      AS x(url text,"altText" text,"sortOrder" integer,"isPrimary" boolean)`;
}

const optionCode = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "STD";
const sizeValue = (value: string, system: AdminProductMetadata["sizeSystem"]) => {
  if (system === "waist") return value.replace(/[^0-9.]/g, "");
  if (system === "footwear") return value.replace(/[^0-9.]/g, "");
  return value;
};

export async function syncProductVariants(args: {
  productId: number;
  baseSku: string;
  price: number;
  salePrice: number | null;
  stock: number;
  metadata: AdminProductMetadata;
}) {
  const { productId, baseSku, price, salePrice, metadata } = args;
  const sizeCode = metadata.sizeSystem === "waist" ? "waist" : metadata.sizeSystem === "footwear" ? "shoe_size" : "size";
  const sizes = metadata.sizeSystem === "free" ? ["Standard"] : metadata.sizes;
  const colors = metadata.colors;
  const combinations = sizes.flatMap((size) => colors.map((color) => ({ size, color })));
  if (!combinations.length || combinations.length > 100) throw new Error("A product must have between 1 and 100 size/color combinations.");

  const attributeIds: { size?: number; color: number } = { color: 0 };
  const colorAttribute = await sql`INSERT INTO attributes(name,code,display_type,is_variant) VALUES('Color','color','color',TRUE)
    ON CONFLICT(code) DO UPDATE SET is_variant=TRUE RETURNING id`;
  attributeIds.color = Number(colorAttribute[0].id);
  if (metadata.sizeSystem !== "free") {
    const label = metadata.sizeSystem === "waist" ? "Waist" : metadata.sizeSystem === "footwear" ? "Shoe Size" : "Clothing Size";
    const sizeAttribute = await sql`INSERT INTO attributes(name,code,display_type,is_variant) VALUES(${label},${sizeCode},'select',TRUE)
      ON CONFLICT(code) DO UPDATE SET is_variant=TRUE RETURNING id`;
    attributeIds.size = Number(sizeAttribute[0].id);
  }

  const colorValueIds = new Map<string, number>();
  for (const color of colors) {
    const rows = await sql`INSERT INTO attribute_values(attribute_id,value,display_value,color_hex)
      VALUES(${attributeIds.color},${color.name},${color.name},${color.hex})
      ON CONFLICT(attribute_id,value) DO UPDATE SET display_value=EXCLUDED.display_value,color_hex=EXCLUDED.color_hex RETURNING id`;
    colorValueIds.set(color.name, Number(rows[0].id));
  }
  const sizeValueIds = new Map<string, number>();
  if (attributeIds.size) for (const size of sizes) {
    const value = sizeValue(size, metadata.sizeSystem);
    const rows = await sql`INSERT INTO attribute_values(attribute_id,value,display_value)
      VALUES(${attributeIds.size},${value},${size})
      ON CONFLICT(attribute_id,value) DO UPDATE SET display_value=EXCLUDED.display_value RETURNING id`;
    sizeValueIds.set(size, Number(rows[0].id));
  }

  const totalStock = Math.max(0, Math.floor(Number(args.stock) || 0));
  const baseQuantity = Math.floor(totalStock / combinations.length);
  const remainder = totalStock % combinations.length;
  const variants = combinations.map((item, index) => ({
    sku: `${baseSku}-${metadata.sizeSystem === "free" ? "STD" : optionCode(item.size)}-${optionCode(item.color.name)}`,
    stock: baseQuantity + (index < remainder ? 1 : 0),
    sizeValueId: metadata.sizeSystem === "free" ? null : sizeValueIds.get(item.size) || null,
    colorValueId: colorValueIds.get(item.color.name)!,
  }));
  if (new Set(variants.map((item) => item.sku)).size !== variants.length) throw new Error("Some selected options produce duplicate variant SKUs. Rename the duplicate size or color.");
  const duplicate = await sql`SELECT sku FROM product_variants WHERE sku=ANY(${variants.map((item) => item.sku)}::text[]) AND product_id<>${productId} LIMIT 1`;
  if (duplicate[0]) throw new Error(`Variant SKU ${duplicate[0].sku} is already in use.`);

  const links = variants.flatMap((variant) => [
    { sku: variant.sku, attributeValueId: variant.colorValueId },
    ...(variant.sizeValueId ? [{ sku: variant.sku, attributeValueId: variant.sizeValueId }] : []),
  ]);
  await sql`WITH incoming AS (
      SELECT * FROM jsonb_to_recordset(${JSON.stringify(variants)}::jsonb) AS x(sku text,stock integer)
    ), disabled AS (
      UPDATE product_variants pv SET is_active=FALSE,updated_at=NOW()
      WHERE pv.product_id=${productId} AND NOT EXISTS(SELECT 1 FROM incoming i WHERE i.sku=pv.sku)
    )
      INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity,is_active)
      SELECT ${productId},sku,${price},${salePrice},stock,TRUE FROM incoming
      ON CONFLICT(sku) DO UPDATE SET price=EXCLUDED.price,sale_price=EXCLUDED.sale_price,
        stock_quantity=GREATEST(EXCLUDED.stock_quantity,product_variants.reserved_quantity),is_active=TRUE,updated_at=NOW()
      RETURNING id,sku`;
  await sql`DELETE FROM variant_attribute_values WHERE variant_id IN (
    SELECT id FROM product_variants WHERE product_id=${productId} AND sku=ANY(${variants.map((item) => item.sku)}::text[]))`;
  await sql`WITH incoming_links AS (
      SELECT * FROM jsonb_to_recordset(${JSON.stringify(links)}::jsonb) AS x(sku text,"attributeValueId" integer)
    )
    INSERT INTO variant_attribute_values(variant_id,attribute_value_id)
    SELECT pv.id,l."attributeValueId" FROM incoming_links l JOIN product_variants pv ON pv.sku=l.sku AND pv.product_id=${productId} ON CONFLICT DO NOTHING`;
}
