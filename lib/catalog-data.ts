import "server-only";

import { initDb, sql } from "@/lib/db";
import { searchProducts, type SearchableProduct } from "@/lib/product-search";

export type CatalogFilter = {
  slug?: string | null;
  category?: string | null;
  search?: string | null;
  limit?: number;
};

async function readCatalog(slug: string | null, category: string | null) {
    await initDb();
    const rows = await sql`SELECT p.id,p.name,p.slug,p.description,p.base_sku,
      p.base_price,p.sale_price,c.name category,c.slug category_slug,b.name brand,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('url',pi.url,'alt',pi.alt_text,'primary',pi.is_primary) ORDER BY pi.sort_order,pi.id) FROM product_images pi WHERE pi.product_id=p.id),'[]'::jsonb) images,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('id',pv.id,'sku',pv.sku,'price',COALESCE(pv.sale_price,pv.price,p.sale_price,p.base_price),'stock',pv.stock_quantity-pv.reserved_quantity,'available',TRUE,'options',COALESCE((SELECT jsonb_object_agg(a.code,jsonb_build_object('label',a.name,'value',av.value,'displayValue',COALESCE(av.display_value,av.value),'colorHex',av.color_hex)) FROM variant_attribute_values vav JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE vav.variant_id=pv.id),'{}'::jsonb)) ORDER BY pv.id) FROM product_variants pv WHERE pv.product_id=p.id AND pv.is_active=TRUE AND pv.stock_quantity>pv.reserved_quantity),'[]'::jsonb) variants,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('code',a.code,'name',a.name,'displayType',a.display_type,'required',ca.is_required,'variant',a.is_variant) ORDER BY ca.sort_order) FROM category_attributes ca JOIN attributes a ON a.id=ca.attribute_id WHERE ca.category_id=p.category_id),'[]'::jsonb) attributes
      FROM products p JOIN categories c ON c.id=p.category_id LEFT JOIN brands b ON b.id=p.brand_id
      WHERE p.status='active' AND (${slug}::text IS NULL OR p.slug=${slug}) AND (${category}::text IS NULL OR c.slug=${category})
        AND EXISTS (SELECT 1 FROM product_variants available_variant
          WHERE available_variant.product_id=p.id AND available_variant.is_active=TRUE
            AND available_variant.stock_quantity>available_variant.reserved_quantity)
      ORDER BY p.created_at DESC`;

    return rows.map((row) => ({
      ...row,
      base_price: Number(row.base_price),
      sale_price: row.sale_price == null ? null : Number(row.sale_price),
    }));
}

export async function getCatalogProducts(filter: CatalogFilter = {}) {
  const products = await readCatalog(filter.slug || null, filter.category || null);
  const matching = filter.search
    ? searchProducts(products as Array<(typeof products)[number] & SearchableProduct>, filter.search)
    : products;
  return filter.limit ? matching.slice(0, filter.limit) : matching;
}
