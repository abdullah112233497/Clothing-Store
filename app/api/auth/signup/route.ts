import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, initDb } from "@/lib/db";
import { encryptSession, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      phone = "",
      birthday = "",
      gender = "Prefer not to say",
    } = body;

    // 1. Validation
    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First and last names are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email?.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 2. Check for duplicate email
    const existingUsers = await sql`
      SELECT id FROM users WHERE LOWER(email) = ${cleanEmail} LIMIT 1;
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Insert into database
    const result = await sql`
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        phone,
        birthday,
        gender,
        membership_tier,
        role
      ) VALUES (
        ${firstName.trim()},
        ${lastName.trim()},
        ${cleanEmail},
        ${passwordHash},
        ${phone.trim()},
        ${birthday},
        ${gender},
        'VIP Black',
        'customer'
      )
      RETURNING id, first_name, last_name, email, phone, birthday, gender, membership_tier, created_at;
    `;

    const newUser = result[0];

    // 5. Create JWT & set HTTP-only cookie
    const token = await encryptSession({
      userId: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      role: "customer",
    });

    await setSessionCookie(token);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: newUser.id,
          firstName: newUser.first_name,
          lastName: newUser.last_name,
          email: newUser.email,
          phone: newUser.phone || "",
          birthday: newUser.birthday || "",
          gender: newUser.gender || "Male",
          membershipTier: newUser.membership_tier || "VIP Black",
          role: "customer",
          memberSince: new Date(newUser.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration. Please try again." },
      { status: 500 }
    );
  }
}
