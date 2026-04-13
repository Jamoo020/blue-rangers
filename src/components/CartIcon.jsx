import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartIcon() {
  const { cartItems } = useCart()

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link
      to="/cart"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition duration-300"
    >
      <span className="text-2xl">🛒</span>
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}
