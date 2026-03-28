-- VEats — Initial Database Schema (Supabase SQL Migration)
-- Run this in Supabase SQL Editor or via supabase db push

-- ── Enums ──
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN', 'MANAGEMENT');
CREATE TYPE payment_status AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE order_status AS ENUM ('PLACED', 'CONFIRMED', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');
CREATE TYPE vendor_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE payout_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- ── Tables ──

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password TEXT NOT NULL,
  role user_role DEFAULT 'CUSTOMER',
  wallet NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  outlet_code TEXT UNIQUE NOT NULL,
  location TEXT,
  commission_percent NUMERIC(5,2) DEFAULT 10,
  status vendor_status DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  name TEXT NOT NULL,
  description TEXT,
  image_path TEXT,
  price NUMERIC(10,2) NOT NULL,
  is_veg BOOLEAN DEFAULT true,
  calories INT DEFAULT 0,
  protein_g NUMERIC(6,2) DEFAULT 0,
  carbs_g NUMERIC(6,2) DEFAULT 0,
  fat_g NUMERIC(6,2) DEFAULT 0,
  is_available BOOLEAN DEFAULT true
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  total_amount NUMERIC(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'PENDING',
  order_status order_status DEFAULT 'PLACED',
  pickup_code TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  quantity INT NOT NULL,
  item_price NUMERIC(10,2) NOT NULL
);

CREATE TABLE settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_sales NUMERIC(10,2) NOT NULL,
  commission NUMERIC(10,2) NOT NULL,
  payout_amount NUMERIC(10,2) NOT NULL,
  payout_status payout_status DEFAULT 'PENDING'
);

CREATE TABLE food_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id),
  quantity INT DEFAULT 1,
  calories INT DEFAULT 0,
  protein_g NUMERIC(6,2) DEFAULT 0,
  carbs_g NUMERIC(6,2) DEFAULT 0,
  fat_g NUMERIC(6,2) DEFAULT 0,
  logged_at TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ──
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_menu_items_vendor_id ON menu_items(vendor_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- ── Row Level Security (RLS) ──
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;

-- Customers see own data
CREATE POLICY "customers_own_orders" ON orders
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "customers_own_food_log" ON food_log
  FOR SELECT USING (auth.uid()::text = user_id::text);

-- Vendors see orders for their items
CREATE POLICY "vendors_own_order_items" ON order_items
  FOR SELECT USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE id = vendor_id
      -- In production: match vendor_id to auth.uid() via a vendors_users join table
    )
  );

-- Public read for vendors and menu items
CREATE POLICY "public_read_vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "public_read_menu" ON menu_items FOR SELECT USING (true);

-- Admins full access (use service role key for admin operations)
-- NOTE: Admin policies should use auth.jwt() -> role = 'ADMIN' check
-- For simplicity, admin operations use the service_role key which bypasses RLS
