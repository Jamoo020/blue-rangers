import motionLogo from '../../images/motion.png'

export default function Sponsors() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Sponsors & Partners</h2>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Intro */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-green-900 mb-4">We're Looking for Sponsors!</h3>
          <p className="text-green-800">Partner with Blue Rangers FC and gain visibility in the local community. Support youth football development and be part of something special.</p>
        </section>

        {/* Benefits */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Benefits of Sponsoring</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Increased brand awareness',
              'Association with youth sports',
              'Community goodwill',
              'Networking opportunities',
            ].map((benefit, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="text-2xl text-green-500">✓</div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-8">💼 Sponsorship Packages</h3>
          <p className="text-gray-700 mb-6">Support your local football team with packages designed for every budget and business size.</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                name: 'Bronze',
                subtitle: 'Community Support',
                price: 'Ksh 500 – 3,000',
                period: '/year',
                color: 'bg-green-100 border-green-300',
                benefits: ['Name on website supporters wall', 'Instagram shoutout', 'Access to fan community (WhatsApp)'],
                target: 'For fans & individuals who want to support'
              },
              {
                name: 'Silver',
                subtitle: 'Local Partner',
                price: 'Ksh 10,000 – 30,000',
                period: '/year',
                color: 'bg-blue-100 border-blue-300',
                benefits: ['Logo on website', 'Social media mentions', 'Matchday shoutouts', 'Small banner placement at games'],
                target: 'For small businesses & local brands'
              },
              {
                name: 'Gold',
                subtitle: 'Official Sponsor',
                price: 'Ksh 50,000 – 100,000',
                period: '/year',
                color: 'bg-yellow-100 border-yellow-300',
                benefits: ['Logo on website + all digital posters', 'Regular social media promotion', 'Matchday announcements', 'VIP match access', 'Training kit logo placement'],
                target: 'For growing businesses that want visibility'
              },
              {
                name: 'Platinum',
                subtitle: 'Kit Sponsor – Premium',
                price: 'Ksh 150,000+',
                period: '/season',
                color: 'bg-purple-100 border-purple-300',
                benefits: ['Logo on official team jersey', 'Featured in ALL team content', 'Priority sponsor recognition', 'Media & promotional exposure', 'VIP access to players & events'],
                target: 'Limited slots (very high value)'
              },
              {
                name: 'Diamond',
                subtitle: 'Main Sponsor – Exclusive',
                price: 'Ksh 100,000',
                period: '/season',
                color: 'bg-gray-100 border-gray-300',
                benefits: ['Logo on front of jersey (MAIN SPONSOR)', 'Naming rights (optional)', 'Maximum exposure everywhere', 'Featured in every post, match & event', 'Direct partnership with the club'],
                target: 'ONLY 1 SLOT AVAILABLE'
              },
            ].map((pkg, i) => (
              <div key={i} className={`card-hover border-2 ${pkg.color} p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}>
                <h4 className="text-lg font-bold text-gray-900 mb-1">{pkg.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{pkg.subtitle}</p>
                <p className="text-2xl font-bold text-green-600 mb-1">{pkg.price}</p>
                <p className="text-sm text-gray-500 mb-4">{pkg.period}</p>
                <ul className="space-y-1 text-gray-600 text-xs mb-4">
                  {pkg.benefits.map((benefit, j) => (
                    <li key={j}>• {benefit}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 italic">{pkg.target}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Sponsors */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Current Sponsors</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[{
              name: 'Motion Auto Garage Ltd',
              logo: motionLogo,
              description: 'Official team sponsor and community partner.',
            }].map((sponsor, index) => (
              <div key={index} className="text-center bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-lg bg-white shadow-inner">
                  <img src={sponsor.logo} alt={sponsor.name} className="h-full w-full object-contain" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">{sponsor.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{sponsor.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Interested in Sponsoring?</h3>
          <p className="mb-6">Get in touch with us today!</p>
          <div className="space-y-2">
            <p><strong>Email:</strong> sponsors@newcityfc.com</p>
            <p><strong>Phone:</strong> 123-456-7890</p>
          </div>
        </section>
      </div>
    </div>
  )
}
