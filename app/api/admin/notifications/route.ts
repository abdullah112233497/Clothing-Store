import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const notifications = await sql`SELECT id,order_id,type,title,message,is_read,created_at FROM notifications WHERE user_id=${admin.id} ORDER BY created_at DESC LIMIT 50`;
  return NextResponse.json({ notifications });
}

export async function PATCH(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const { id } = await request.json();
  if (id === "all") await sql`UPDATE notifications SET is_read=TRUE,read_at=NOW() WHERE user_id=${admin.id} AND is_read=FALSE`;
  else await sql`UPDATE notifications SET is_read=TRUE,read_at=NOW() WHERE id=${Number(id)} AND user_id=${admin.id}`;
  return NextResponse.json({ success: true });
}
