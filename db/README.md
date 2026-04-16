# expense-tracker — Database Setup

## Running the SQL files

### 1. schema.sql (required first)
1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Paste the contents of `schema.sql`
4. Click **Run**

This creates the `expenses` table, user_id index, and the `updated_at` auto-update trigger.

### 2. rls.sql (required, run after schema.sql)
1. In **SQL Editor**, paste the contents of `rls.sql`
2. Click **Run**

This enables Row Level Security and adds four policies so users can only access their own rows.

### 3. seed.sql (optional — for testing)
1. Create a test user via Supabase Auth (Dashboard → Authentication → Users → Add user)
2. Copy the user's UUID
3. Replace `00000000-0000-0000-0000-000000000001` in `seed.sql` with that UUID
4. Paste into **SQL Editor** and click **Run**

---

## Table structure

### `expenses`

| Column       | Type        | Nullable | Notes                                  |
|--------------|-------------|----------|----------------------------------------|
| id           | UUID        | NO       | Primary key, auto-generated            |
| user_id      | UUID        | NO       | FK → auth.users(id) ON DELETE CASCADE  |
| title        | TEXT        | NO       |                                        |
| amount       | INTEGER     | NO       | Amount in smallest currency unit       |
| category     | TEXT        | NO       |                                        |
| notes        | TEXT        | YES      |                                        |
| expense_date | DATE        | NO       |                                        |
| created_at   | TIMESTAMPTZ | NO       | Set on insert                          |
| updated_at   | TIMESTAMPTZ | NO       | Auto-updated on every UPDATE           |

---

## RLS policy summary

All four policies on `expenses` check `auth.uid() = user_id`:

| Policy            | Operation | Effect                                      |
|-------------------|-----------|---------------------------------------------|
| expenses_select   | SELECT    | Users can only read their own expenses      |
| expenses_insert   | INSERT    | Users can only insert rows with their uid   |
| expenses_update   | UPDATE    | Users can only update their own expenses    |
| expenses_delete   | DELETE    | Users can only delete their own expenses    |
