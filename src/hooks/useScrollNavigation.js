import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Define the scroll navigation order
const SCROLL_PAGES = ['/', '/about', '/team', '/staff']

export function useScrollNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const wheelTimeoutRef = useRef(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const handleWheel = (e) => {
      // Throttle scroll events to prevent rapid navigation
      if (isScrollingRef.current) return

      const currentIndex = SCROLL_PAGES.indexOf(location.pathname)
      
      // Only handle navigation for pages in the scroll sequence
      if (currentIndex === -1) return

      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next page
        if (currentIndex < SCROLL_PAGES.length - 1) {
          e.preventDefault()
          isScrollingRef.current = true
          navigate(SCROLL_PAGES[currentIndex + 1])
          
          // Reset after navigation animation
          wheelTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false
          }, 800)
        }
      } else if (e.deltaY < 0) {
        // Scrolling up - go to previous page
        if (currentIndex > 0) {
          e.preventDefault()
          isScrollingRef.current = true
          navigate(SCROLL_PAGES[currentIndex - 1])
          
          // Reset after navigation animation
          wheelTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false
          }, 800)
        }
      }
    }

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [location.pathname, navigate])
}
