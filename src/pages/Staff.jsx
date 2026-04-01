export default function Staff() {
  const staff = [
    { position: 'Head Coach', name: 'Coach Tom', bio: 'Experienced coach with 10 years in football' },
    { position: 'Assistant Coach', name: 'Coach Jerry', bio: 'Specializes in youth development' },
    { position: 'Fitness Trainer', name: 'Trainer Sam', bio: 'Ensures players are in top shape' },
    { position: 'Team Manager', name: 'Manager Lisa', bio: 'Handles team logistics' },
    { position: 'Club Chairman', name: 'Chairman Bob', bio: 'Leads the club board' },
    { position: 'Secretary', name: 'Secretary Jane', bio: 'Manages club records' },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Technical & Club Staff</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {staff.map((member, i) => (
          <div key={i} className="card-hover bg-white rounded-lg shadow overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-4xl mb-2">👤</div>
                <p className="font-semibold">{member.position}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{member.name}</h3>
              <p className="text-sm text-green-600 font-semibold mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
