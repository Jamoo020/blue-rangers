import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-700 hover:text-blue-600'

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/staff', label: 'Staff' },
    { path: '/join', label: 'Join Us' },
    { path: '/news', label: 'News' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/contact', label: 'Contact' },
  ]

  const firstTeamItems = [
    { path: '/', label: 'Latest' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/results', label: 'Results' },
    { path: '/standings', label: 'Standings' },
    { path: '/team', label: 'Players' },
    { path: '/gallery', label: 'Photos' },
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-xl border-b border-emerald-500/30">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex justify-center items-center gap-2 py-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`py-2 px-4 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 transform hover:scale-110 hover:cursor-pointer ${isActive(item.path)} hover:text-white`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden flex items-center justify-between py-3">
            <span className="text-base font-bold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-3 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? '✕ Close' : '☰ Open'}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-2 px-3 text-gray-200 rounded-lg hover:bg-white/10 hover:text-white transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

    </>
  )
}
