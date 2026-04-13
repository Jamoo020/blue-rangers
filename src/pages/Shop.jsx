import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { shopCategories as shopCategoriesData } from '../data/shopData'

const images = import.meta.globEager('../images/**/*.{jpg,png,webp}')
const imageMap = Object.fromEntries(
  Object.entries(images).map(([path, module]) => {
    const fileName = path.split('/').pop().replace(/\.(jpg|png|webp)$/i, '')
    return [fileName.toLowerCase(), module.default]
  })
)

export default function Shop() {
  const { addToCart } = useCart()
  const [successMessage, setSuccessMessage] = useState(null)
  const [quantities, setQuantities] = useState({})

  const shopCategories = shopCategoriesData

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
            {successMessage}
          </div>
        )}

        <div className="text-center mb-16">
          <h1 className="section-title">Official Store</h1>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Shop authentic Blue Rangers merchandise, kits, training gear, and exclusive memorabilia.
          </p>
        </div>

        {/* Shop Categories */}
        {shopCategories.map((category) => (
          <div key={category.id} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600">{category.description}</p>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {category.items.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  {/* Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden group">
                    {imageMap[item.image] ? (
                      <img
                        src={imageMap[item.image]}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                        <div className="text-center">
                          <div className="text-5xl mb-2">📦</div>
                          <p className="text-white text-sm font-semibold">{item.image}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <label htmlFor={`quantity-${item.name}`} className="font-semibold">
                            Qty
                          </label>
                          <select
                            id={`quantity-${item.name}`}
                            value={quantities[item.name] || 1}
                            onChange={(e) =>
                              setQuantities((prev) => ({
                                ...prev,
                                [item.name]: Number(e.target.value),
                              }))
                            }
                            className="rounded-lg border border-gray-300 px-3 py-2 bg-white"
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
                        onClick={() => {
                          const quantity = quantities[item.name] || 1
                          addToCart(item, quantity)
                          setSuccessMessage(`${item.name} added to cart (${quantity})!`)
                          setTimeout(() => setSuccessMessage(null), 2000)
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${item.slug}`}
                        className="mt-3 inline-block text-center w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition duration-300 font-semibold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="mt-16 border-gray-200" />
          </div>
        ))}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-4">
            Can't find what you're looking for? Contact us for custom orders.
          </p>
        </div>
      </div>
    </div>
  )
}
