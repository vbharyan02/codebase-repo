-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder UUID below with a real user_id from auth.users

DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
  cat_food     UUID := gen_random_uuid();
  cat_travel   UUID := gen_random_uuid();
  cat_bills    UUID := gen_random_uuid();
BEGIN

-- Seed categories
INSERT INTO categories (id, user_id, name, color) VALUES
  (cat_food,   test_user_id, 'Food & Dining',  '#FF6B6B'),
  (cat_travel, test_user_id, 'Travel',          '#4ECDC4'),
  (cat_bills,  test_user_id, 'Bills & Utilities','#45B7D1');

-- Seed expenses
INSERT INTO expenses (id, user_id, title, amount, category_id, date, notes) VALUES
  (gen_random_uuid(), test_user_id, 'Grocery run',           4500, cat_food,   '2026-04-01', 'Weekly groceries from the supermarket'),
  (gen_random_uuid(), test_user_id, 'Flight to Bangalore',  12000, cat_travel, '2026-04-05', 'Round trip, economy class'),
  (gen_random_uuid(), test_user_id, 'Electricity bill',      2200, cat_bills,  '2026-04-10', 'April electricity bill'),
  (gen_random_uuid(), test_user_id, 'Dinner with friends',   1800, cat_food,   '2026-04-12', 'Birthday dinner at restaurant'),
  (gen_random_uuid(), test_user_id, 'Internet bill',         1499, cat_bills,  '2026-04-15', 'Monthly broadband subscription');

END $$;
