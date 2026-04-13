import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useScrollNavigation } from './hooks/useScrollNavigation'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Navigation from './layout/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Staff from './pages/Staff'
import Join from './pages/Join'
import News from './pages/News'
import Gallery from './pages/Gallery'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'
import Schedule from './pages/Schedule'
import Results from './pages/Results'
import Standings from './pages/Standings'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import bgImage from '../images/bg.jpg'

function AppContent() {
  const location = useLocation()
  
  // Enable scroll-based navigation
  useScrollNavigation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <main className="flex-grow page-background" style={{ backgroundImage: `url(${bgImage})` }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/join" element={<Join />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/results" element={<Results />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppContent
