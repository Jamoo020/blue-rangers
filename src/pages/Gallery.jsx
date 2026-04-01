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
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Gallery</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
  )
}
