export default function Schedule() {
  const matches = [
    { date: 'SAT 04 APR', time: '21:00', comp: 'La Liga', matchday: 'Matchday 30', teams: 'City United vs. New City FC' },
    { date: 'WED 08 APR', time: '21:00', comp: 'Champions', matchday: 'Quarter-finals', teams: 'New City FC vs. Europa FC' },
    { date: 'SAT 11 APR', time: '18:30', comp: 'La Liga', matchday: 'Matchday 31', teams: 'New City FC vs. Riverside' },
    { date: 'TUE 14 APR', time: '21:00', comp: 'Cup', matchday: 'Semi-finals', teams: 'City United vs. New City FC' },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">First Team Schedule</h2>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
            <h3 className="text-2xl font-bold">April 2026</h3>
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
