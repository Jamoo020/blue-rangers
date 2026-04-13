import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="section-title">Shopping Cart</h1>
            <div className="max-w-2xl mx-auto mt-12 bg-white p-12 rounded-lg shadow-md">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Start shopping to add items to your cart!
              </p>
              <Link
                to="/shop"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h2 className="text-xl font-bold">
                  Items in Cart ({cartItems.length})
                </h2>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.name} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex gap-6">
                      {/* Item Image Placeholder */}
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">📦</span>
                      </div>

                      {/* Item Details */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <p className="text-blue-600 font-semibold">{item.price} each</p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-red-600 hover:text-red-800 font-semibold text-sm mb-4"
                        >
                          ✕ Remove
                        </button>

                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-lg font-bold text-gray-900 mt-4">
                          Ksh {(
                            parseFloat(item.price.replace('Ksh ', '')) * item.quantity
                          ).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/shop"
              className="inline-block mt-6 text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                {cartItems.map((item) => (
                  <div key={item.name} className="flex justify-between text-gray-600">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      Ksh {(parseFloat(item.price.replace('Ksh ', '')) * item.quantity).toFixed(0)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Ksh {getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>TBD</span>
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Ksh {getTotalPrice().toFixed(0)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold mb-3">
                <Link to="/checkout" className="block w-full">
                  Proceed to Payment
                </Link>
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold text-sm"
              >
                Clear Cart
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Shipping and tax calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
