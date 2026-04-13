import { Link } from 'react-router-dom'
import CartIcon from '../components/CartIcon'

export default function Header() {
  return (
    <header className="relative overflow-hidden text-white shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-900 to-black opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(255,255,255,0))]" />
      <div className="relative container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="bg-white/10 border border-white/20 p-2 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-inner">
                <span className="text-white font-extrabold text-xl">FC</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Blue Rangers</h1>
              <p className="text-blue-100 text-sm md:text-base">United for Victory • 2026 Season</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <CartIcon />
            <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white blur-[0.6px]">
              Official Club Site
            </span>
            <button className="btn-primary-glow bg-amber-500 hover:bg-amber-600 text-gray-900">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
