import { NextResponse } from "next/server";
import { getAuthenticatedCustomer, unauthorized } from "@/lib/api-auth";
import { getOrderById } from "@/lib/orders";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthenticatedCustomer();
  if (!user) return unauthorized();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid order ID." }, { status: 400 });
  const order = await getOrderById(id, user.id, user.role === "admin");
  return order ? NextResponse.json({ order }) : NextResponse.json({ error: "Order not found." }, { status: 404 });
}
