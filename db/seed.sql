-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder UUID below with an actual user id from auth.users

DO $$
DECLARE
  test_user_id UUID := '00000000-0000-0000-0000-000000000001';
  task1_id     UUID := gen_random_uuid();
  task2_id     UUID := gen_random_uuid();
  task3_id     UUID := gen_random_uuid();
  cat1_id      UUID := gen_random_uuid();
  cat2_id      UUID := gen_random_uuid();
BEGIN

-- Seed: tasks
INSERT INTO tasks (id, user_id, title, description, status, priority, due_date, completed) VALUES
  (task1_id,           test_user_id, 'Design landing page',    'Create wireframes and mockups for the new landing page', 'in_progress', 'high',   '2026-04-25', false),
  (task2_id,           test_user_id, 'Write unit tests',       'Cover auth module with at least 80% code coverage',      'todo',        'medium', '2026-04-30', false),
  (task3_id,           test_user_id, 'Deploy to staging',      'Push latest build to staging environment',               'done',        'high',   '2026-04-17', true),
  (gen_random_uuid(),  test_user_id, 'Review pull requests',   'Review and merge open PRs from the team',                'todo',        'low',    '2026-04-20', false),
  (gen_random_uuid(),  test_user_id, 'Update documentation',   'Refresh README and API docs to reflect new endpoints',   'in_progress', 'medium', '2026-05-01', false);

-- Seed: categories
INSERT INTO categories (id, user_id, name, color) VALUES
  (cat1_id, test_user_id, 'Work',     '#4F46E5'),
  (cat2_id, test_user_id, 'Personal', '#10B981'),
  (gen_random_uuid(), test_user_id, 'Urgent', '#EF4444');

-- Seed: task_categories (link tasks to categories)
INSERT INTO task_categories (id, user_id, task_id, category_id) VALUES
  (gen_random_uuid(), test_user_id, task1_id, cat1_id),
  (gen_random_uuid(), test_user_id, task2_id, cat1_id),
  (gen_random_uuid(), test_user_id, task3_id, cat2_id);

END $$;
