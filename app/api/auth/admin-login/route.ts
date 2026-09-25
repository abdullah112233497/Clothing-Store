import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { initDb, sql } from "@/lib/db";
import { encryptSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, first_name, last_name, email, password_hash, role, is_active
      FROM users WHERE LOWER(email) = ${email} LIMIT 1
    `;
    const admin = rows[0];

    if (!admin || admin.role !== "admin" || !admin.is_active || !(await bcrypt.compare(password, admin.password_hash))) {
      return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    }

    const token = await encryptSession({
      userId: Number(admin.id),
      email: String(admin.email),
      firstName: String(admin.first_name),
      lastName: String(admin.last_name),
      role: "admin",
    });
    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: { id: Number(admin.id), firstName: admin.first_name, lastName: admin.last_name, email: admin.email, role: "admin" },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
