import { neon } from "@neondatabase/serverless";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/lib/product-images";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) console.warn("WARNING: DATABASE_URL environment variable is not defined.");

export const sql = neon(databaseUrl || "");
let initialization: Promise<void> | null = null;

/** Idempotently creates/upgrades the normalized commerce schema. */
export function initDb() {
  if (!initialization) {
    initialization = initializeSchema().catch((error) => {
      // A temporary Neon/network failure must not poison this server process.
      // The next request can retry once the database is reachable again.
      initialization = null;
      throw error;
    });
  }
  return initialization;
}

async function initializeSchema() {
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured.");
  const readiness = await sql`SELECT
    to_regclass('public.users') IS NOT NULL AS users_ready,
    to_regclass('public.products') IS NOT NULL AS products_ready,
    to_regclass('public.product_images') IS NOT NULL AS images_ready,
    to_regclass('public.product_variants') IS NOT NULL AS variants_ready,
    to_regclass('public.orders') IS NOT NULL AS orders_ready,
    to_regclass('public.notifications') IS NOT NULL AS notifications_ready,
    to_regclass('public.admin_store_settings') IS NOT NULL AS settings_ready,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='products' AND column_name='admin_metadata') AS product_metadata_ready,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='orders' AND column_name='tracking_number') AS order_tracking_ready,
    EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='payments' AND column_name='reconciled_at') AS payment_reconciliation_ready`;
  const schema = readiness[0];
  if (schema && Object.values(schema).every(Boolean)) return;

  // DDL and seed work is only a recovery/bootstrap path. Normal requests pay
  // for the single readiness query above instead of dozens of schema queries.
  await sql`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL, password_hash VARCHAR(255) NOT NULL, phone VARCHAR(50),
    birthday VARCHAR(50), gender VARCHAR(50) DEFAULT 'Prefer not to say',
    membership_tier VARCHAR(50) DEFAULT 'VIP Black', role VARCHAR(20) NOT NULL DEFAULT 'customer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'customer'`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE`;
  await sql`CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY, name VARCHAR(150) UNIQUE NOT NULL, slug VARCHAR(170) UNIQUE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY, parent_id INTEGER REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(150) NOT NULL, slug VARCHAR(170) UNIQUE NOT NULL, description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0, is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY, category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    brand_id INTEGER REFERENCES brands(id) ON DELETE SET NULL, name VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL, description TEXT, base_sku VARCHAR(100) UNIQUE,
    base_price NUMERIC(12,2) NOT NULL CHECK (base_price >= 0), sale_price NUMERIC(12,2),
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','archived')),
    weight_grams INTEGER CHECK (weight_grams IS NULL OR weight_grams >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (sale_price IS NULL OR sale_price >= 0))`;
  await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS admin_metadata JSONB NOT NULL DEFAULT '{}'::jsonb`;
  await sql`CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY, product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url VARCHAR(1000) NOT NULL, alt_text VARCHAR(255), sort_order INTEGER NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE)`;
  await sql`ALTER TABLE product_images ALTER COLUMN url TYPE TEXT`;
  await sql`CREATE TABLE IF NOT EXISTS attributes (
    id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, code VARCHAR(100) UNIQUE NOT NULL,
    display_type VARCHAR(20) NOT NULL DEFAULT 'select' CHECK (display_type IN ('select','color','text','number','boolean')),
    is_variant BOOLEAN NOT NULL DEFAULT FALSE, unit VARCHAR(30))`;
  await sql`CREATE TABLE IF NOT EXISTS attribute_values (
    id SERIAL PRIMARY KEY, attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    value VARCHAR(150) NOT NULL, display_value VARCHAR(150), color_hex VARCHAR(20),
    sort_order INTEGER NOT NULL DEFAULT 0, UNIQUE(attribute_id, value))`;
  await sql`CREATE TABLE IF NOT EXISTS category_attributes (
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    is_required BOOLEAN NOT NULL DEFAULT FALSE, sort_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY(category_id, attribute_id))`;
  await sql`CREATE TABLE IF NOT EXISTS product_attribute_values (
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    attribute_id INTEGER NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    attribute_value_id INTEGER REFERENCES attribute_values(id) ON DELETE RESTRICT, value_text VARCHAR(500),
    PRIMARY KEY(product_id, attribute_id), CHECK (attribute_value_id IS NOT NULL OR value_text IS NOT NULL))`;
  await sql`CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY, product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(120) UNIQUE NOT NULL, price NUMERIC(12,2), sale_price NUMERIC(12,2),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    low_stock_threshold INTEGER NOT NULL DEFAULT 5, is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (reserved_quantity <= stock_quantity), CHECK (price IS NULL OR price >= 0),
    CHECK (sale_price IS NULL OR sale_price >= 0))`;
  await sql`CREATE TABLE IF NOT EXISTS variant_attribute_values (
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    attribute_value_id INTEGER NOT NULL REFERENCES attribute_values(id) ON DELETE RESTRICT,
    PRIMARY KEY(variant_id, attribute_value_id))`;
  await sql`CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    label VARCHAR(50) DEFAULT 'Home', full_name VARCHAR(200) NOT NULL, phone VARCHAR(50) NOT NULL,
    line1 VARCHAR(300) NOT NULL, line2 VARCHAR(300), city VARCHAR(100) NOT NULL,
    province VARCHAR(100), postal_code VARCHAR(30), country VARCHAR(100) NOT NULL DEFAULT 'Pakistan',
    is_default BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY, user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY, cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(cart_id, variant_id))`;
  await sql`CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY, order_number VARCHAR(40) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled','returned')),
    payment_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','authorized','paid','failed','refunded')),
    payment_method VARCHAR(30) NOT NULL DEFAULT 'cod', customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(255) NOT NULL, customer_phone VARCHAR(50) NOT NULL,
    shipping_address_id INTEGER REFERENCES addresses(id) ON DELETE SET NULL,
    shipping_address_snapshot JSONB NOT NULL, notes TEXT, currency CHAR(3) NOT NULL DEFAULT 'PKR',
    subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
    shipping_cost NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
    discount_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0), courier VARCHAR(100), tracking_number VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier VARCHAR(100)`;
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number VARCHAR(150)`;
  await sql`CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY, order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL, sku VARCHAR(120) NOT NULL,
    variant_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb, image_url VARCHAR(1000),
    quantity INTEGER NOT NULL CHECK (quantity > 0), unit_price NUMERIC(12,2) NOT NULL CHECK (unit_price >= 0),
    line_total NUMERIC(12,2) NOT NULL CHECK (line_total >= 0))`;
  await sql`CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY, order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    method VARCHAR(30) NOT NULL, status VARCHAR(30) NOT NULL DEFAULT 'pending',
    amount NUMERIC(12,2) NOT NULL, provider_reference VARCHAR(255),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`ALTER TABLE payments ADD COLUMN IF NOT EXISTS reconciled_at TIMESTAMPTZ`;
  await sql`ALTER TABLE payments ADD COLUMN IF NOT EXISTS reconciled_by INTEGER REFERENCES users(id) ON DELETE SET NULL`;
  await sql`CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGSERIAL PRIMARY KEY, order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    from_status VARCHAR(30), to_status VARCHAR(30) NOT NULL,
    changed_by INTEGER REFERENCES users(id) ON DELETE SET NULL, note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS inventory_movements (
    id BIGSERIAL PRIMARY KEY, variant_id INTEGER NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
    order_id BIGINT REFERENCES orders(id) ON DELETE SET NULL, quantity_change INTEGER NOT NULL,
    reason VARCHAR(40) NOT NULL, created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE, type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL, message TEXT NOT NULL, channel VARCHAR(20) NOT NULL DEFAULT 'in_app',
    is_read BOOLEAN NOT NULL DEFAULT FALSE, metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), read_at TIMESTAMPTZ)`;
  await sql`CREATE TABLE IF NOT EXISTS admin_store_settings (
    id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id=1), store_name VARCHAR(150) NOT NULL DEFAULT 'WEARWELL',
    store_email VARCHAR(255) NOT NULL DEFAULT 'hello@wearwell.pk', support_phone VARCHAR(50) NOT NULL DEFAULT '+92 300 1234567',
    website_url VARCHAR(255) NOT NULL DEFAULT 'www.wearwell.pk', address TEXT NOT NULL DEFAULT 'Pakistan',
    store_status BOOLEAN NOT NULL DEFAULT TRUE, email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
    order_notifications BOOLEAN NOT NULL DEFAULT TRUE, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`;
  await sql`INSERT INTO admin_store_settings(id) VALUES(1) ON CONFLICT(id) DO NOTHING`;
  await sql`CREATE TABLE IF NOT EXISTS wishlist_items (
    id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL,
    price NUMERIC(12,2) NOT NULL, original_price NUMERIC(12,2), category VARCHAR(100),
    image VARCHAR(500), in_stock BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_product UNIQUE(user_id, name))`;
  await sql`CREATE INDEX IF NOT EXISTS idx_products_category_status ON products(category_id, status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_variants_product_active ON product_variants(product_id, is_active)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders(user_id, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_orders_status_created ON orders(status, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC)`;
  await seedCatalog();
}

