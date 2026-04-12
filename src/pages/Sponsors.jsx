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
          <h3 className="text-2xl font-bold mb-8">Sponsorship Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Bronze', price: '$100', benefits: ['Logo on website', 'Social mention'] },
              { name: 'Silver', price: '$500', features: ['Logo on website', 'Social media', 'Event promotion'] },
              { name: 'Gold', price: '$1000', features: ['Logo on website', 'Social media', 'Kit sponsorship', 'Event booth'] },
            ].map((pkg, i) => (
              <div key={i} className="card-hover border-2 border-green-200 p-6 rounded-lg text-center hover:border-green-600">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                <p className="text-3xl font-bold text-green-600 mb-4">{pkg.price}/year</p>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {(pkg.benefits || pkg.features || []).map((benefit, j) => (
                    <li key={j}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Current Sponsors */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Current Sponsor</h3>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div className="max-w-xs w-full text-center bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-lg bg-white shadow-inner">
                <img src={motionLogo} alt="Motion Auto Garage Ltd" className="h-full w-full object-contain" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Motion Auto Garage Ltd</h4>
              <p className="text-sm text-gray-600 mt-2">Official team sponsor and community partner.</p>
            </div>
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
