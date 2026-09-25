import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const rows = await sql`SELECT store_name,store_email,support_phone,store_status FROM admin_store_settings WHERE id=1 LIMIT 1`;
    return NextResponse.json({ settings: rows[0] || { store_name: "WEARWELL", store_status: true } }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ settings: { store_name: "WEARWELL", store_status: true } });
  }
}
