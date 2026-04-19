import bgImage from '../../images/enhanced_team_photo.jpg'
import communityImage1 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.44.28 (1).jpeg'
import communityImage2 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.44.28 (2).jpeg'
import communityImage3 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.44.28 (3).jpeg'
import communityImage4 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.44.28.jpeg'
import communityImage5 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.44.29.jpeg'
import communityImage6 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.45.56 (1).jpeg'
import communityImage7 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.45.56.jpeg'
import communityImage8 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.46.03 (1).jpeg'
import communityImage9 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.46.03.jpeg'
import communityImage10 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.46.04.jpeg'
import communityImage11 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.46.05.jpeg'
import communityImage12 from '../../images/Community Event/WhatsApp Image 2026-04-19 at 12.46.06.jpeg'

const communityImages = [
  communityImage1,
  communityImage2,
  communityImage3,
  communityImage4,
  communityImage5,
  communityImage6,
  communityImage7,
  communityImage8,
  communityImage9,
  communityImage10,
  communityImage11,
  communityImage12,
]

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

          {communityImages.length > 0 && (
            <div className="mt-12">
              <h3 className="section-title text-white">Community Event Photos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {communityImages.map((src, idx) => (
                  <div key={idx} className="overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-white/5">
                    <img
                      src={src}
                      alt={`Community event ${idx + 1}`}
                      className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
