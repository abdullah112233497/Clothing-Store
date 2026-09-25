import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not configured.");

const placeholder =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,c_fill,g_auto,w_1200,h_1600/docs/models";
const nonCloudinary = "!~ '^https://res\\.cloudinary\\.com/[^/]+/image/(upload|fetch)/'";
const sql = neon(databaseUrl);

const [products, orders, wishlist] = await sql.transaction((tx) => [
  tx.query(
    `WITH updated AS (UPDATE product_images SET url=$1 WHERE url ${nonCloudinary} RETURNING 1) SELECT COUNT(*)::int AS migrated FROM updated`,
    [placeholder],
  ),
  tx.query(
    `WITH updated AS (UPDATE order_items SET image_url=$1 WHERE image_url IS NOT NULL AND image_url ${nonCloudinary} RETURNING 1) SELECT COUNT(*)::int AS migrated FROM updated`,
    [placeholder],
  ),
  tx.query(
    `WITH updated AS (UPDATE wishlist_items SET image=$1 WHERE image IS NOT NULL AND image ${nonCloudinary} RETURNING 1) SELECT COUNT(*)::int AS migrated FROM updated`,
    [placeholder],
  ),
]);

console.log(JSON.stringify({
  productImages: products[0]?.migrated ?? 0,
  orderImages: orders[0]?.migrated ?? 0,
  wishlistImages: wishlist[0]?.migrated ?? 0,
}));
