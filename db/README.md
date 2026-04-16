# expense-tracker — Database Setup

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

### `categories`

| Column       | Type        | Nullable | Default             | Notes                         |
|--------------|-------------|----------|---------------------|-------------------------------|
| `id`         | UUID        | NO       | `gen_random_uuid()` | Primary key                   |
| `user_id`    | UUID        | NO       |                     | FK → `auth.users(id)` CASCADE |
| `name`       | TEXT        | NO       |                     | Category label                |
| `color`      | TEXT        | YES      |                     | Hex color for UI              |
| `created_at` | TIMESTAMPTZ | NO       | `NOW()`             |                               |
| `updated_at` | TIMESTAMPTZ | NO       | `NOW()`             | Auto-updated via trigger      |

### `expenses`

| Column        | Type        | Nullable | Default             | Notes                              |
|---------------|-------------|----------|---------------------|------------------------------------|
| `id`          | UUID        | NO       | `gen_random_uuid()` | Primary key                        |
| `user_id`     | UUID        | NO       |                     | FK → `auth.users(id)` CASCADE      |
| `title`       | TEXT        | NO       |                     | Short description of the expense   |
| `amount`      | INTEGER     | NO       |                     | Amount in smallest currency unit   |
| `category_id` | UUID        | YES      |                     | FK → `categories(id)` SET NULL     |
| `date`        | DATE        | NO       |                     | Date the expense occurred          |
| `notes`       | TEXT        | YES      |                     | Optional longer description        |
| `created_at`  | TIMESTAMPTZ | NO       | `NOW()`             |                                    |
| `updated_at`  | TIMESTAMPTZ | NO       | `NOW()`             | Auto-updated via trigger           |

---

## RLS Policy Summary

### `categories`

| Policy               | Operation | Rule                   |
|----------------------|-----------|------------------------|
| `categories_select`  | SELECT    | `auth.uid() = user_id` |
| `categories_insert`  | INSERT    | `auth.uid() = user_id` |
| `categories_update`  | UPDATE    | `auth.uid() = user_id` |
| `categories_delete`  | DELETE    | `auth.uid() = user_id` |

### `expenses`

| Policy            | Operation | Rule                   |
|-------------------|-----------|------------------------|
| `expenses_select` | SELECT    | `auth.uid() = user_id` |
| `expenses_insert` | INSERT    | `auth.uid() = user_id` |
| `expenses_update` | UPDATE    | `auth.uid() = user_id` |
| `expenses_delete` | DELETE    | `auth.uid() = user_id` |

All policies enforce that authenticated users can only access their own rows. Unauthenticated requests are blocked entirely.
