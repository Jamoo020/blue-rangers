import { scheduleMatches } from '../data/scheduleData.js'

export default function Schedule() {
  const matches = [...scheduleMatches].sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">First Team Schedule</h2>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
            <h3 className="text-2xl font-bold">Upcoming Fixtures</h3>
          </div>
          
          <div className="divide-y">
            {matches.map((match, i) => (
              <div key={i} className="p-6 hover:bg-green-50 transition duration-300 border-l-4 border-transparent hover:border-green-600">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-bold text-gray-900">{match.date}</p>
                    <p className="text-sm text-gray-600">{match.time}</p>
                  </div>
                  <div>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">{match.comp}</span>
                  </div>
                  <div>
                    <p className="text-gray-700">{match.teams}</p>
                  </div>
                  <div className="text-right">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                      See Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
