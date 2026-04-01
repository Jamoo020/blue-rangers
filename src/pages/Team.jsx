export default function Team() {
  const positions = {
    'Goalkeepers': [
      { name: 'Player 1', number: 1, age: 25, bio: 'Experienced goalkeeper', image: '/images/Players/player-1.jpg' }
    ],
    'Defenders': [
      { name: 'Player 2', number: 2, age: 22, bio: 'Team captain', image: '/images/Players/player-2.jpg' },
      { name: 'Player 3', number: 3, age: 23, bio: 'Fast and agile', image: '/images/Players/player-3.jpg' },
      { name: 'Player 4', number: 4, age: 24, bio: 'Reliable defender', image: '/images/Players/player-4.jpg' },
      { name: 'Player 5', number: 5, age: 21, bio: 'Young talent', image: '/images/Players/player-5.jpg' }
    ],
    'Midfielders': [
      { name: 'Player 6', number: 6, age: 26, bio: 'Playmaker', image: '/images/Players/player-6.jpg' },
      { name: 'Player 7', number: 7, age: 22, bio: 'Energetic midfielder', image: '/images/Players/player-7.jpg' },
      { name: 'Player 8', number: 8, age: 25, bio: 'Skilled right midfielder', image: '/images/Players/player-8.jpg' },
      { name: 'Player 9', number: 9, age: 23, bio: 'Creative left midfielder', image: '/images/Players/player-9.jpg' }
    ],
    'Forwards': [
      { name: 'Player 10', number: 10, age: 24, bio: 'Goal scorer', image: '/images/Players/player-10.jpg' },
      { name: 'Player 11', number: 11, age: 22, bio: 'Rising star', image: '/images/Players/player-11.jpg' }
    ]
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Our Team</h2>

      {Object.entries(positions).map(([position, players]) => (
        <div key={position} className="mb-16">
          <h3 className="text-2xl font-bold text-lime-400 mb-8 pb-3 border-b-2 border-blue-600">{position}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {players.map((player, i) => (
              <div key={i} className="card-hover bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="text-white text-center absolute" style={{display: 'none'}}>
                    <div className="text-5xl font-bold">{player.number}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg text-gray-900">{player.name}</h4>
                  <p className="text-sm text-blue-600 font-semibold mb-1"># {player.number}</p>
                  <p className="text-sm text-gray-600 mb-2">Age: {player.age}</p>
                  <p className="text-sm text-gray-600">{player.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
