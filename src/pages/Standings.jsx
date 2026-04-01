export default function Standings() {
  const standings = [
    { pos: 1, team: 'Elite City', points: 85, played: 30, w: 26, d: 7, l: 5, gf: 79, ga: 26, gd: 53 },
    { pos: 2, team: 'New City FC', points: 78, played: 30, w: 24, d: 6, l: 8, gf: 71, ga: 35, gd: 36, isUs: true },
    { pos: 3, team: 'Royal Athletic', points: 72, played: 30, w: 21, d: 9, l: 6, gf: 65, ga: 31, gd: 34 },
    { pos: 4, team: 'Mountain City', points: 68, played: 30, w: 20, d: 8, l: 8, gf: 58, ga: 42, gd: 16 },
    { pos: 5, team: 'United FC', points: 62, played: 30, w: 18, d: 8, l: 10, gf: 52, ga: 48, gd: 4 },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">League Standings</h2>

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6">
          <h3 className="text-2xl font-bold">La Liga 2025/2026</h3>
          <p className="text-green-100 text-sm">Season standings</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left font-bold text-gray-900">Pos</th>
                <th className="px-6 py-3 text-left font-bold text-gray-900">Team</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">Pts</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">M</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">W</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">D</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">L</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">GF</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">GA</th>
                <th className="px-6 py-3 text-center font-bold text-gray-900">GD</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={i} className={`border-b transition ${row.isUs ? 'bg-green-100 font-bold' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 text-gray-900">{row.pos}</td>
                  <td className="px-6 py-4 text-gray-900">{row.team}</td>
                  <td className="px-6 py-4 text-center text-gray-900">{row.points}</td>
                  <td className="px-6 py-4 text-center text-gray-900">{row.played}</td>
                  <td className="px-6 py-4 text-center text-green-600">{row.w}</td>
                  <td className="px-6 py-4 text-center text-yellow-600">{row.d}</td>
                  <td className="px-6 py-4 text-center text-red-600">{row.l}</td>
                  <td className="px-6 py-4 text-center text-gray-900">{row.gf}</td>
                  <td className="px-6 py-4 text-center text-gray-900">{row.ga}</td>
                  <td className="px-6 py-4 text-center text-green-600">{row.gd > 0 ? '+' : ''}{row.gd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
