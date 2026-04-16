import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import TodoCard from '../components/TodoCard'
import supabase from '../lib/supabase'

export default function DashboardPage() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (err) {
        setError('Failed to load todos.')
      } else {
        setTodos(data)
      }
      setLoading(false)
    }

    fetchTodos()
  }, [])

  const handleToggle = async (todo) => {
    const { error: err } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', todo.id)

    if (err) {
      setError('Failed to update todo.')
      return
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t))
    )
  }

  const handleDelete = async (id) => {
    const { error: err } = await supabase.from('todos').delete().eq('id', id)
    if (err) {
      setError('Failed to delete todo.')
      return
    }
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed

  const highPriority = todos.filter((t) => t.priority === 'high' && !t.completed).length

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total (recent)', value: total, color: 'indigo' },
            { label: 'Completed', value: completed, color: 'green' },
            { label: 'High Priority', value: highPriority, color: 'red' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white border rounded-lg p-4 shadow-sm text-center">
              <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent todos */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Recent Todos</h2>
          <Link to="/todos" className="text-sm text-indigo-600 hover:underline">
            View all →
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            No todos yet.{' '}
            <Link to="/todos" className="text-indigo-600 hover:underline">
              Create one
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
