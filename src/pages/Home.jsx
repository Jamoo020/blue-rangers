import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute transform -rotate-45 -top-40 -right-40 w-80 h-80 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Blue Rangers</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">Building the future of football in New City since 2026</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/join" className="btn-primary-glow inline-block">Join Our Trials</Link>
              <Link to="/about" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition duration-300 inline-block">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hm2.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-white">About Blue Rangers</h2>
            <p className="text-white text-lg leading-relaxed mb-6" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.65)' }}>
              For more than 30 years, the Blue Rangers spirit has pervaded our community and served as the cornerstone of both internal and external communication.
              A group of young people, including Stephen Malombe, created a reggae band in Migadini, Changamwe, in the 1980s to raise awareness of social issues.
              Before they were introduced to football in 1990 by a former Kenyan international football player (name), the reggae movement was thriving.

              Blue Rangers Football Club was founded as a result.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-600 mb-2">Mission</h3>
                <p className="text-gray-600">To be part of the solution to the economic challenges facing our community.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-blue-600 mb-2">Vision</h3>
                <p className="text-gray-600">To create a space for a multi-stakeholder approach towards the issues facing our society.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 relative" style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><defs><pattern id="balls" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="12" fill="none" stroke="%233B82F6" stroke-width="2" opacity="0.25"/></pattern></defs><rect width="120" height="120" fill="%23F9FAFB"/><rect width="120" height="120" fill="url(%23balls)"/></svg>')`,
        backgroundRepeat: 'repeat'
      }}>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="section-title">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              { title: 'First Training Session', desc: 'Our inaugural training session was a success!' },
              { title: 'Trial Announcements', desc: 'Trials open for all age groups.' },
              { title: 'New Player Signings', desc: 'Welcome our new players!' },
            ].map((news, i) => (
              <div key={i} className="card-hover bg-white p-6 rounded-lg shadow">
                <img src="/images/hm1.jpg" alt={news.title} className="h-40 w-full object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.desc}</p>
                <Link to="/news" className="text-blue-600 font-semibold hover:text-blue-800">Read More →</Link>
              </div>
            ))}
          </div>
          <Link to="/news" className="text-center block text-blue-600 font-semibold hover:text-blue-800">View All News →</Link>
        </div>
      </section>

      {/* Join Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-lg text-blue-100 mb-8">Be part of Blue Rangers family</p>
          <Link to="/join" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold transition duration-300 inline-block">Start Your Journey</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative" style={{
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><defs><pattern id="balls" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="30" cy="30" r="12" fill="none" stroke="%233B82F6" stroke-width="2" opacity="0.25"/></pattern></defs><rect width="120" height="120" fill="%23FFFFFF"/><rect width="120" height="120" fill="url(%23balls)"/></svg>')`,
        backgroundRepeat: 'repeat'
      }}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Players', value: '50+' },
              { label: 'Matches Played', value: '15' },
              { label: 'Goals Scored', value: '87' },
              { label: 'Trophies', value: '3' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <p className="text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
