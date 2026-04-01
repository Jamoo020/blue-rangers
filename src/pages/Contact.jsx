export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Contact Us</h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div>
                <p className="font-semibold text-blue-600 mb-1">📂 Phone</p>
                <p className="text-gray-700">123-456-7890</p>
              </div>

              <div>
                <p className="font-semibold text-blue-600 mb-1">📬 Email</p>
                <p className="text-gray-700">info@bluerangers.com</p>
              </div>

              <div>
                <p className="font-semibold text-blue-600 mb-1">📍 Location</p>
                <p className="text-gray-700">City Park, New City</p>
              </div>

              <div>
                <p className="font-semibold text-blue-600 mb-3">🌐 Follow Us</p>
                <div className="space-y-2">
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Facebook</a>
                  <a href="#" className="text-green-600 hover:text-green-800 font-semibold">Twitter</a>
                  <a href="#" className="text-green-600 hover:text-green-800 font-semibold">Instagram</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Message</label>
              <textarea 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full btn-primary-glow">Send Message</button>
          </form>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-6">Find Us</h3>
        <div className="w-full h-80 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">City Park, New City</p>
        </div>
      </div>
    </div>
  )
}
