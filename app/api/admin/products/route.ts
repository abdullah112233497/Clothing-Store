import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";
import { parseAdminMetadata, resolveCategoryId, syncProductImages, syncProductVariants, validateImages } from "@/lib/admin-products";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const products = await sql`SELECT p.*, c.name category,c.slug category_slug,pc.slug parent_category_slug,b.name brand,
    COALESCE((SELECT jsonb_agg(jsonb_build_object('id',pi.id,'url',pi.url,'altText',pi.alt_text,'isPrimary',pi.is_primary) ORDER BY pi.sort_order,pi.id) FROM product_images pi WHERE pi.product_id=p.id),'[]'::jsonb) images,
    COALESCE((SELECT SUM(pv.stock_quantity) FROM product_variants pv WHERE pv.product_id=p.id AND pv.is_active=TRUE),0) stock,
    COALESCE((SELECT jsonb_agg(DISTINCT jsonb_build_object('code',a.code,'value',av.value,'displayValue',av.display_value,'colorHex',av.color_hex))
      FROM product_variants pv JOIN variant_attribute_values vav ON vav.variant_id=pv.id JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id
      WHERE pv.product_id=p.id AND pv.is_active=TRUE),'[]'::jsonb) variant_options
    FROM products p JOIN categories c ON c.id=p.category_id LEFT JOIN categories pc ON pc.id=c.parent_id LEFT JOIN brands b ON b.id=p.brand_id WHERE p.status <> 'archived' ORDER BY p.created_at DESC`;
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const body = await request.json();
  const name=String(body.name||'').trim(), slug=String(body.slug||name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')).trim().toLowerCase(), sku=String(body.sku||'').trim().toUpperCase();
  const price=Number(body.price), salePrice=body.salePrice==null?null:Number(body.salePrice), categoryId=await resolveCategoryId(body);
  if (!name || !/^[a-z0-9-]+$/.test(slug) || !/^[A-Z0-9-]{2,60}$/.test(sku) || !categoryId || !Number.isFinite(price) || price<0 || (salePrice != null && (!Number.isFinite(salePrice) || salePrice < 0))) return NextResponse.json({ error: "Name, category, price and a SKU containing only letters, numbers and hyphens are required." }, { status: 400 });
  let createdId: number | null = null;
  try {
    const metadata=parseAdminMetadata(body), images=validateImages(body.images);
    const rows=await sql`INSERT INTO products(category_id,brand_id,name,slug,description,base_sku,base_price,sale_price,status,weight_grams,admin_metadata)
      VALUES(${categoryId},${body.brandId ? Number(body.brandId):null},${name},${slug},${String(body.description||'')},${sku},${price},${salePrice},${body.status==='active'?'active':'draft'},${body.weightGrams==null?null:Number(body.weightGrams)},${JSON.stringify(metadata)}::jsonb) RETURNING *`;
    createdId=Number(rows[0].id);
    await syncProductVariants({ productId:createdId,baseSku:sku,price,salePrice,stock:Number(body.stock||0),metadata });
    await syncProductImages(createdId,name,images);
    return NextResponse.json({ success:true,product:rows[0] },{status:201});
  } catch (error) {
    console.error("Admin product create:",error);
    if (createdId) await sql`DELETE FROM products WHERE id=${createdId}`.catch(() => undefined);
    return NextResponse.json({ error:error instanceof Error ? error.message : "Unable to create product." },{status:409});
  }
}
