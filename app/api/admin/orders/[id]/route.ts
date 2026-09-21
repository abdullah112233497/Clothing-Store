import { NextResponse } from "next/server";
import { forbidden, getAuthenticatedUser, unauthorized } from "@/lib/api-auth";
import { sql } from "@/lib/db";
import { getOrderById } from "@/lib/orders";

const statuses = ['pending','confirmed','processing','shipped','delivered','cancelled','returned'];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAuthenticatedUser();
  if (!admin) return unauthorized();
  if (admin.role !== "admin") return forbidden();
  const id = Number((await params).id);
  const { status, note = "" } = await request.json();
  if (!Number.isInteger(id) || !statuses.includes(status)) return NextResponse.json({ error: "Invalid order or status." }, { status: 400 });
  const current = await sql`SELECT id,user_id,status,order_number FROM orders WHERE id=${id} LIMIT 1`;
  if (!current[0]) return NextResponse.json({ error: "Order not found." }, { status: 404 });
  if (current[0].status === 'cancelled' || current[0].status === 'returned') return NextResponse.json({ error: "A closed order cannot change status." }, { status: 409 });
  if (status === 'cancelled') {
    const changed = await sql`WITH changed_order AS (
        UPDATE orders SET status='cancelled',updated_at=NOW() WHERE id=${id} AND status NOT IN ('cancelled','returned')
        RETURNING id,user_id,order_number
      ), restored AS (
        UPDATE product_variants pv SET stock_quantity=pv.stock_quantity+oi.quantity,updated_at=NOW()
        FROM order_items oi JOIN changed_order co ON co.id=oi.order_id WHERE pv.id=oi.variant_id
        RETURNING pv.id,oi.quantity
      ), movement AS (
        INSERT INTO inventory_movements(variant_id,order_id,quantity_change,reason,created_by)
        SELECT id,${id},quantity,'order_cancelled',${admin.id} FROM restored
      ), history AS (
        INSERT INTO order_status_history(order_id,from_status,to_status,changed_by,note)
        SELECT id,${String(current[0].status)},'cancelled',${admin.id},${String(note)} FROM changed_order
      ), notification AS (
        INSERT INTO notifications(user_id,order_id,type,title,message)
        SELECT user_id,id,'order_cancelled','Order cancelled','Your order #'||order_number||' has been cancelled.' FROM changed_order
      ) SELECT id FROM changed_order`;
    if (!changed[0]) return NextResponse.json({ error: "Order was already closed." }, { status: 409 });
  } else {
    await sql.transaction((tx) => [
      tx`UPDATE orders SET status=${status},updated_at=NOW() WHERE id=${id}`,
      tx`INSERT INTO order_status_history(order_id,from_status,to_status,changed_by,note) VALUES(${id},${String(current[0].status)},${status},${admin.id},${String(note)})`,
      tx`INSERT INTO notifications(user_id,order_id,type,title,message) VALUES(${Number(current[0].user_id)},${id},${`order_${status}`},${`Order ${status}`},${`Your order #${current[0].order_number} is now ${status}.`})`,
    ]);
  }
  return NextResponse.json({ success: true, order: await getOrderById(id, admin.id, true) });
}
