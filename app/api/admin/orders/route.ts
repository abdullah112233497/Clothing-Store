import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";
import { serializeOrder } from "@/lib/orders";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();
  if (user.role !== "admin") return forbidden();
  const rows = await sql`SELECT o.*, COALESCE(jsonb_agg(jsonb_build_object('id',oi.id,'name',oi.product_name,'sku',oi.sku,'variantId',oi.variant_id,'attributes',oi.variant_snapshot,'image',oi.image_url,'quantity',oi.quantity,'price',oi.unit_price,'lineTotal',oi.line_total) ORDER BY oi.id) FILTER (WHERE oi.id IS NOT NULL),'[]'::jsonb) items FROM orders o LEFT JOIN order_items oi ON oi.order_id=o.id GROUP BY o.id ORDER BY o.created_at DESC`;
  return NextResponse.json({ orders: rows.map(serializeOrder) });
}
