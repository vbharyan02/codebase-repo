import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import useAuthStore from '../store/authStore'
import supabase from '../lib/supabase'

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, done: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, status, due_date, created_at')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setStats({
          total: data.length,
          pending: data.filter((t) => t.status === 'pending').length,
          in_progress: data.filter((t) => t.status === 'in_progress').length,
          done: data.filter((t) => t.status === 'done').length,
        })
        setRecent(data.slice(0, 5))
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  const statCards = [
    { label: 'Total', value: stats.total, color: 'bg-indigo-50 text-indigo-700' },
    { label: 'Pending', value: stats.pending, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'In Progress', value: stats.in_progress, color: 'bg-blue-50 text-blue-700' },
    { label: 'Done', value: stats.done, color: 'bg-green-50 text-green-700' },
  ]

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">
          Welcome back, <span className="font-medium text-gray-700">{user?.email}</span>
        </p>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {statCards.map(({ label, value, color }) => (
                <div key={label} className={`rounded-xl p-5 ${color}`}>
                  <p className="text-3xl font-bold">{value}</p>
                  <p className="text-sm font-medium mt-1">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700">Recent Tasks</h2>
                <Link to="/tasks" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  View all
                </Link>
              </div>

              {recent.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm text-gray-400">
                  No tasks yet.{' '}
                  <Link to="/tasks" className="text-indigo-600 hover:underline">
                    Create one
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recent.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 px-5 py-3">
                      <Link
                        to={`/tasks/${task.id}`}
                        className="flex-1 text-sm font-medium text-gray-800 hover:text-indigo-600 truncate"
                      >
                        {task.title}
                      </Link>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                          STATUS_COLORS[task.status] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {task.status.replace('_', ' ')}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
