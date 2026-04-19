import { useState } from 'react'
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

const sections = [
  { title: 'Training Session', id: 'training-session' },
  { title: 'Team Photo', id: 'team-photo' },
  { title: 'Friendly Match', id: 'friendly-match' },
  { title: 'Club Meeting', id: 'club-meeting' },
  { title: 'Community Event', id: 'community-event' },
  { title: 'Training Field', id: 'training-field' },
]

export default function Gallery() {
  const [activeSection, setActiveSection] = useState('community-event')

  function scrollToSection(id) {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }
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

          <div className="flex flex-wrap justify-center gap-3 max-w-6xl mx-auto mt-12">
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`rounded-full px-5 py-3 text-sm font-semibold transition ${isActive ? 'bg-white text-slate-900 shadow-xl' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {section.title}
                </button>
              )
            })}
          </div>

          <div className="max-w-6xl mx-auto mt-10 text-center">
            <h3 className="section-title text-white">{sections.find((section) => section.id === activeSection)?.title}</h3>
            <p className="text-white/70 mt-2 max-w-3xl mx-auto">
              {activeSection === 'community-event'
                ? 'All Community Event images are shown below.'
                : 'Images for this category will appear here once added.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
            {activeSection === 'community-event' ? (
              communityImages.map((src, idx) => (
                <div key={idx} className="overflow-hidden rounded-xl shadow-2xl border border-white/10 bg-white/5">
                  <img
                    src={src}
                    alt={`Community event ${idx + 1}`}
                    className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-white/30 bg-white/5 p-10 text-white/80">
                <p className="text-xl font-semibold">No images available yet for this section.</p>
                <p className="mt-3 text-white/70">Only the Community Event section currently contains uploaded photos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
