import { NextRequest, NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog-data";

export async function GET(request: NextRequest) {
  try {
    const slug = request.nextUrl.searchParams.get("slug");
    const category = request.nextUrl.searchParams.get("category");
    const products = await getCatalogProducts({ slug, category });
    return NextResponse.json(
      { products },
      { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=300" } },
    );
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "The product service is temporarily unavailable. Please try again." },
      { status: 503, headers: { "Retry-After": "5", "Cache-Control": "no-store" } },
    );
  }
}
