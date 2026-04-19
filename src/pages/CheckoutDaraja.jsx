import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CheckoutDaraja() {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  const handlePayment = async (e) => {
    e.preventDefault()
    setError(null)
    setIsProcessing(true)
    setPaymentStatus('initiating')

    try {
      // Validate inputs
      if (!phoneNumber || !firstName || !lastName || !email) {
        throw new Error('Please fill in all fields')
      }

      if (cartItems.length === 0) {
        throw new Error('Cart is empty')
      }

      // Generate order ID
      const orderID = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Call payment API
      const response = await fetch(`${API_URL}/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber.trim(),
          amount: getTotalPrice(),
          orderID: orderID,
          cartItems: cartItems,
          customerInfo: {
            firstName,
            lastName,
            email,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Payment initiation failed')
      }

      setPaymentStatus('prompt_sent')

      // Poll for payment status
      let attempts = 0
      const maxAttempts = 30 // 30 seconds

      const checkPaymentStatus = setInterval(async () => {
        attempts++

        try {
          const statusResponse = await fetch(`${API_URL}/payment/status/${orderID}`)
          const statusData = await statusResponse.json()

          if (statusData.success) {
            if (statusData.status === 'completed') {
              clearInterval(checkPaymentStatus)
              setPaymentStatus('success')
              clearCart()

              // Show success message
              alert(
                `✓ Payment successful!\n\nOrder ID: ${orderID}\nAmount: Ksh ${statusData.amount.toFixed(2)}\n\nThank you for your purchase!`
              )
              setIsProcessing(false)
            } else if (statusData.status === 'failed') {
              clearInterval(checkPaymentStatus)
              setPaymentStatus('failed')
              setError('Payment was declined. Please try again.')
              setIsProcessing(false)
            }
          }
        } catch (err) {
          console.error('Status check error:', err)
        }

        // Stop polling after max attempts
        if (attempts >= maxAttempts) {
          clearInterval(checkPaymentStatus)
          setPaymentStatus('timeout')
          setIsProcessing(false)
        }
      }, 1000)
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.')
      setPaymentStatus(null)
      setIsProcessing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="section-title">Checkout</h1>
            <div className="max-w-2xl mx-auto mt-12 bg-white p-12 rounded-lg shadow-md">
              <p className="text-gray-600 mb-8">Your cart is empty</p>
              <Link
                to="/shop"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Return to Shop
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
        <h1 className="section-title">Checkout - M-Pesa Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Billing Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="John"
                      disabled={isProcessing}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Doe"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="john@example.com"
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      M-Pesa Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="+254712345678 or 0712345678"
                      disabled={isProcessing}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the number registered with M-Pesa. You'll receive an STK prompt on this
                      phone.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">⚠ {error}</p>
                </div>
              )}

              {/* Status Messages */}
              {paymentStatus === 'initiating' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-700 font-semibold">
                    📱 Initiating payment... Please wait.
                  </p>
                </div>
              )}

              {paymentStatus === 'prompt_sent' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-700 font-semibold mb-2">
                    ✓ STK Push sent successfully!
                  </p>
                  <p className="text-yellow-600 text-sm">
                    An M-Pesa prompt should appear on your phone. Please enter your M-Pesa PIN to
                    complete the payment.
                  </p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-700 font-semibold">
                    ✓ Payment successful! Thank you for your purchase.
                  </p>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 font-semibold">
                    ✗ Payment was cancelled or failed.
                  </p>
                </div>
              )}

              {paymentStatus === 'timeout' && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-700 font-semibold mb-2">
                    ⏱ Payment verification timeout
                  </p>
                  <p className="text-orange-600 text-sm">
                    Your payment may still be processing. Please check your M-Pesa messages for
                    confirmation.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing Payment...' : 'Pay with M-Pesa'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Powered by Daraja (Safaricom M-Pesa)
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start pb-3 border-b">
                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      {(parseFloat(item.price.replace('Ksh ', '')) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-blue-600">
                    Ksh {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                to="/shop"
                className="block text-center text-blue-600 hover:text-blue-700 text-sm mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
