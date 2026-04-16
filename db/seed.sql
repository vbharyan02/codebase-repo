-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder UUID below with a real user_id from auth.users

INSERT INTO expenses (id, user_id, title, amount, category, notes, expense_date) VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Grocery run', 4500, 'Food', 'Weekly groceries from supermarket', '2026-04-01'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Uber to airport', 1200, 'Transport', NULL, '2026-04-03'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Netflix subscription', 649, 'Entertainment', 'Monthly plan', '2026-04-05'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Electricity bill', 3200, 'Utilities', 'April billing cycle', '2026-04-10'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'Lunch with team', 2100, 'Food', 'Team outing at cafe', '2026-04-15');
