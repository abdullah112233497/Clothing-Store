# WEARWELL commerce backend

The application uses PostgreSQL through `@neondatabase/serverless`. Set `DATABASE_URL` and `JWT_SECRET` in `.env.local`. The first database-backed request runs the idempotent schema upgrade and development catalog seed in `lib/db.ts`.

## Data model

- Catalog: `brands`, hierarchical `categories`, `products`, `product_images`
- Dynamic options: `attributes`, `attribute_values`, `category_attributes`, `product_attribute_values`, `product_variants`, `variant_attribute_values`
- Customer data: `users`, `addresses`, `carts`, `cart_items`, `wishlist_items`
- Commerce: `orders`, `order_items`, `payments`, `order_status_history`
- Operations: `inventory_movements`, `notifications`

Product/category attributes describe what the UI renders. Variant option combinations carry their own SKU, price and stock. Checkout prices are always recalculated from the database; client totals are never trusted.

## APIs

- `GET /api/products?slug=...&category=...` — public catalog with applicable attributes and variants
- `GET|POST /api/orders` — current customer's history / atomic COD checkout
- `GET /api/orders/:id` — owner-only order detail (admins may access any order)
- `GET|PATCH /api/notifications` — current customer's in-app notifications
- `GET /api/admin/orders` and `PATCH /api/admin/orders/:id` — admin order management
- `POST /api/admin/products` and `PATCH /api/admin/products/:id` — admin product management
- `GET|PATCH /api/admin/inventory` — variant inventory management and audit movement

All customer APIs resolve the signed HTTP-only session and query the active database user. Admin APIs additionally verify `users.role = 'admin'`; UI-only checks are not used for authorization.

To promote the first trusted account, run this once in the database console:

```sql
UPDATE users SET role = 'admin' WHERE email = 'owner@example.com';
```

## Inventory guarantees

Order placement uses one PostgreSQL CTE statement. Variant stock checks, deductions, order/items, payment, history, inventory movements, and the initial notification commit together. If any requested variant lacks stock, PostgreSQL rolls back the whole statement. Cancelling is also idempotent and restores stock once.
