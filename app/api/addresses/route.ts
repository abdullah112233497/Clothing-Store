import { NextResponse } from "next/server";
import { getAuthenticatedCustomer, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

async function listAddresses(userId: number) {
  const rows = await sql`
    SELECT id, label, is_default, line1, city, province, postal_code, country
    FROM addresses WHERE user_id = ${userId}
    ORDER BY is_default DESC, created_at DESC, id DESC
  `;
  return rows.map((row) => ({
    id: String(row.id),
    label: row.label,
    isDefault: row.is_default,
    street: row.line1,
    city: row.city,
    province: row.province || "",
    postalCode: row.postal_code || "",
    country: row.country,
  }));
}

function addressId(value: unknown) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function GET() {
  try {
    const user = await getAuthenticatedCustomer();
    if (!user) return unauthorized();
    return NextResponse.json({ addresses: await listAddresses(user.id) });
  } catch (error) {
    console.error("Load addresses error:", error);
    return NextResponse.json({ error: "Could not load addresses." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedCustomer();
    if (!user) return unauthorized();
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid address details." }, { status: 400 });
    }
    const street = typeof body.street === "string" ? body.street.trim() : "";
    const city = typeof body.city === "string" ? body.city.trim() : "";
    const province = typeof body.province === "string" ? body.province.trim() : "";
    const postalCode = typeof body.postalCode === "string" ? body.postalCode.trim() : "";
    const label = ["Home", "Office", "Other"].includes(body.label) ? body.label : "Home";
    if (!street || !city || !province || !postalCode || street.length > 300 ||
        city.length > 100 || province.length > 100 || postalCode.length > 30) {
      return NextResponse.json({ error: "Street, city, province and postal code are required." }, { status: 400 });
    }

    const existing = await sql`SELECT 1 FROM addresses WHERE user_id = ${user.id} LIMIT 1`;
    const makeDefault = body.isDefault === true || existing.length === 0;
    const inserted = await sql`
      INSERT INTO addresses (user_id, label, line1, city, province, postal_code, country, is_default)
      VALUES (${user.id}, ${label}, ${street}, ${city}, ${province}, ${postalCode}, 'Pakistan', ${makeDefault})
      RETURNING id
    `;
    if (makeDefault) {
      await sql`
        UPDATE addresses SET is_default = (id = ${inserted[0].id}), updated_at = NOW()
        WHERE user_id = ${user.id}
      `;
    }
    return NextResponse.json({ addresses: await listAddresses(user.id) }, { status: 201 });
  } catch (error) {
    console.error("Save address error:", error);
    return NextResponse.json({ error: "Could not save address." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getAuthenticatedCustomer();
    if (!user) return unauthorized();
    const id = addressId((await request.json()).id);
    if (!id) return NextResponse.json({ error: "Invalid address." }, { status: 400 });
    const updated = await sql`
      UPDATE addresses SET is_default = (id = ${id}), updated_at = NOW()
      WHERE user_id = ${user.id}
        AND EXISTS (SELECT 1 FROM addresses WHERE id = ${id} AND user_id = ${user.id})
      RETURNING id
    `;
    if (!updated.length) return NextResponse.json({ error: "Address not found." }, { status: 404 });
    return NextResponse.json({ addresses: await listAddresses(user.id) });
  } catch (error) {
    console.error("Set default address error:", error);
    return NextResponse.json({ error: "Could not update address." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await getAuthenticatedCustomer();
    if (!user) return unauthorized();
    const id = addressId((await request.json()).id);
    if (!id) return NextResponse.json({ error: "Invalid address." }, { status: 400 });
    const deleted = await sql`
      DELETE FROM addresses WHERE id = ${id} AND user_id = ${user.id}
      RETURNING is_default
    `;
    if (!deleted.length) return NextResponse.json({ error: "Address not found." }, { status: 404 });
    if (deleted[0].is_default) {
      await sql`
        UPDATE addresses SET is_default = TRUE, updated_at = NOW()
        WHERE id = (
          SELECT id FROM addresses WHERE user_id = ${user.id}
          ORDER BY created_at DESC, id DESC LIMIT 1
        )
      `;
    }
    return NextResponse.json({ addresses: await listAddresses(user.id) });
  } catch (error) {
    console.error("Delete address error:", error);
    return NextResponse.json({ error: "Could not delete address." }, { status: 500 });
  }
}
