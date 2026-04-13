import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/jamoomwalks@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Blue Rangers contact request',
          _captcha: 'false',
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setFormData({ name: '', email: '', message: '' })
      setStatus('Message sent successfully. Thank you!')
    } catch (error) {
      setStatus('Unable to send message right now. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

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
                <p className="text-gray-700">info@bluerangers.co.ke</p>
              </div>

              <div>
                <p className="font-semibold text-blue-600 mb-1">📍 Location</p>
                <p className="text-gray-700">Chaani Primary School, Mombasa</p>
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 mb-2">Message</label>
              <textarea 
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full btn-primary-glow" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            {status && <p className="text-center text-sm text-gray-700">{status}</p>}
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow">
        <h3 className="text-2xl font-bold mb-6">Find Us</h3>
        <div className="w-full h-80 rounded-lg overflow-hidden">
          <iframe
            title="Chaani Primary School location"
            src="https://maps.google.com/maps?q=Chaani%20Primary%20School%20Mombasa%20Kenya&z=17&output=embed"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
