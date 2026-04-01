import { useState } from 'react'

export default function News() {
  const [selectedItem, setSelectedItem] = useState(null)

  const news = [
    { date: 'March 15', title: 'First Training Session a Success', desc: 'Our inaugural training session brought together 20 enthusiastic players', excerpt: 'First session kicks off with great energy and team drills.', details: 'Great turnout and strong team chemistry. We ran technical drills, small-sided games, and fitness work. Several players stood out for leadership and promise. Coaching staff will provide individualized training plans next week with follow-up assessment. Refreshments and a team photo wrapped the day on a high note. The session lasted over two hours and included a closing talk from the head coach about discipline, nutrition, and upcoming priorities for the season. Everyone left motivated and already asking when the next practice is—this marks the launch of a new era for the team.' },
    { date: 'March 20', title: 'Trials Announced', desc: 'Open trials for new players on April 1st. All ages welcome!', excerpt: 'Open tryouts at Riverside Park, all ages welcome.', details: 'Join us at Riverside Park, 10 AM. Bring water, shoes, and enthusiasm. Registration is free.' },
    { date: 'March 22', title: 'New Player Signings', desc: 'Welcome Mark White and Sophie Black to the team!', excerpt: 'Signings of two key players to strengthen squad.', details: 'Mark plays midfielder and Sophie is a forward. Both have league experience and are expected to debut soon.' },
    { date: 'March 18', title: 'Club Meeting', desc: 'Discussed future plans and sponsorship opportunities', excerpt: 'Club meeting highlights next steps, sponsors, and goals.', details: 'Board voted to pursue two new local sponsors and to organize a summer camp.' },
    { date: 'April 5', title: 'Friendly Match Scheduled', desc: 'Our first friendly against Local United', excerpt: 'Friendly game planned to assess team readiness.', details: 'Match at home stadium 6 PM. Tickets available online and at gate.' },
    { date: 'March 25', title: 'Community Activity', desc: 'Participated in local charity event', excerpt: 'Team engaged in community service and youth clinics.', details: 'Volunteered in neighborhood cleanup and coaching youth clinics.' },
  ]

  const closeModal = () => setSelectedItem(null)

  const getCardText = (item) => {
    if (item.excerpt) return item.excerpt
    if (!item.desc) return ''
    return item.desc.length > 80 ? `${item.desc.slice(0, 77)}...` : item.desc
  }

  return (
    <div className="container mx-auto px-4 py-16">
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
