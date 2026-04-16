import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/todos', label: 'Todos' },
]

export default function Layout({ children }) {
  const { user, signOut } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-indigo-700 text-white flex md:flex-col">
        <div className="flex items-center justify-between md:justify-center px-4 py-4 border-b border-indigo-600">
          <Link to="/" className="text-xl font-bold tracking-tight">Todo App</Link>
        </div>
        <nav className="flex md:flex-col gap-1 px-2 py-2 flex-1 overflow-x-auto md:overflow-x-visible">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
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
        <div className="px-4 py-4 border-t border-indigo-600 md:mt-auto">
          <p className="text-xs text-indigo-200 truncate mb-2">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="w-full text-left text-sm text-indigo-100 hover:text-white hover:underline"
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
