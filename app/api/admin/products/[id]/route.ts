import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";
import { parseAdminMetadata, resolveCategoryId, syncProductImages, syncProductVariants, validateImages } from "@/lib/admin-products";

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  const admin=await getAuthenticatedUser(); if(!admin)return unauthorized(); if(admin.role!=="admin")return forbidden();
  const id=Number((await params).id), body=await request.json();
  if(!Number.isInteger(id))return NextResponse.json({error:"Invalid product ID."},{status:400});
  const existing=await sql`SELECT * FROM products WHERE id=${id} AND status<>'archived' LIMIT 1`;
  if(!existing[0])return NextResponse.json({error:"Product not found."},{status:404});
  try {
    const categoryId=await resolveCategoryId(body) || Number(existing[0].category_id);
    const metadata=parseAdminMetadata({ ...(existing[0].admin_metadata as object || {}), ...body });
    const name=String(body.name??existing[0].name).trim(), sku=String(body.sku??existing[0].base_sku).trim().toUpperCase();
    const price=body.price==null?Number(existing[0].base_price):Number(body.price);
    const salePrice=body.clearSalePrice?null:body.salePrice==null?(existing[0].sale_price==null?null:Number(existing[0].sale_price)):Number(body.salePrice);
    if(!name || !/^[A-Z0-9-]{2,60}$/.test(sku) || !Number.isFinite(price) || price<0) return NextResponse.json({error:"Enter a valid name, price and SKU containing only letters, numbers and hyphens."},{status:400});
    const rows=await sql`UPDATE products SET name=${name},description=COALESCE(${body.description??null},description),category_id=${categoryId},
      base_sku=${sku},base_price=${price},sale_price=${salePrice},status=COALESCE(${body.status??null},status),admin_metadata=${JSON.stringify(metadata)}::jsonb,updated_at=NOW()
      WHERE id=${id} RETURNING *`;
    const stockRows=body.stock==null?await sql`SELECT COALESCE(SUM(stock_quantity),0) stock FROM product_variants WHERE product_id=${id} AND is_active=TRUE`:null;
    const stock=body.stock==null?Number(stockRows?.[0].stock||0):Number(body.stock);
    await syncProductVariants({ productId:id,baseSku:sku,price,salePrice,stock,metadata });
    if(Array.isArray(body.images))await syncProductImages(id,name,validateImages(body.images));
    return NextResponse.json({success:true,product:rows[0]});
  } catch(error) {
    console.error("Admin product update:",error);
    return NextResponse.json({error:error instanceof Error?error.message:"Unable to update product."},{status:409});
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid product ID." }, { status: 400 });
  const rows = await sql`WITH archived AS (
      UPDATE products SET status='archived',updated_at=NOW() WHERE id=${id} RETURNING id,status
    ), disabled AS (
      UPDATE product_variants pv SET is_active=FALSE,updated_at=NOW() FROM archived a WHERE pv.product_id=a.id
    ) SELECT * FROM archived`;
  return rows[0] ? NextResponse.json({ success: true, product: rows[0] }) : NextResponse.json({ error: "Product not found." }, { status: 404 });
}
