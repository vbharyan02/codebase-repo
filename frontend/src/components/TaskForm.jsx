import { useState } from 'react'
import supabase from '../lib/supabase'

const STATUS_OPTIONS = ['pending', 'in_progress', 'done']

export default function TaskForm({ task, onSave, onCancel }) {
  const isEdit = Boolean(task)
  const [fields, setFields] = useState({
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'pending',
    due_date: task?.due_date ?? '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    if (!fields.title.trim()) return 'Title is required.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setError(err); return }

    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    const payload = {
      title: fields.title.trim(),
      description: fields.description.trim() || null,
      status: fields.status,
      due_date: fields.due_date || null,
      user_id: user.id,
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('tasks')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', task.id)
        .select()
        .single()
    } else {
      result = await supabase
        .from('tasks')
        .insert(payload)
        .select()
        .single()
    }

    setLoading(false)

    if (result.error) {
      setError(result.error.message)
      return
    }

    onSave(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={fields.title}
          onChange={set('title')}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Task title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={fields.description}
          onChange={set('description')}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Optional description"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={fields.status}
            onChange={set('status')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={fields.due_date}
            onChange={set('due_date')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving…' : isEdit ? 'Update Task' : 'Create Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
