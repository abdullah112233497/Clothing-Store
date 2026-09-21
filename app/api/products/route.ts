import { NextRequest, NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    await initDb();
    const slug = request.nextUrl.searchParams.get("slug");
    const category = request.nextUrl.searchParams.get("category");
    const rows = await sql`SELECT p.id,p.name,p.slug,p.description,p.base_sku,
      p.base_price,p.sale_price,c.name category,c.slug category_slug,b.name brand,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('url',pi.url,'alt',pi.alt_text,'primary',pi.is_primary) ORDER BY pi.sort_order) FROM product_images pi WHERE pi.product_id=p.id),'[]'::jsonb) images,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('id',pv.id,'sku',pv.sku,'price',COALESCE(pv.sale_price,pv.price,p.sale_price,p.base_price),'stock',pv.stock_quantity-pv.reserved_quantity,'available',pv.is_active AND pv.stock_quantity>pv.reserved_quantity,'options',COALESCE((SELECT jsonb_object_agg(a.code,jsonb_build_object('label',a.name,'value',av.value,'displayValue',COALESCE(av.display_value,av.value),'colorHex',av.color_hex)) FROM variant_attribute_values vav JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE vav.variant_id=pv.id),'{}'::jsonb)) ORDER BY pv.id) FROM product_variants pv WHERE pv.product_id=p.id AND pv.is_active=TRUE),'[]'::jsonb) variants,
      COALESCE((SELECT jsonb_agg(jsonb_build_object('code',a.code,'name',a.name,'displayType',a.display_type,'required',ca.is_required,'variant',a.is_variant) ORDER BY ca.sort_order) FROM category_attributes ca JOIN attributes a ON a.id=ca.attribute_id WHERE ca.category_id=p.category_id),'[]'::jsonb) attributes
      FROM products p JOIN categories c ON c.id=p.category_id LEFT JOIN brands b ON b.id=p.brand_id
      WHERE p.status='active' AND (${slug}::text IS NULL OR p.slug=${slug}) AND (${category}::text IS NULL OR c.slug=${category})
      ORDER BY p.created_at DESC`;
    return NextResponse.json({ products: rows.map((row) => ({ ...row, base_price: Number(row.base_price), sale_price: row.sale_price == null ? null : Number(row.sale_price) })) });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}
