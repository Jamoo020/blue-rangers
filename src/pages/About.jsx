export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="section-title">ABOUT US</h2>

      <div className="max-w-4xl mx-auto space-y-10 text-gray-900 leading-relaxed" style={{ color: '#1f2937', textShadow: 'none' }}>
        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Origins</h3>
          <p className="text-gray-700">
            In the 1980s in Migadini, Changamwe, a group of youths including Stephen Malombe formed a reggae band to sensitize young people about social issues.
            The reggae movement was strong until 1990 when they met a former Kenyan international football player (name) who introduced them to football.
            This marked the birth of Blue Rangers Football Club.
          </p>
          <p className="mt-4 text-gray-700">
            The Blue Rangers spirit has lived in our community for over 30 years and has been the foundation of interaction internally and externally.
            In Migadini, "Blue Rangers" is not just a football club—it’s a lifestyle representing true life (maisha ya ukweli), the community's struggles and successes.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Community Role</h3>
          <p className="text-gray-700">
            Despite Changamwe being a strategic business hub with major institutions like KenGen, Kenya Ports Authority, and Kenya Refineries,
            the community still struggles to capitalize on opportunities. Mombasa youth are wrongly branded as lazy and drug addicts, sidelining responsible young people.
          </p>
          <p className="mt-4 text-gray-700">
            Blue Rangers Welfare Club seeks to address these issues from its foundation and ensure the Mombasa community receives the respect and dignity it deserves.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 about-vision-mission">
          <section className="about-vision-mission-box bg-blue-50 p-8 rounded-lg text-black">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Vision</h3>
            <p>To create a space for a multi-stakeholder approach towards the issues facing our society.</p>
          </section>
          <section className="about-vision-mission-box bg-blue-50 p-8 rounded-lg text-black">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Mission</h3>
            <p>To be part of the solution to the economic challenges facing our community.</p>
          </section>
        </div>

        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Management</h3>
          <p className="text-gray-700">
            Blue Rangers Welfare Club is managed by a board of 3 executive and 27 non-executive members with equal voting power.
            The Board is responsible for statutory functions including strategy, goals, policies, and leadership.
            Day-to-day operations are delegated to executive directors and managers.
          </p>

          <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Executive Members</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>The Chairman: Mr. Matthew Ogada</li>
            <li>The Secretary: Mr. Edward Were</li>
            <li>The Treasurer: Mr. Salim Mbaruk</li>
          </ul>

          <h4 className="text-xl font-semibold mt-6 mb-2 text-gray-900">Non-executive Members</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            {[
              'Mr. Richard Amiani', 'Mr. Julius Mwangi', 'Mr. Samuel Kitonga', 'Mr. Timothy Karingo',
              'Mr. Abubakar Mutua', 'Mr. Erick Mua', 'Mr. Raphon Larry', 'Mr. Lenny Kimani',
              'Mr. Josphat Mzame', 'Mr. Peter Mbongoli', 'Mr. Meshak Mutinda', 'Mr. Joseph Awaa',
              'Mr. Robert Nganga', 'Mr. Julius Maithia', 'Mr. Stephen Malombe', 'Mr. Alan Were',
              'Mr. Gideon Mkoo', 'Mr. Wilson Gathambi', 'Mr. Godfrey Mulanda', 'Mr. Johan Kyalo',
              'Mr. Tonny Ntere'
            ].map((name, index) => (
              <p key={index}>• {name}</p>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Products and Services</h3>
          <p className="font-semibold text-gray-900">We currently have:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
            <li>A football team</li>
            <li>A media team</li>
            <li>A medical team</li>
          </ul>

          <p className="font-semibold mt-6 text-gray-900">Services</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
            <li>Create awareness to the community about government and private sector operations to take advantage of opportunities.</li>
            <li>Develop alliances with private and public organizations to improve community welfare.</li>
            <li>Focus on skill and professional growth of the community.</li>
            <li>Provide safe and healthy environments through training and participation in environmental activities.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