async function seedCatalog() {
  await sql`INSERT INTO brands(name,slug) VALUES ('WEARWELL','wearwell') ON CONFLICT(slug) DO NOTHING`;
  await sql`INSERT INTO categories(name,slug,sort_order) VALUES ('Ladies Clothing','ladies-clothing',1),('Men Clothing','men-clothing',2),('Accessories','accessories',3) ON CONFLICT(slug) DO NOTHING`;
  await sql`INSERT INTO categories(parent_id,name,slug,sort_order)
    SELECT p.id,v.name,v.slug,v.ord FROM (VALUES
      ('men-clothing','Unstitched','men-unstitched',1),('men-clothing','Stitched','men-stitched',2),
      ('men-clothing','Pants','men-pants',3),('men-clothing','Shirts','men-shirts',4),
      ('ladies-clothing','Unstitched','ladies-unstitched',1),('ladies-clothing','Stitched','ladies-stitched',2),
      ('accessories','Shoes','shoes',1),('accessories','Bags','bags',2),('accessories','Other Accessories','other-accessories',3)
    ) v(parent_slug,name,slug,ord) JOIN categories p ON p.slug=v.parent_slug ON CONFLICT(slug) DO NOTHING`;
  await sql`INSERT INTO attributes(name,code,display_type,is_variant,unit) VALUES
    ('Color','color','color',TRUE,NULL),('Clothing Size','size','select',TRUE,NULL),
    ('Shoe Size','shoe_size','select',TRUE,NULL),('Waist','waist','select',TRUE,'in'),
    ('Fabric','fabric','select',FALSE,NULL),('Material','material','select',FALSE,NULL),
    ('Length','length','number',FALSE,'m'),('Dimensions','dimensions','text',FALSE,'cm')
    ON CONFLICT(code) DO NOTHING`;
  await sql`INSERT INTO attribute_values(attribute_id,value,display_value,color_hex,sort_order)
    SELECT a.id,v.value,v.label,v.hex,v.ord FROM (VALUES
      ('color','Black','Black','#111111',1),('color','White','White','#FFFFFF',2),('color','Beige','Beige','#D7C2A4',3),
      ('size','S','Small',NULL,1),('size','M','Medium',NULL,2),('size','L','Large',NULL,3),('size','XL','Extra Large',NULL,4),
      ('shoe_size','40','EU 40',NULL,1),('shoe_size','41','EU 41',NULL,2),('shoe_size','42','EU 42',NULL,3),
      ('waist','30','30 in',NULL,1),('waist','32','32 in',NULL,2),('waist','34','34 in',NULL,3),
      ('fabric','Cotton','Cotton',NULL,1),('fabric','Linen','Linen',NULL,2),('material','Leather','Leather',NULL,1)
    ) v(code,value,label,hex,ord) JOIN attributes a ON a.code=v.code ON CONFLICT(attribute_id,value) DO NOTHING`;
  await sql`INSERT INTO category_attributes(category_id,attribute_id,is_required,sort_order)
    SELECT c.id,a.id,TRUE,v.ord FROM (VALUES
      ('men-shirts','size',1),('men-shirts','color',2),('men-pants','waist',1),('men-pants','color',2),
      ('men-stitched','size',1),('men-stitched','color',2),
      ('men-unstitched','fabric',1),('men-unstitched','color',2),('ladies-unstitched','fabric',1),
      ('ladies-stitched','size',1),('ladies-stitched','color',2),('shoes','shoe_size',1),('shoes','color',2),
      ('bags','material',1),('bags','color',2)
    ) v(category_slug,code,ord) JOIN categories c ON c.slug=v.category_slug JOIN attributes a ON a.code=v.code
    ON CONFLICT(category_id,attribute_id) DO NOTHING`;
  await sql`INSERT INTO products(category_id,brand_id,name,slug,description,base_sku,base_price,sale_price,status)
    SELECT c.id,b.id,v.name,v.slug,v.description,v.sku,v.price,v.sale,'active'
    FROM (VALUES
      ('ladies-stitched','Essential Oversized Tee','essential-oversized-tee','Relaxed everyday cotton tee.','WW-W-TEE',4299::numeric,3499::numeric),
      ('ladies-unstitched','Linen Unstitched Suit','linen-unstitched-suit','Breathable three-piece unstitched linen suit.','WW-W-UNS',6999,5999),
      ('men-shirts','Classic Casual Shirt','classic-casual-shirt','A versatile tailored casual shirt.','WW-M-SHT',5499,4499),
      ('men-pants','Modern Cargo Pants','modern-cargo-pants','Utility trousers with a modern relaxed fit.','WW-M-PNT',7499,6499),
      ('shoes','Everyday Sneakers','everyday-sneakers','Comfortable minimal sneakers for daily wear.','WW-A-SHO',6499,5499),
      ('bags','Minimal Shoulder Bag','minimal-shoulder-bag','A structured everyday shoulder bag.','WW-A-BAG',7499,5999)
    ) v(category_slug,name,slug,description,sku,price,sale)
    JOIN categories c ON c.slug=v.category_slug CROSS JOIN brands b WHERE b.slug='wearwell' ON CONFLICT(slug) DO NOTHING`;
  await sql`INSERT INTO products(category_id,brand_id,name,slug,description,base_sku,base_price,sale_price,status)
    SELECT c.id,b.id,v.name,v.slug,'A versatile WEARWELL essential designed for everyday style.',v.sku,v.price+1000,v.price,'active'
    FROM (VALUES
      ('ladies-stitched','Relaxed Fit Trousers','relaxed-fit-trousers','WW-W-RFT',6499::numeric),
      ('ladies-stitched','Premium Basic Hoodie','premium-basic-hoodie','WW-W-PBH',5999),
      ('ladies-stitched','Ribbed Knit Top','ribbed-knit-top','WW-W-RKT',3999),
      ('ladies-stitched','Relaxed Linen Shirt','relaxed-linen-shirt','WW-W-RLS',4499),
      ('ladies-stitched','Wide Leg Denim','wide-leg-denim','WW-W-WLD',5499),
      ('ladies-stitched','Oversized Blazer','oversized-blazer','WW-W-OBZ',8499),
      ('ladies-stitched','Satin Midi Dress','satin-midi-dress','WW-W-SMD',6999),
      ('ladies-stitched','Cropped Denim Jacket','cropped-denim-jacket','WW-W-CDJ',6499),
      ('ladies-stitched','Everyday Co-ord Set','everyday-co-ord-set','WW-W-ECS',7499),
      ('men-stitched','Urban Denim Jacket','urban-denim-jacket','WW-M-UDJ',7999),
      ('men-shirts','Essential Oxford Shirt','essential-oxford-shirt','WW-M-EOS',4999),
      ('men-shirts','Relaxed Fit Polo','relaxed-fit-polo','WW-M-RFP',3999),
      ('men-pants','Straight Fit Jeans','straight-fit-jeans','WW-M-SFJ',6499),
      ('men-shirts','Classic Overshirt','classic-overshirt','WW-M-COS',5499),
      ('men-stitched','Premium Bomber Jacket','premium-bomber-jacket','WW-M-PBJ',8999),
      ('men-pants','Regular Fit Chinos','regular-fit-chinos','WW-M-RFC',5999),
      ('men-shirts','Essential Cotton Sweatshirt','essential-cotton-sweatshirt','WW-M-ECS',5499),
      ('bags','Classic Leather Handbag','classic-leather-handbag','WW-A-CLH',7499),
      ('bags','Minimal Crossbody Bag','minimal-crossbody-bag','WW-A-MCB',5999),
      ('bags','Everyday Backpack','everyday-backpack','WW-A-EBP',6499),
      ('other-accessories','Classic Leather Belt','classic-leather-belt','WW-A-CLB',2999),
      ('other-accessories','Premium Sunglasses','premium-sunglasses','WW-A-PSG',4499),
      ('other-accessories','Everyday Watch','everyday-watch','WW-A-EWT',9499),
      ('other-accessories','Essential Cap','essential-cap','WW-A-ECP',2499),
      ('bags','Classic Canvas Tote','classic-canvas-tote','WW-A-CCT',3499)
    ) v(category_slug,name,slug,sku,price)
    JOIN categories c ON c.slug=v.category_slug CROSS JOIN brands b WHERE b.slug='wearwell'
    ON CONFLICT(slug) DO NOTHING`;
  await sql`INSERT INTO product_images(product_id,url,alt_text,sort_order,is_primary)
    SELECT p.id,${PRODUCT_IMAGE_PLACEHOLDER},p.name,0,TRUE FROM (VALUES
      ('essential-oversized-tee','/images/product-1.png'),('linen-unstitched-suit','/images/women-10.png'),
      ('classic-casual-shirt','/images/product-2.png'),('modern-cargo-pants','/images/men-8.png'),
      ('everyday-sneakers','/images/product-6.png'),('minimal-shoulder-bag','/images/product-3.png')
    ) v(slug,url) JOIN products p ON p.slug=v.slug WHERE NOT EXISTS(SELECT 1 FROM product_images pi WHERE pi.product_id=p.id)`;
  await sql`INSERT INTO product_images(product_id,url,alt_text,sort_order,is_primary)
    SELECT p.id,${PRODUCT_IMAGE_PLACEHOLDER},p.name,0,TRUE FROM (VALUES
      ('relaxed-fit-trousers','/images/product-4.png'),('premium-basic-hoodie','/images/product-7.png'),
      ('ribbed-knit-top','/images/women-4.png'),('relaxed-linen-shirt','/images/women-5.png'),('wide-leg-denim','/images/women-6.png'),
      ('oversized-blazer','/images/women-7.png'),('satin-midi-dress','/images/women-8.png'),('cropped-denim-jacket','/images/women-9.png'),
      ('everyday-co-ord-set','/images/women-10.png'),('urban-denim-jacket','/images/product-5.png'),
      ('essential-oxford-shirt','/images/men-4.png'),('relaxed-fit-polo','/images/men-5.png'),('straight-fit-jeans','/images/men-6.png'),
      ('classic-overshirt','/images/men-7.png'),('premium-bomber-jacket','/images/men-8.png'),('regular-fit-chinos','/images/men-9.png'),
      ('essential-cotton-sweatshirt','/images/men-10.png'),('classic-leather-handbag','/images/accessories-4.png'),
      ('minimal-crossbody-bag','/images/accessories-5.png'),('everyday-backpack','/images/accessories-6.png'),
      ('classic-leather-belt','/images/accessories-7.png'),('premium-sunglasses','/images/accessories-8.png'),
      ('everyday-watch','/images/accessories-9.png'),('essential-cap','/images/accessories-10.png'),('classic-canvas-tote','/images/accessories-4.png')
    ) v(slug,url) JOIN products p ON p.slug=v.slug WHERE NOT EXISTS(SELECT 1 FROM product_images pi WHERE pi.product_id=p.id)`;
  await sql`INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity)
    SELECT p.id,p.base_sku||'-'||v.suffix,p.base_price,p.sale_price,v.stock FROM products p JOIN (VALUES
      ('essential-oversized-tee','BLK-S',12),('essential-oversized-tee','BLK-M',18),('essential-oversized-tee','BLK-L',9),
      ('linen-unstitched-suit','BEI',15),('classic-casual-shirt','BLK-M',8),('classic-casual-shirt','BLK-L',5),('classic-casual-shirt','WHT-L',3),
      ('modern-cargo-pants','BLK-30',7),('modern-cargo-pants','BLK-32',10),('modern-cargo-pants','BLK-34',4),
      ('everyday-sneakers','WHT-40',5),('everyday-sneakers','WHT-41',8),('everyday-sneakers','WHT-42',6),
      ('minimal-shoulder-bag','BLK',11)
    ) v(slug,suffix,stock) ON p.slug=v.slug ON CONFLICT(sku) DO NOTHING`;
  await sql`INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity)
    SELECT p.id,p.base_sku||'-'||v.color||'-'||v.size,p.base_price,p.sale_price,v.stock
    FROM products p JOIN categories c ON c.id=p.category_id
    CROSS JOIN (VALUES ('BLK','S',8),('BLK','M',12),('BLK','L',6),('BEI','M',7),('WHT','L',5)) v(color,size,stock)
    WHERE c.slug IN ('ladies-stitched','men-stitched','men-shirts') ON CONFLICT(sku) DO NOTHING`;
  await sql`INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity)
    SELECT p.id,p.base_sku||'-'||v.color||'-'||v.waist,p.base_price,p.sale_price,v.stock
    FROM products p JOIN categories c ON c.id=p.category_id
    CROSS JOIN (VALUES ('BLK','30',6),('BLK','32',10),('BLK','34',4),('BEI','32',5)) v(color,waist,stock)
    WHERE c.slug='men-pants' ON CONFLICT(sku) DO NOTHING`;
  await sql`INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity)
    SELECT p.id,p.base_sku||'-'||v.color,p.base_price,p.sale_price,v.stock
    FROM products p JOIN categories c ON c.id=p.category_id CROSS JOIN (VALUES ('BLK',9),('BEI',6),('WHT',3)) v(color,stock)
    WHERE c.slug='bags' ON CONFLICT(sku) DO NOTHING`;
  await sql`INSERT INTO product_variants(product_id,sku,price,sale_price,stock_quantity)
    SELECT p.id,p.base_sku||'-STD',p.base_price,p.sale_price,12 FROM products p JOIN categories c ON c.id=p.category_id
    WHERE c.slug='other-accessories' ON CONFLICT(sku) DO NOTHING`;
  await sql`INSERT INTO variant_attribute_values(variant_id,attribute_value_id)
    SELECT pv.id,av.id FROM product_variants pv JOIN attribute_values av ON
      (split_part(pv.sku,'-',4)='BLK' AND av.value='Black') OR
      (split_part(pv.sku,'-',4)='WHT' AND av.value='White') OR
      (split_part(pv.sku,'-',4)='BEI' AND av.value='Beige') OR
      (split_part(pv.sku,'-',5) IN ('S','M','L') AND av.value=split_part(pv.sku,'-',5)) OR
      (split_part(pv.sku,'-',5) IN ('30','32','34') AND av.value=split_part(pv.sku,'-',5)) OR
      (split_part(pv.sku,'-',5) IN ('40','41','42') AND av.value=split_part(pv.sku,'-',5))
    JOIN attributes a ON a.id=av.attribute_id WHERE pv.sku LIKE 'WW-%'
      AND ((av.value IN ('Black','White','Beige') AND a.code='color') OR (av.value IN ('S','M','L') AND a.code='size') OR
        (av.value IN ('30','32','34') AND a.code='waist') OR (av.value IN ('40','41','42') AND a.code='shoe_size'))
    ON CONFLICT DO NOTHING`;
}
