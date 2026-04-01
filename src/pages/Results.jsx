export default function Results() {
  const results = [
    { date: 'SUN 22 MAR', comp: 'La Liga', team1: 'New City FC', score1: '1', score2: '0', team2: 'Riverside' },
    { date: 'WED 18 APR', comp: 'Champions', team1: 'New City FC', score1: '7', score2: '2', team2: 'Europa FC' },
    { date: 'SUN 15 APR', comp: 'La Liga', team1: 'New City FC', score1: '5', score2: '2', team2: 'Valley United' },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">First Team Results</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {results.map((result, i) => (
          <div key={i} className="card-hover bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-4">
              <p className="font-semibold">{result.date} • {result.comp}</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{result.team1}</h3>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
                    <div className="text-5xl font-bold">{result.score1} - {result.score2}</div>
                    <p className="text-sm text-green-100 mt-2">Final Score</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{result.team2}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
