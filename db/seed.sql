-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder UUID below with a real user_id from auth.users

DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
BEGIN

INSERT INTO todos (id, user_id, title, notes, priority, completed) VALUES
  (gen_random_uuid(), test_user_id, 'Buy groceries', 'Milk, eggs, bread, and coffee', 'medium', FALSE),
  (gen_random_uuid(), test_user_id, 'Finish project report', 'Due end of the week — include charts', 'high', FALSE),
  (gen_random_uuid(), test_user_id, 'Call the dentist', NULL, 'low', TRUE),
  (gen_random_uuid(), test_user_id, 'Review pull requests', 'Three open PRs waiting for review', 'high', FALSE),
  (gen_random_uuid(), test_user_id, 'Clean the apartment', NULL, 'medium', FALSE);

END $$;
