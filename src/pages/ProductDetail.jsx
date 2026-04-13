import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { productMap } from '../data/shopData'

const imageMap = {
  homekit: new URL('../../images/hm.jpg', import.meta.url).href,
  awaykit: new URL('../../images/hm1.jpg', import.meta.url).href,
  thirdkit: new URL('../../images/hm2.webp', import.meta.url).href,
  trainingtop: new URL('../../images/motion.png', import.meta.url).href,
  trainingshorts: new URL('../../images/motion.png', import.meta.url).href,
  tracksuit: new URL('../../images/motion.png', import.meta.url).href,
  teamflag: new URL('../../images/bg.jpg', import.meta.url).href,
  signedjersey: new URL('../../images/enhanced_team_photo.jpg', import.meta.url).href,
  badgepins: new URL('../../images/bg.jpg', import.meta.url).href,
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const item = productMap[slug]
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(item?.sizeOptions?.[0] || 'One Size')

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title">Product Not Found</h1>
          <p className="mt-4 text-gray-600">The product you are looking for does not exist.</p>
          <Link
            to="/shop"
            className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const imageSrc = imageMap[item.image]

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              {imageSrc ? (
                <img src={imageSrc} alt={item.name} className="w-full h-[520px] object-cover" />
              ) : (
                <div className="h-[520px] bg-blue-400 flex items-center justify-center text-white text-6xl">
                  📦
                </div>
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold mb-6"
              >
                ← Back to Shop
              </button>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <p className="text-xl text-blue-600 font-bold mb-4">{item.price}</p>
              <p className="text-gray-600 mb-6">{item.description}</p>
              <p className="text-gray-500 mb-8">{item.details}</p>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  >
                    {item.sizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  >
                    {[...Array(10).keys()].map((value) => (
                      <option key={value + 1} value={value + 1}>
                        {value + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => addToCart({ ...item, selectedSize: size }, quantity)}
                className="mt-8 w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Add {quantity} to Cart
              </button>

              <div className="mt-8 border-t pt-6 text-gray-600">
                <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Product details</h2>
                <ul className="space-y-3 text-sm">
                  <li>Fast-drying material</li>
                  <li>Official Blue Rangers design</li>
                  <li>Available in multiple sizes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
