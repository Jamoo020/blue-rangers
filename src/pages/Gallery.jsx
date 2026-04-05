import bgImage from '../../images/enhanced_team_photo.jpg'

export default function Gallery() {
  const images = [
    { title: 'Training Session' },
    { title: 'Team Photo' },
    { title: 'Friendly Match' },
    { title: 'Club Meeting' },
    { title: 'Community Event' },
    { title: 'Training Field' },
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-local"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center 35%',
        backgroundSize: 'cover',
        backgroundAttachment: 'scroll',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-black/70 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl rounded-[2rem] bg-white/10 border border-white/10 p-10 backdrop-blur-sm shadow-2xl">
            <h2 className="section-title text-white">Gallery</h2>
            <p className="mt-2 max-w-2xl text-white/80">
              Browse our latest club moments, training, matches, and community events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
            {images.map((img, i) => (
              <div key={i} className="card-hover group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <span className="text-white font-bold text-lg">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
