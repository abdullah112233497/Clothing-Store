import { NextResponse } from "next/server";
import { getAuthenticatedCustomer } from "@/lib/api-auth";
import { sql, initDb } from "@/lib/db";

// GET user's personal wishlist
export async function GET() {
  try {
    const customer = await getAuthenticatedCustomer();

    if (!customer) {
      return NextResponse.json({ items: [], count: 0 }, { status: 200 });
    }

    await initDb();

    const items = await sql`
      SELECT wi.id, wi.product_id, wi.name, wi.price, wi.original_price, wi.category,
        wi.image, p.slug, wi.created_at
      FROM wishlist_items wi
      JOIN LATERAL (
        SELECT product.slug FROM products product
        WHERE product.status = 'active'
          AND (product.id = wi.product_id OR (wi.product_id IS NULL AND LOWER(product.name) = LOWER(wi.name)))
          AND EXISTS (
            SELECT 1 FROM product_variants pv
            WHERE pv.product_id = product.id AND pv.is_active = TRUE
              AND pv.stock_quantity > pv.reserved_quantity
          )
        ORDER BY product.id DESC LIMIT 1
      ) p ON TRUE
      WHERE wi.user_id = ${customer.id}
      ORDER BY wi.created_at DESC;
    `;

    const mapped = items.map((i) => ({
      id: i.id,
      productId: i.product_id,
      name: i.name,
      price: Number(i.price),
      originalPrice: i.original_price ? Number(i.original_price) : undefined,
      category: i.category || "",
      image: i.image || "",
      slug: i.slug,
      inStock: true,
    }));

    return NextResponse.json({ items: mapped, count: mapped.length });
  } catch (error) {
    console.error("GET wishlist error:", error);
    return NextResponse.json({ items: [], count: 0, error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

// POST toggle item in user's personal wishlist
export async function POST(request: Request) {
  try {
    const customer = await getAuthenticatedCustomer();

    if (!customer) {
      return NextResponse.json(
        { error: "Please sign in to add items to your wishlist." },
        { status: 401 }
      );
    }

    await initDb();

    const body = await request.json();
    const { name, price, originalPrice, category = "", image = "", inStock = true, productId } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Product name is required." }, { status: 400 });
    }

    const cleanName = name.trim();

    const available = await sql`
      SELECT 1 FROM products p WHERE p.status = 'active'
        AND (p.id = ${productId || null} OR (${productId || null}::integer IS NULL AND LOWER(p.name) = LOWER(${cleanName})))
        AND EXISTS (
          SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id
            AND pv.is_active = TRUE AND pv.stock_quantity > pv.reserved_quantity
        ) LIMIT 1;
    `;
    if (!available.length) {
      return NextResponse.json({ error: "This product is currently unavailable." }, { status: 409 });
    }

    // Check if already in wishlist
    const existing = await sql`
      SELECT id FROM wishlist_items
      WHERE user_id = ${customer.id} AND name = ${cleanName}
      LIMIT 1;
    `;

    if (existing.length > 0) {
      // Toggle off (remove)
      await sql`
        DELETE FROM wishlist_items
        WHERE user_id = ${customer.id} AND name = ${cleanName};
      `;
      return NextResponse.json({
        wishlisted: false,
        message: `Removed "${cleanName}" from your wishlist.`,
      });
    }

    // Parse prices safely
    const numericPrice =
      typeof price === "number"
        ? price
        : Number(String(price).replace(/[^0-9]/g, "")) || 0;

    const numericOriginalPrice =
      originalPrice !== undefined && originalPrice !== null
        ? typeof originalPrice === "number"
          ? originalPrice
          : Number(String(originalPrice).replace(/[^0-9]/g, ""))
        : null;

    const inserted = await sql`
      INSERT INTO wishlist_items (
        user_id,
        product_id,
        name,
        price,
        original_price,
        category,
        image,
        in_stock
      ) VALUES (
        ${customer.id},
        ${productId || null},
        ${cleanName},
        ${numericPrice},
        ${numericOriginalPrice},
        ${category},
        ${image},
        ${inStock !== false}
      )
      RETURNING id, product_id, name, price, original_price, category, image, in_stock;
    `;

    return NextResponse.json({
      wishlisted: true,
      message: `Added "${cleanName}" to your wishlist.`,
      item: {
        id: inserted[0].id,
        productId: inserted[0].product_id,
        name: inserted[0].name,
        price: Number(inserted[0].price),
        originalPrice: inserted[0].original_price ? Number(inserted[0].original_price) : undefined,
        category: inserted[0].category,
        image: inserted[0].image,
        inStock: inserted[0].in_stock,
      },
    });
  } catch (error) {
    console.error("POST wishlist error:", error);
    return NextResponse.json(
      { error: "Failed to update wishlist. Please try again." },
      { status: 500 }
    );
  }
}

// DELETE item from user's personal wishlist
export async function DELETE(request: Request) {
  try {
    const customer = await getAuthenticatedCustomer();

    if (!customer) {
      return NextResponse.json(
        { error: "Please sign in to manage your wishlist." },
        { status: 401 }
      );
    }

    await initDb();

    const body = await request.json().catch(() => ({}));
    const { id, name } = body;

    if (id) {
      await sql`
        DELETE FROM wishlist_items
        WHERE user_id = ${customer.id} AND id = ${id};
      `;
    } else if (name) {
      await sql`
        DELETE FROM wishlist_items
        WHERE user_id = ${customer.id} AND name = ${name.trim()};
      `;
    } else {
      return NextResponse.json({ error: "Item ID or name required." }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Item removed from wishlist." });
  } catch (error) {
    console.error("DELETE wishlist error:", error);
    return NextResponse.json(
      { error: "Failed to delete item from wishlist." },
      { status: 500 }
    );
  }
}
