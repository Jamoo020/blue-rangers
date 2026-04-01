export default function News() {
  const news = [
    { date: 'March 15', title: 'First Training Session a Success', desc: 'Our inaugural training session brought together 20 enthusiastic players' },
    { date: 'March 20', title: 'Trials Announced', desc: 'Open trials for new players on April 1st. All ages welcome!' },
    { date: 'March 22', title: 'New Player Signings', desc: 'Welcome Mark White and Sophie Black to the team!' },
    { date: 'March 18', title: 'Club Meeting', desc: 'Discussed future plans and sponsorship opportunities' },
    { date: 'April 5', title: 'Friendly Match Scheduled', desc: 'Our first friendly against Local United' },
    { date: 'March 25', title: 'Community Activity', desc: 'Participated in local charity event' },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">News & Updates</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {news.map((item, i) => (
          <article key={i} className="card-hover bg-white p-6 rounded-lg shadow border-l-4 border-green-600 hover:shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white text-center">
                  <span className="text-sm font-bold">{item.date}</span>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <a href="#" className="text-green-600 font-semibold hover:text-green-800">Read More →</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
