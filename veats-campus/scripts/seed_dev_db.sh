#!/usr/bin/env bash
# VEats — Seed Development Database
# Usage: ./scripts/seed_dev_db.sh
# Requires: DATABASE_URL env var or Postgres running on localhost:5432

set -euo pipefail

DB_URL="${DATABASE_URL:-postgresql://veats:veats_dev@localhost:5432/veats_dev}"
echo "🌱 Seeding VEats dev database..."

# ── Seed SQL ──
psql "$DB_URL" <<'SQL'
-- Clear existing seed data (idempotent)
DELETE FROM food_log;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM settlements;
DELETE FROM menu_items;
DELETE FROM vendors;
DELETE FROM users;

-- Users
INSERT INTO users (id, full_name, email, phone, password, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Demo Customer', 'demo@veats.in', '9876543210', '$2b$10$DUMMY_HASH_FOR_DEV', 'CUSTOMER'),
  ('22222222-2222-2222-2222-222222222222', 'Vendor Admin Café', 'cafe@veats.in', '9876543211', '$2b$10$DUMMY_HASH_FOR_DEV', 'VENDOR'),
  ('33333333-3333-3333-3333-333333333333', 'Platform Admin', 'admin@veats.in', '9876543212', '$2b$10$DUMMY_HASH_FOR_DEV', 'ADMIN');

-- Vendors
INSERT INTO vendors (id, name, outlet_code, location, commission_percent, status) VALUES
  ('aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Café Central', 'CAFE-001', 'Main Building, Ground Floor', 10, 'ACTIVE'),
  ('bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Mess A', 'MESS-A01', 'Hostel Block A', 8, 'ACTIVE'),
  ('cccc3333-cccc-cccc-cccc-cccccccccccc', 'Tech Mart', 'TECH-001', 'Engineering Block Canteen', 12, 'ACTIVE');

-- Menu Items (3 per vendor, 9 total)
INSERT INTO menu_items (id, vendor_id, name, description, image_path, price, is_veg, calories, protein_g, carbs_g, fat_g, is_available) VALUES
  -- Café Central
  ('a0000001-0000-0000-0000-000000000001', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Masala Chai', 'Spiced Indian tea with milk', NULL, 30, true, 120, 3, 18, 4, true),
  ('a0000002-0000-0000-0000-000000000002', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Paneer Sandwich', 'Grilled paneer with mint chutney', NULL, 80, true, 320, 14, 35, 14, true),
  ('a0000003-0000-0000-0000-000000000003', 'aaaa1111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Cold Coffee', 'Iced coffee with cream', NULL, 60, true, 180, 5, 28, 6, true),
  -- Mess A
  ('b0000001-0000-0000-0000-000000000001', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Thali Veg', 'Rice, dal, sabzi, roti, salad', NULL, 70, true, 550, 18, 75, 15, true),
  ('b0000002-0000-0000-0000-000000000002', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Chicken Biryani', 'Hyderabadi-style dum biryani', NULL, 120, false, 650, 32, 70, 22, true),
  ('b0000003-0000-0000-0000-000000000003', 'bbbb2222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Curd Rice', 'Tempered curd rice with pomegranate', NULL, 40, true, 250, 8, 40, 6, true),
  -- Tech Mart
  ('c0000001-0000-0000-0000-000000000001', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'Veg Burger', 'Crispy aloo tikki burger', NULL, 90, true, 420, 10, 50, 18, true),
  ('c0000002-0000-0000-0000-000000000002', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'French Fries', 'Golden crispy fries with ketchup', NULL, 60, true, 310, 4, 42, 15, true),
  ('c0000003-0000-0000-0000-000000000003', 'cccc3333-cccc-cccc-cccc-cccccccccccc', 'Chicken Wrap', 'Grilled chicken in tortilla wrap', NULL, 110, false, 480, 28, 40, 18, true);

SELECT '✅ Seeded: ' || count(*) || ' users' FROM users;
SELECT '✅ Seeded: ' || count(*) || ' vendors' FROM vendors;
SELECT '✅ Seeded: ' || count(*) || ' menu items' FROM menu_items;
SQL

echo ""
echo "🎉 Database seeded successfully!"
echo "   Demo customer: demo@veats.in / (dev hash)"
echo "   Vendor admin:  cafe@veats.in / (dev hash)"
echo "   Platform admin: admin@veats.in / (dev hash)"
