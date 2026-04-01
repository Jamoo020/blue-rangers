export default function Join() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">Join New City FC</h2>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-green-900 mb-2">Who Can Join</h3>
            <p className="text-green-800">Anyone aged 8-18 interested in playing football</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-green-900 mb-2">Trial Dates</h3>
            <p className="text-green-800">April 1st, 2026 at City Park</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-purple-900 mb-2">Training Schedule</h3>
            <p className="text-purple-800">Tuesdays & Thursdays, 6:00 PM - 8:00 PM</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg text-orange-900 mb-2">Annual Fee</h3>
            <p className="text-orange-800">$50 per year</p>
          </div>
        </div>

        {/* Details */}
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-2xl font-bold mb-6">Age Groups</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-100 rounded lg">
              <p className="font-bold text-green-900">U9-U11</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded">
              <p className="font-bold text-green-900">U12-U14</p>
            </div>
            <div className="text-center p-4 bg-green-100 rounded">
              <p className="font-bold text-green-900">U15-U18</p>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6">Registration Form</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Name</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Age</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600" required />
              </div>
              <div>
                <label className="block font-semibold mb-2">Position</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600">
                  <option>Goalkeeper</option>
                  <option>Defender</option>
                  <option>Midfielder</option>
                  <option>Forward</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600" required />
            </div>
            <button type="submit" className="w-full btn-primary-glow">Register Now</button>
          </form>
        </section>
      </div>
    </div>
  )
}
