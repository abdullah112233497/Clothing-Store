import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const inventory = await sql`SELECT pv.id variant_id,p.id product_id,p.name,c.name category,pv.sku,
    pv.stock_quantity,pv.reserved_quantity,pv.low_stock_threshold,pv.is_active,
    COALESCE((SELECT SUM(-quantity_change) FROM inventory_movements im WHERE im.variant_id=pv.id AND im.reason='order_placed'),0) sold,
    COALESCE((SELECT jsonb_object_agg(a.code,av.value) FROM variant_attribute_values vav JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE vav.variant_id=pv.id),'{}'::jsonb) options
    FROM product_variants pv JOIN products p ON p.id=pv.product_id JOIN categories c ON c.id=p.category_id
    WHERE p.status <> 'archived' AND pv.is_active=TRUE ORDER BY p.name,pv.sku`;
  return NextResponse.json({ inventory });
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const { variantId, stockQuantity, reason = "admin_adjustment" } = await request.json();
  const id = Number(variantId); const stock = Number(stockQuantity);
  if (!Number.isInteger(id) || !Number.isInteger(stock) || stock < 0) return NextResponse.json({ error: "Valid variant and non-negative stock are required." }, { status: 400 });
  const rows = await sql`WITH previous AS (SELECT id,stock_quantity FROM product_variants WHERE id=${id} FOR UPDATE),
    changed AS (UPDATE product_variants pv SET stock_quantity=${stock},updated_at=NOW() FROM previous p WHERE pv.id=p.id AND ${stock}>=pv.reserved_quantity RETURNING pv.*,p.stock_quantity old_stock),
    movement AS (INSERT INTO inventory_movements(variant_id,quantity_change,reason,created_by) SELECT id,stock_quantity-old_stock,${String(reason)},${admin.id} FROM changed)
    SELECT * FROM changed`;
  return rows[0] ? NextResponse.json({ success: true, variant: rows[0] }) : NextResponse.json({ error: "Variant not found or stock is below reserved quantity." }, { status: 409 });
}
