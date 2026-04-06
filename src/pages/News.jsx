import { useState, useEffect } from 'react'
import { CONTENT_URL } from '../config'
import localNews from '../data/content.json'

export default function News() {
  const [content, setContent] = useState(localNews)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('local')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2500)

    fetch(CONTENT_URL, { cache: 'no-store', signal: controller.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        const news = json.data?.map(item => ({
          id: item.id,
          date: item.attributes.date,
          title: item.attributes.title,
          excerpt: item.attributes.excerpt,
          desc: item.attributes.desc,
          details: item.attributes.details,
        })) || []

        if (news.length > 0) {
          setContent({ news })
          setSource('strapi')
          setPopupMessage('Latest news loaded from server.')
          setShowPopup(true)
          setTimeout(() => setShowPopup(false), 3000)
        } else {
          setPopupMessage('Showing local news because server returned no items.')
          setShowPopup(true)
          setTimeout(() => setShowPopup(false), 3000)
        }
      })
      .catch(() => {
        setPopupMessage('Showing local news while server is unavailable.')
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
      })
      .finally(() => {
        clearTimeout(timeoutId)
      })
  }, [])

  if (loading) return <div className="container mx-auto px-4 py-16"><p>Loading...</p></div>
  if (error) return (
    <div className="container mx-auto px-4 py-16 space-y-4">
      <div className="rounded-lg bg-red-100 border border-red-300 p-4 text-red-800">
        <p className="font-semibold">Error loading news</p>
        <p>{error}</p>
      </div>
    </div>
  )

  const news = content.news

  const closeModal = () => setSelectedItem(null)

  const getCardText = (item) => {
    if (item.excerpt) return item.excerpt
    if (!item.desc) return ''
    return item.desc.length > 80 ? `${item.desc.slice(0, 77)}...` : item.desc
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Popup notification */}
      {showPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-yellow-900 shadow-lg max-w-md mx-auto">
            <p className="text-center font-medium">{popupMessage}</p>
          </div>
        </div>
      )}

      <h2 className="section-title">News & Updates</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {news.map((item, i) => (
          <article key={i} className="card-hover bg-white p-6 rounded-lg shadow border-l-4 border-green-600 hover:shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-center">
                  <span className="text-sm font-bold">{item.date}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{getCardText(item)}</p>
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="text-green-600 font-semibold hover:text-green-800 text-lg underline py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Read More →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm transition-opacity duration-300" role="dialog" aria-modal="true">
          <div className="w-full max-w-md sm:max-w-lg rounded-xl bg-white p-5 sm:p-6 shadow-2xl relative transform transition-all duration-200 ease-out scale-110 md:scale-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">{selectedItem.title}</h3>
              <p className="text-base text-gray-600">{selectedItem.date}</p>
              <p className="text-lg text-gray-800 font-medium">{selectedItem.desc}</p>
              <p className="text-gray-700 text-base leading-relaxed">{selectedItem.details}</p>
              <button
                onClick={closeModal}
                className="mt-3 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
