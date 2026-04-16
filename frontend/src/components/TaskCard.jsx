import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  done: 'bg-green-100 text-green-800',
}

export default function TaskCard({ task, onDelete }) {
  const isOverdue =
    task.due_date &&
    task.status !== 'done' &&
    new Date(task.due_date) < new Date()

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/tasks/${task.id}`}
          className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors flex-1 min-w-0 truncate"
        >
          {task.title}
        </Link>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
            STATUS_STYLES[task.status] ?? 'bg-gray-100 text-gray-700'
          }`}
        >
          {task.status.replace('_', ' ')}
        </span>
      </div>

      {task.description && (
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{task.description}</p>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {task.due_date ? (
            <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
              Due {new Date(task.due_date).toLocaleDateString()}
              {isOverdue ? ' — Overdue' : ''}
            </span>
          ) : (
            'No due date'
          )}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/tasks/${task.id}`}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
