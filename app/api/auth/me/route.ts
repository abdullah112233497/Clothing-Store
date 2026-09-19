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
      SELECT id, first_name, last_name, email, phone, birthday, gender, membership_tier, created_at
      FROM users
      WHERE id = ${session.userId}
      LIMIT 1;
    `;

    if (users.length === 0) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const user = users[0];

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
