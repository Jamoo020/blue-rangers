export default function Shop() {
  const shopCategories = [
    {
      id: 'kits',
      title: 'Kits',
      description: 'Get your favorite Blue Rangers kit for the season.',
      items: [
        {
          name: 'Home Kit',
          image: 'home-kit',
          price: '$89.99',
          description: 'Blue jersey with white shorts'
        },
        {
          name: 'Away Kit',
          image: 'away-kit',
          price: '$89.99',
          description: 'White jersey with blue shorts'
        },
        {
          name: 'Third Kit',
          image: 'third-kit',
          price: '$79.99',
          description: 'Black jersey with gold accents'
        }
      ]
    },
    {
      id: 'training',
      title: 'Training Gear',
      description: 'Professional training equipment and apparel.',
      items: [
        {
          name: 'Training Top',
          image: 'training-top',
          price: '$54.99',
          description: 'Breathable training shirt'
        },
        {
          name: 'Training Shorts',
          image: 'training-shorts',
          price: '$44.99',
          description: 'Lightweight training shorts'
        },
        {
          name: 'Track Suit',
          image: 'tracksuit',
          price: '$129.99',
          description: 'Complete track suit set'
        }
      ]
    },
    {
      id: 'memorabilia',
      title: 'Memorabilia',
      description: 'Exclusive items celebrating our history.',
      items: [
        {
          name: 'Team Flag',
          image: 'team-flag',
          price: '$24.99',
          description: 'Official club flag'
        },
        {
          name: 'Signed Jersey',
          image: 'signed-jersey',
          price: '$199.99',
          description: 'Team signed memorabilia'
        },
        {
          name: 'Club Badge Pins',
          image: 'badge-pins',
          price: '$14.99',
          description: 'Collectible badge set (5-pack)'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
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
                  key={item.name}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  {/* Image Placeholder */}
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                    <div className="text-center">
                      <div className="text-5xl mb-2">📦</div>
                      <p className="text-white text-sm font-semibold">{item.image}</p>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold">
                        Add to Cart
                      </button>
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
