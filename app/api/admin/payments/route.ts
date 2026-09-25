import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const payments = await sql`SELECT p.id,p.order_id,o.order_number,o.customer_name,o.customer_email,o.customer_phone,
    o.shipping_address_snapshot,o.courier,o.tracking_number,p.method,p.status,p.amount,p.provider_reference,p.reconciled_at,p.created_at,
    COALESCE((SELECT string_agg(oi.product_name || ' x' || oi.quantity, ', ') FROM order_items oi WHERE oi.order_id=o.id),'') items_summary
    FROM payments p JOIN orders o ON o.id=p.order_id ORDER BY p.created_at DESC`;
  return NextResponse.json({ payments });
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const body = await request.json();
  const id = Number(body.id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid payment." }, { status: 400 });
  const rows = await sql`UPDATE payments SET reconciled_at=CASE WHEN ${Boolean(body.reconciled)} THEN NOW() ELSE NULL END, reconciled_by=CASE WHEN ${Boolean(body.reconciled)} THEN ${admin.id} ELSE NULL END, updated_at=NOW() WHERE id=${id} RETURNING *`;
  return rows[0] ? NextResponse.json({ success: true, payment: rows[0] }) : NextResponse.json({ error: "Payment not found." }, { status: 404 });
}
