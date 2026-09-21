import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}) {
  const admin=await getAuthenticatedUser(); if(!admin)return unauthorized(); if(admin.role!=="admin")return forbidden();
  const id=Number((await params).id), body=await request.json();
  if(!Number.isInteger(id))return NextResponse.json({error:"Invalid product ID."},{status:400});
  const rows=await sql`UPDATE products SET
    name=COALESCE(${body.name??null},name), description=COALESCE(${body.description??null},description),
    category_id=COALESCE(${body.categoryId==null?null:Number(body.categoryId)},category_id),
    base_price=COALESCE(${body.price==null?null:Number(body.price)},base_price),
    sale_price=CASE WHEN ${Boolean(body.clearSalePrice)} THEN NULL ELSE COALESCE(${body.salePrice==null?null:Number(body.salePrice)},sale_price) END,
    status=COALESCE(${body.status??null},status),updated_at=NOW() WHERE id=${id} RETURNING *`;
  return rows[0]?NextResponse.json({success:true,product:rows[0]}):NextResponse.json({error:"Product not found."},{status:404});
}
