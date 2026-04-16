import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import TaskForm from '../components/TaskForm'
import supabase from '../lib/supabase'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
}

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      const { data, error: fetchError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setTask(data)
      }
      setLoading(false)
    }

    fetchTask()
  }, [id])

  const handleSave = (updated) => {
    setTask(updated)
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this task?')) return
    const { error: deleteError } = await supabase.from('tasks').delete().eq('id', id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    navigate('/tasks')
  }

  const isOverdue =
    task?.due_date &&
    task.status !== 'done' &&
    new Date(task.due_date) < new Date()

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Link to="/tasks" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            ← Back to Tasks
          </Link>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : !task ? (
          <div className="text-center py-16 text-sm text-gray-400">Task not found.</div>
        ) : editing ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Edit Task</h2>
            <TaskForm task={task} onSave={handleSave} onCancel={() => setEditing(false)} />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-xl font-bold text-gray-900 flex-1">{task.title}</h1>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                  STATUS_STYLES[task.status] ?? 'bg-gray-100 text-gray-700'
                }`}
              >
                {task.status.replace('_', ' ')}
              </span>
            </div>

            {task.description && (
              <p className="text-sm text-gray-600 mb-5 whitespace-pre-wrap">{task.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
              <div>
                <span className="font-medium text-gray-700">Due date</span>
                <p className={isOverdue ? 'text-red-500 font-medium' : ''}>
                  {task.due_date
                    ? `${new Date(task.due_date).toLocaleDateString()}${isOverdue ? ' — Overdue' : ''}`
                    : 'None'}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Created</span>
                <p>{new Date(task.created_at).toLocaleDateString()}</p>
              </div>
              {task.updated_at && (
                <div>
                  <span className="font-medium text-gray-700">Last updated</span>
                  <p>{new Date(task.updated_at).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
