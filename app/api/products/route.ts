import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog-data";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");
    const category = request.nextUrl.searchParams.get("category");
    const search = request.nextUrl.searchParams.get("search")?.trim().slice(0, 100) || null;
    const limit = search && request.nextUrl.searchParams.get("suggest") === "1" ? 6 : undefined;
    const products = await getCatalogProducts({ slug, category, search, limit });
    return NextResponse.json(
      { products },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "The product service is temporarily unavailable. Please try again." },
      { status: 503, headers: { "Retry-After": "5", "Cache-Control": "no-store" } },
    );
  }
}
