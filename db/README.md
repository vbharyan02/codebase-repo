# todo-app — Database Setup

## How to run

### 1. Run schema.sql
1. Open the [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **SQL Editor**
4. Paste the contents of `schema.sql`
5. Click **Run**

### 2. Run rls.sql
After `schema.sql` succeeds, paste the contents of `rls.sql` into the SQL Editor and click **Run**.

### 3. Run seed.sql (optional — for testing)
- Edit `seed.sql` and replace `00000000-0000-0000-0000-000000000001` with a real user UUID from your `auth.users` table.
- Paste into the SQL Editor and click **Run**.

---

## Table Structure

### `todos`

| Column       | Type        | Nullable | Default              | Notes                          |
|--------------|-------------|----------|----------------------|--------------------------------|
| `id`         | UUID        | NO       | `gen_random_uuid()`  | Primary key                    |
| `user_id`    | UUID        | NO       |                      | FK → `auth.users(id)` CASCADE  |
| `title`      | TEXT        | NO       |                      |                                |
| `notes`      | TEXT        | YES      |                      |                                |
| `priority`   | TEXT        | NO       |                      | e.g. `low`, `medium`, `high`   |
| `completed`  | BOOLEAN     | NO       | `FALSE`              |                                |
| `created_at` | TIMESTAMPTZ | NO       | `NOW()`              |                                |
| `updated_at` | TIMESTAMPTZ | NO       | `NOW()`              | Auto-updated via trigger       |

---

## RLS Policy Summary

| Policy          | Operation | Rule                          |
|-----------------|-----------|-------------------------------|
| `todos_select`  | SELECT    | `auth.uid() = user_id`        |
| `todos_insert`  | INSERT    | `auth.uid() = user_id`        |
| `todos_update`  | UPDATE    | `auth.uid() = user_id`        |
| `todos_delete`  | DELETE    | `auth.uid() = user_id`        |

All policies enforce that authenticated users can only access their own rows. Unauthenticated requests are blocked entirely.
