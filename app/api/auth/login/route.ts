import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, initDb } from "@/lib/db";
import { encryptSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();

    const body = await request.json();
    const { email, password } = body;

    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return NextResponse.json(
        { error: "Please enter both email and password." },
        { status: 400 }
      );
    }

    // 1. Fetch user from DB
    const users = await sql`
      SELECT id, first_name, last_name, email, password_hash, phone, birthday, gender, membership_tier, role, is_active, created_at
      FROM users
      WHERE LOWER(email) = ${cleanEmail}
      LIMIT 1;
    `;

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = users[0];

    if (!user.is_active) {
      return NextResponse.json({ error: "This account has been disabled." }, { status: 403 });
    }

    if (user.role === "admin") {
      return NextResponse.json({ error: "Please use the administrator login page." }, { status: 403 });
    }

    // 2. Verify password hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Create session JWT & set HTTP-only cookie
    const token = await encryptSession({
      userId: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone || "",
        birthday: user.birthday || "",
        gender: user.gender || "Male",
        membershipTier: user.membership_tier || "VIP Black",
        role: user.role,
        memberSince: new Date(user.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error during login. Please try again." },
      { status: 500 }
    );
  }
}
