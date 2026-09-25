import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const rows = await sql`SELECT * FROM admin_store_settings WHERE id=1`;
  return NextResponse.json({ settings: rows[0] });
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const body = await request.json();
  const rows = await sql`UPDATE admin_store_settings SET store_name=COALESCE(${body.storeName ?? null},store_name), store_email=COALESCE(${body.storeEmail ?? null},store_email), support_phone=COALESCE(${body.supportPhone ?? null},support_phone), address=COALESCE(${body.address ?? null},address), store_status=COALESCE(${body.storeStatus ?? null},store_status), email_notifications=COALESCE(${body.emailNotifications ?? null},email_notifications), order_notifications=COALESCE(${body.orderNotifications ?? null},order_notifications), updated_at=NOW() WHERE id=1 RETURNING *`;
  return NextResponse.json({ success: true, settings: rows[0] });
}
