# task-manager — Database Setup

## Running the SQL files

### 1. schema.sql (required first)
1. Open your Supabase project dashboard.
2. Navigate to **SQL Editor**.
3. Paste the contents of `schema.sql` and click **Run**.

This creates the `tasks` table, the `user_id` index, and the `update_updated_at` trigger.

### 2. rls.sql (required, run after schema.sql)
1. In the **SQL Editor**, paste the contents of `rls.sql` and click **Run**.

This enables Row Level Security on the `tasks` table and creates the four access policies.

### 3. seed.sql (optional — for testing only)
1. Create a test user via Supabase Auth (Dashboard → Authentication → Users → Invite user).
2. Copy the new user's UUID.
3. In `seed.sql`, replace every occurrence of `00000000-0000-0000-0000-000000000001` with that UUID.
4. Paste the modified file into the **SQL Editor** and click **Run**.

---

## Table structure

### tasks
| Column      | Type        | Nullable | Default              | Notes                          |
|-------------|-------------|----------|----------------------|--------------------------------|
| id          | UUID        | NO       | gen_random_uuid()    | Primary key                    |
| user_id     | UUID        | NO       |                      | FK → auth.users(id) ON DELETE CASCADE |
| title       | TEXT        | NO       |                      |                                |
| description | TEXT        | YES      |                      |                                |
| status      | TEXT        | NO       |                      | e.g. todo / in_progress / done |
| due_date    | DATE        | YES      |                      |                                |
| created_at  | TIMESTAMPTZ | NO       | NOW()                |                                |
| updated_at  | TIMESTAMPTZ | NO       | NOW()                | Auto-updated by trigger        |

---

## RLS policy summary

All four policies on `tasks` restrict access so that **each user can only see and modify their own rows** (where `auth.uid() = user_id`).

| Policy name    | Operation | Rule                      |
|----------------|-----------|---------------------------|
| tasks_select   | SELECT    | `auth.uid() = user_id`    |
| tasks_insert   | INSERT    | `auth.uid() = user_id`    |
| tasks_update   | UPDATE    | `auth.uid() = user_id`    |
| tasks_delete   | DELETE    | `auth.uid() = user_id`    |
