# todo-app — Database Setup

## How to run

### 1. Run schema.sql
1. Open your Supabase project dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New query**
4. Paste the contents of `schema.sql`
5. Click **Run**

### 2. Run rls.sql
After schema.sql succeeds:
1. Open a new SQL Editor query
2. Paste the contents of `rls.sql`
3. Click **Run**

### 3. Run seed.sql (optional, for testing)
Before running seed.sql:
- Create a test user via Supabase Auth (Dashboard → Authentication → Users → Invite)
- Replace the placeholder UUID `00000000-0000-0000-0000-000000000001` in `seed.sql` with the real user's UUID

Then:
1. Open a new SQL Editor query
2. Paste the contents of `seed.sql`
3. Click **Run**

---

## Table Structure

### `todos`

| Column         | Type        | Nullable | Default              | Notes                        |
|----------------|-------------|----------|----------------------|------------------------------|
| `id`           | UUID        | NO       | `gen_random_uuid()`  | Primary key                  |
| `user_id`      | UUID        | NO       |                      | FK → `auth.users(id)` CASCADE|
| `title`        | TEXT        | NO       |                      |                              |
| `description`  | TEXT        | YES      |                      |                              |
| `is_completed` | BOOLEAN     | NO       | `false`              |                              |
| `due_date`     | DATE        | YES      |                      |                              |
| `created_at`   | TIMESTAMPTZ | NO       | `NOW()`              |                              |
| `updated_at`   | TIMESTAMPTZ | NO       | `NOW()`              | Auto-updated via trigger     |

---

## RLS Policy Summary

All policies on `todos` restrict access so that **each user can only see and modify their own rows** (`auth.uid() = user_id`).

| Policy          | Operation | Rule                        |
|-----------------|-----------|-----------------------------|
| `todos_select`  | SELECT    | `auth.uid() = user_id`      |
| `todos_insert`  | INSERT    | `auth.uid() = user_id`      |
| `todos_update`  | UPDATE    | `auth.uid() = user_id`      |
| `todos_delete`  | DELETE    | `auth.uid() = user_id`      |
