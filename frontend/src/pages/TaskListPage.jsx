import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import supabase from '../lib/supabase'

const STATUS_FILTERS = ['all', 'pending', 'in_progress', 'done']

export default function TaskListPage() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    setLoading(true)
    const { data, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setTasks(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => { fetchTasks() }, [])

  const handleSave = (newTask) => {
    setTasks((prev) => [newTask, ...prev])
    setShowForm(false)
  }

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const visible = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {showForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showForm && (
          <div className="mb-6 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">New Task</h2>
            <TaskForm onSave={handleSave} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-5 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filter === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-16 text-sm text-gray-400">
            {filter === 'all' ? 'No tasks yet. Create your first one!' : `No tasks with status "${filter}".`}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visible.map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
