import { NextResponse } from "next/server";
import { getCurrentUserFromCookie } from "@/lib/auth";
import { sql, initDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await getCurrentUserFromCookie();

    if (!session || !session.userId) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await initDb();

    const users = await sql`
      SELECT id, first_name, last_name, email, phone, birthday, gender, membership_tier, role, is_active, created_at
      FROM users
      WHERE id = ${session.userId}
      LIMIT 1;
    `;

    if (users.length === 0 || !users[0].is_active) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = users[0];

    // Admin sessions belong exclusively to the admin portal and must never
    // hydrate the storefront's customer account context.
    if (user.role === "admin") {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
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
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
