import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const customers = await sql`SELECT u.id,u.first_name,u.last_name,u.email,u.phone,u.is_active,u.created_at,
    COUNT(o.id)::int orders,COALESCE(SUM(CASE WHEN o.status NOT IN ('cancelled','returned') THEN o.total_amount ELSE 0 END),0) spent,
    COALESCE((array_agg(o.shipping_address_snapshot->>'city' ORDER BY o.created_at DESC))[1],'') city,
    MAX(o.created_at) last_order_date
    FROM users u LEFT JOIN orders o ON o.user_id=u.id WHERE u.role='customer'
    GROUP BY u.id ORDER BY u.created_at DESC`;
  return NextResponse.json({ customers });
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const body = await request.json();
  const id = Number(body.id);
  if (!Number.isInteger(id) || id === admin.id) return NextResponse.json({ error: "Invalid customer." }, { status: 400 });
  const rows = await sql`UPDATE users SET is_active=${Boolean(body.isActive)}, updated_at=NOW() WHERE id=${id} AND role='customer' RETURNING id,is_active`;
  return rows[0] ? NextResponse.json({ success: true, customer: rows[0] }) : NextResponse.json({ error: "Customer not found." }, { status: 404 });
}
