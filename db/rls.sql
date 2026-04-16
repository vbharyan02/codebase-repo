-- Enable RLS on todos
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- 4 policies — users only see and touch their own rows
CREATE POLICY "todos_select" ON todos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "todos_insert" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "todos_update" ON todos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "todos_delete" ON todos
  FOR DELETE USING (auth.uid() = user_id);
