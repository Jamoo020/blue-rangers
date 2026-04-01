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
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between py-3">
            <span className="text-base font-bold">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              className="px-3 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`} onClick={() => setMobileMenuOpen(false)} />

          <div className={`fixed top-0 left-0 h-full w-64 bg-slate-900 p-4 shadow-2xl transform transition-transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">Site Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="px-2 py-1 text-white rounded hover:bg-white/10">
                ✕
              </button>
            </div>
            <div className="space-y-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-2 px-2 rounded-lg transition font-medium ${isActive(item.path)} ${location.pathname === item.path ? 'bg-white/10' : 'hover:bg-white/10'}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
