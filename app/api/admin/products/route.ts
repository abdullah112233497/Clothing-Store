import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const body = await request.json();
  const name=String(body.name||'').trim(), slug=String(body.slug||'').trim().toLowerCase(), sku=String(body.sku||'').trim();
  const price=Number(body.price), categoryId=Number(body.categoryId);
  if (!name || !/^[a-z0-9-]+$/.test(slug) || !sku || !Number.isInteger(categoryId) || !Number.isFinite(price) || price<0) return NextResponse.json({ error: "Name, slug, SKU, category and price are required." }, { status: 400 });
  try {
    const rows=await sql`INSERT INTO products(category_id,brand_id,name,slug,description,base_sku,base_price,sale_price,status,weight_grams)
      VALUES(${categoryId},${body.brandId ? Number(body.brandId):null},${name},${slug},${String(body.description||'')},${sku},${price},${body.salePrice==null?null:Number(body.salePrice)},${body.status==='active'?'active':'draft'},${body.weightGrams==null?null:Number(body.weightGrams)}) RETURNING *`;
    return NextResponse.json({ success:true,product:rows[0] },{status:201});
  } catch (error) {
    console.error("Admin product create:",error);
    return NextResponse.json({ error:"Product slug or SKU already exists." },{status:409});
  }
}
