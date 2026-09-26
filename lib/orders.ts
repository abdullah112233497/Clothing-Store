import { sql } from "@/lib/db";

type CheckoutItem = { variantId?: number; name?: string; size?: string; color?: string; quantity?: number };
type CheckoutInput = {
  items: CheckoutItem[];
  customer: { name: string; email: string; phone: string; address: string; city: string; province: string; postalCode: string; notes?: string };
  paymentMethod?: string;
};

export class OrderError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

const money = (value: unknown) => Number(Number(value).toFixed(2));

export async function placeOrder(userId: number, input: CheckoutInput) {
  if (!Array.isArray(input.items) || input.items.length === 0) throw new OrderError("Your cart is empty.");
  const customer = input.customer;
  if (!customer?.name?.trim() || !customer?.email?.trim() || !customer?.phone?.trim() ||
      !customer?.address?.trim() || !customer?.city?.trim() || !customer?.province?.trim() || !customer?.postalCode?.trim()) {
    throw new OrderError("Complete customer and shipping information is required.");
  }

  const requested = input.items.map((item) => ({
    variantId: Number(item.variantId || 0), name: String(item.name || "").trim(),
    size: String(item.size || "").trim(), color: String(item.color || "").trim(),
    quantity: Number(item.quantity || 0),
  }));
  if (requested.some((item) => !Number.isInteger(item.quantity) || item.quantity < 1 || (!item.variantId && !item.name))) {
    throw new OrderError("Cart contains an invalid item.");
  }

  // Resolve legacy UI cart rows to database variants; price and stock always come from the server.
  const resolved = [] as Array<Record<string, unknown> & { requestedQuantity: number }>;
  for (const item of requested) {
    const rows = item.variantId
      ? await sql`SELECT pv.id variant_id, pv.sku, pv.stock_quantity, p.id product_id, p.name,
          COALESCE(pv.sale_price, pv.price, p.sale_price, p.base_price) unit_price,
          (SELECT pi.url FROM product_images pi WHERE pi.product_id=p.id ORDER BY pi.is_primary DESC, pi.sort_order LIMIT 1) image_url,
          COALESCE((SELECT jsonb_object_agg(a.code, av.value) FROM variant_attribute_values vav JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE vav.variant_id=pv.id), '{}'::jsonb) attributes
        FROM product_variants pv JOIN products p ON p.id=pv.product_id
        WHERE pv.id=${item.variantId} AND pv.is_active=TRUE AND p.status='active' LIMIT 1`
      : await sql`SELECT pv.id variant_id, pv.sku, pv.stock_quantity, p.id product_id, p.name,
          COALESCE(pv.sale_price, pv.price, p.sale_price, p.base_price) unit_price,
          (SELECT pi.url FROM product_images pi WHERE pi.product_id=p.id ORDER BY pi.is_primary DESC, pi.sort_order LIMIT 1) image_url,
          COALESCE((SELECT jsonb_object_agg(a.code, av.value) FROM variant_attribute_values vav JOIN attribute_values av ON av.id=vav.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE vav.variant_id=pv.id), '{}'::jsonb) attributes
        FROM product_variants pv JOIN products p ON p.id=pv.product_id
        WHERE LOWER(p.name)=LOWER(${item.name}) AND pv.is_active=TRUE AND p.status='active'
          AND (${item.size}='' OR EXISTS (SELECT 1 FROM variant_attribute_values x JOIN attribute_values av ON av.id=x.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE x.variant_id=pv.id AND a.code IN ('size','shoe_size','waist') AND LOWER(av.value)=LOWER(${item.size})))
          AND (${item.color}='' OR EXISTS (SELECT 1 FROM variant_attribute_values x JOIN attribute_values av ON av.id=x.attribute_value_id JOIN attributes a ON a.id=av.attribute_id WHERE x.variant_id=pv.id AND a.code='color' AND LOWER(av.value)=LOWER(${item.color})))
        ORDER BY pv.id LIMIT 1`;
    if (!rows[0]) throw new OrderError(`The selected option for ${item.name || "this product"} is no longer available.`, 409);
    resolved.push({ ...rows[0], requestedQuantity: item.quantity });
  }

  const combined = new Map<number, typeof resolved[number]>();
  for (const row of resolved) {
    const id = Number(row.variant_id);
    const previous = combined.get(id);
    combined.set(id, previous ? { ...previous, requestedQuantity: previous.requestedQuantity + row.requestedQuantity } : row);
  }
  const lines = [...combined.values()];
  const subtotal = money(lines.reduce((sum, row) => sum + Number(row.unit_price) * row.requestedQuantity, 0));
  const shippingCost = 0;
  const orderNumber = `WW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const addressSnapshot = { line1: customer.address.trim(), city: customer.city.trim(), province: customer.province.trim(), postalCode: customer.postalCode.trim(), country: "Pakistan" };

  const dbLines = lines.map((line) => ({
    variantId: Number(line.variant_id), productId: Number(line.product_id), name: String(line.name),
    sku: String(line.sku), attributes: line.attributes || {}, image: line.image_url || null,
    quantity: line.requestedQuantity, price: Number(line.unit_price),
  }));
  try {
    // One PostgreSQL statement is the concurrency boundary. A failed stock gate deliberately
    // violates order_number's NOT NULL constraint, rolling back every inventory update.
    const created = await sql`WITH requested AS (
        SELECT * FROM jsonb_to_recordset(${JSON.stringify(dbLines)}::jsonb)
          AS x("variantId" integer,"productId" integer,name text,sku text,attributes jsonb,image text,quantity integer,price numeric)
      ), updated AS (
        UPDATE product_variants pv SET stock_quantity=pv.stock_quantity-r.quantity,updated_at=NOW()
        FROM requested r WHERE pv.id=r."variantId" AND pv.is_active=TRUE
          AND pv.stock_quantity-pv.reserved_quantity >= r.quantity RETURNING pv.id
      ), new_order AS (
        INSERT INTO orders (order_number,user_id,status,payment_status,payment_method,customer_name,customer_email,customer_phone,shipping_address_snapshot,notes,subtotal,shipping_cost,total_amount)
        SELECT CASE WHEN (SELECT COUNT(*) FROM updated)=(SELECT COUNT(*) FROM requested) THEN ${orderNumber} ELSE NULL END,
          ${userId},'pending','pending','cod',${customer.name.trim()},${customer.email.trim().toLowerCase()},${customer.phone.trim()},
          ${JSON.stringify(addressSnapshot)}::jsonb,${customer.notes?.trim() || null},${subtotal},${shippingCost},${subtotal + shippingCost}
        RETURNING id,order_number,created_at
      ), inserted_items AS (
        INSERT INTO order_items (order_id,product_id,variant_id,product_name,sku,variant_snapshot,image_url,quantity,unit_price,line_total)
        SELECT o.id,r."productId",r."variantId",r.name,r.sku,r.attributes,r.image,r.quantity,r.price,r.price*r.quantity
        FROM requested r CROSS JOIN new_order o RETURNING variant_id,order_id,quantity
      ), movements AS (
        INSERT INTO inventory_movements (variant_id,order_id,quantity_change,reason,created_by)
        SELECT variant_id,order_id,-quantity,'order_placed',${userId} FROM inserted_items
      ), payment AS (
        INSERT INTO payments (order_id,method,status,amount) SELECT id,'cod','pending',${subtotal + shippingCost} FROM new_order
      ), history AS (
        INSERT INTO order_status_history (order_id,to_status,changed_by,note) SELECT id,'pending',${userId},'Order placed' FROM new_order
      ), notification AS (
        INSERT INTO notifications (user_id,order_id,type,title,message)
        SELECT ${userId},id,'order_placed','Order placed',${`Your order #${orderNumber} has been placed successfully.`} FROM new_order
        UNION ALL
        SELECT u.id,no.id,'admin_order_placed','New order received',${`Order #${orderNumber} was placed and needs review.`}
        FROM users u CROSS JOIN new_order no WHERE u.role='admin' AND u.id<>${userId}
      ) SELECT * FROM new_order`;
    return getOrderById(Number(created[0].id), userId, false);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("order_number") || message.includes("not-null")) {
      const unavailable = lines.find((line) => Number(line.stock_quantity) < line.requestedQuantity) || lines[0];
      throw new OrderError(`${String(unavailable.name)} does not have enough stock for this order.`, 409);
    }
    throw error;
  }
}

export async function getOrderById(id: number, userId: number, isAdmin: boolean) {
  const rows = await sql`SELECT o.*, COALESCE(jsonb_agg(jsonb_build_object('id',oi.id,'name',oi.product_name,'sku',oi.sku,'variantId',oi.variant_id,'attributes',oi.variant_snapshot,'image',oi.image_url,'quantity',oi.quantity,'price',oi.unit_price,'lineTotal',oi.line_total) ORDER BY oi.id) FILTER (WHERE oi.id IS NOT NULL),'[]'::jsonb) items
    FROM orders o LEFT JOIN order_items oi ON oi.order_id=o.id WHERE o.id=${id} AND (${isAdmin} OR o.user_id=${userId}) GROUP BY o.id LIMIT 1`;
  return rows[0] ? serializeOrder(rows[0]) : null;
}

export function serializeOrder(row: Record<string, unknown>) {
  const address = (row.shipping_address_snapshot || {}) as Record<string, string>;
  const items = Array.isArray(row.items) ? row.items.map((item: Record<string, unknown>) => {
    const attributes = (item.attributes || {}) as Record<string, string>;
    return { ...item, price: Number(item.price), lineTotal: Number(item.lineTotal),
      size: attributes.size || attributes.shoe_size || attributes.waist || "",
      color: attributes.color || "" };
  }) : [];
  return { id: Number(row.id), orderNumber: `#${row.order_number}`, status: String(row.status), paymentStatus: String(row.payment_status),
    paymentMethod: String(row.payment_method), customer: { name: row.customer_name, email: row.customer_email, phone: row.customer_phone,
      address: address.line1 || "", city: address.city || "", province: address.province || "", postalCode: address.postalCode || "", notes: row.notes || "" },
    courier: row.courier || "Unassigned", trackingNumber: row.tracking_number || "",
    items, subtotal: Number(row.subtotal), shipping: Number(row.shipping_cost), discount: Number(row.discount_amount),
    total: Number(row.total_amount), createdAt: row.created_at };
}
