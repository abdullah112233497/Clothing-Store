import { NextResponse } from "next/server";
import { getCurrentUserFromCookie } from "@/lib/auth";
import { initDb, sql } from "@/lib/db";

export type AuthenticatedUser = { id: number; email: string; role: "customer" | "admin" };

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const session = await getCurrentUserFromCookie();
  if (!session?.userId) return null;
  await initDb();
  const rows = await sql`SELECT id, email, role FROM users WHERE id = ${session.userId} AND is_active = TRUE LIMIT 1`;
  if (!rows[0]) return null;
  return { id: Number(rows[0].id), email: String(rows[0].email), role: rows[0].role as "customer" | "admin" };
}

export const unauthorized = (message = "Authentication required.") =>
  NextResponse.json({ error: message }, { status: 401 });

export const forbidden = (message = "You do not have permission to perform this action.") =>
  NextResponse.json({ error: message }, { status: 403 });
