import { BrowserRouter as Router } from 'react-router-dom'
import AppContent from './AppContent'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  )
}

export default App
