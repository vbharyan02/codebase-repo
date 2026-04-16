-- Run this AFTER schema.sql and AFTER creating a test user
-- Replace the placeholder user_id with your actual test user's UUID from auth.users

INSERT INTO tasks (id, user_id, title, description, status, due_date) VALUES
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'Set up project repository',
    'Initialize Git repo, add README and .gitignore',
    'done',
    '2026-04-10'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'Design database schema',
    'Define tables, columns, and relationships for the task manager app',
    'done',
    '2026-04-12'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'Implement authentication',
    'Integrate Supabase Auth with email/password sign-up and login',
    'in_progress',
    '2026-04-18'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'Build task CRUD UI',
    'Create, read, update, and delete tasks from the frontend',
    'todo',
    '2026-04-25'
  ),
  (
    gen_random_uuid(),
    '00000000-0000-0000-0000-000000000001',
    'Write end-to-end tests',
    NULL,
    'todo',
    '2026-04-30'
  );
