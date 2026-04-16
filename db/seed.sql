-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder UUID below with an actual user id from auth.users

DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN

INSERT INTO todos (id, user_id, title, description, is_completed, due_date) VALUES
  (gen_random_uuid(), test_user_id, 'Buy groceries', 'Milk, eggs, bread, and vegetables', false, '2026-04-20'),
  (gen_random_uuid(), test_user_id, 'Read a book', 'Finish reading "Clean Code"', false, '2026-04-30'),
  (gen_random_uuid(), test_user_id, 'Morning run', '5km jog around the park', true, '2026-04-17'),
  (gen_random_uuid(), test_user_id, 'Pay electricity bill', NULL, false, '2026-04-25'),
  (gen_random_uuid(), test_user_id, 'Call dentist', 'Schedule annual checkup appointment', false, NULL);

END $$;
