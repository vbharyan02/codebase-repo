-- ============================================================
-- RLS: tasks
-- ============================================================
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tasks_select" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "tasks_insert" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "tasks_update" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "tasks_delete" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- RLS: categories
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select" ON categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "categories_insert" ON categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "categories_update" ON categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "categories_delete" ON categories
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- RLS: task_categories
-- ============================================================
ALTER TABLE task_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "task_categories_select" ON task_categories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "task_categories_insert" ON task_categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "task_categories_update" ON task_categories
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "task_categories_delete" ON task_categories
  FOR DELETE USING (auth.uid() = user_id);
