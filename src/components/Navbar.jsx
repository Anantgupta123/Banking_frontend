import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
    setMobileOpen(false)
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center py-4">
<Link to="/dashboard" className="text-2xl font-bold">
            <img src="https://ik.imagekit.io/ggvt2eqki/image_8sHN7XK4W.jpg?updatedAt=1771857619263&tr=n-ik_ml_thumbnail" alt="Banking Logo" className="h-8 w-auto inline-block mr-2" />
            Banking
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-medium"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              <span className="text-gray-700 font-medium text-sm">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors w-full text-left font-medium"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

