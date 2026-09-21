import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { initDb, sql } from "@/lib/db";
import { OrderError, placeOrder, serializeOrder } from "@/lib/orders";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return unauthorized();
    const rows = await sql`SELECT o.*, COALESCE(jsonb_agg(jsonb_build_object('id',oi.id,'name',oi.product_name,'sku',oi.sku,'variantId',oi.variant_id,'attributes',oi.variant_snapshot,'image',oi.image_url,'quantity',oi.quantity,'price',oi.unit_price,'lineTotal',oi.line_total) ORDER BY oi.id) FILTER (WHERE oi.id IS NOT NULL),'[]'::jsonb) items
      FROM orders o LEFT JOIN order_items oi ON oi.order_id=o.id WHERE o.user_id=${user.id} GROUP BY o.id ORDER BY o.created_at DESC`;
    return NextResponse.json({ orders: rows.map(serializeOrder) });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Unable to load orders." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) return unauthorized("Please sign in before placing your order.");
    await initDb();
    const order = await placeOrder(user.id, await request.json());
    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Order placement error:", error);
    if (error instanceof OrderError) return NextResponse.json({ error: error.message }, { status: error.status });
    return NextResponse.json({ error: "The order could not be placed. No payment or stock change was kept." }, { status: 500 });
  }
}
