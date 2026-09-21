import { NextResponse } from "next/server";
import { getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();
  const notifications = await sql`SELECT id,type,title,message,is_read,metadata,created_at FROM notifications WHERE user_id=${user.id} ORDER BY created_at DESC LIMIT 100`;
  return NextResponse.json({ notifications });
}

export async function PATCH(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();
  const { id } = await request.json();
  if (id === "all") await sql`UPDATE notifications SET is_read=TRUE,read_at=NOW() WHERE user_id=${user.id} AND is_read=FALSE`;
  else await sql`UPDATE notifications SET is_read=TRUE,read_at=NOW() WHERE id=${Number(id)} AND user_id=${user.id}`;
  return NextResponse.json({ success: true });
}
