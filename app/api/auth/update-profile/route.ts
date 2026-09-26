import { NextResponse } from "next/server";
import { getAuthenticatedCustomer } from "@/lib/api-auth";
import { sql, initDb } from "@/lib/db";

export async function PUT(request: Request) {
  try {
    const customer = await getAuthenticatedCustomer();

    if (!customer) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    await initDb();
    const body = await request.json();
    const { firstName, lastName, phone, birthday, gender } = body;

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First and last name are required." },
        { status: 400 }
      );
    }

    const updatedUsers = await sql`
      UPDATE users
      SET
        first_name = ${firstName.trim()},
        last_name = ${lastName.trim()},
        phone = ${phone || ""},
        birthday = ${birthday || ""},
        gender = ${gender || "Prefer not to say"},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${customer.id} AND role = 'customer'
      RETURNING id, first_name, last_name, email, phone, birthday, gender, membership_tier, created_at;
    `;

    if (updatedUsers.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const user = updatedUsers[0];

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
        memberSince: new Date(user.created_at).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile." },
      { status: 500 }
    );
  }
}
