import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/tasks', label: 'Tasks' },
]

export default function Layout({ children }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-indigo-700 text-white flex md:flex-col">
        <div className="px-6 py-5 text-xl font-bold tracking-tight border-b border-indigo-600 hidden md:block">
          Task Manager
        </div>

        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-3 md:hidden w-full border-b border-indigo-600">
          <span className="text-lg font-bold">Task Manager</span>
        </div>

        <nav className="flex md:flex-col gap-1 p-3 flex-1 overflow-x-auto md:overflow-x-visible">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block p-4 border-t border-indigo-600">
          <p className="text-xs text-indigo-300 truncate mb-2">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-indigo-100 hover:text-white hover:bg-indigo-600 px-3 py-2 rounded-lg transition-colors text-left"
          >
            Sign out
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2 px-4 py-3 border-t border-indigo-600">
          <span className="text-xs text-indigo-300 truncate flex-1">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-indigo-100 hover:text-white px-2 py-1 rounded transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
