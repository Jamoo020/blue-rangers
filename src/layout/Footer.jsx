import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white transition">About Club</Link></li>
              <li><Link to="/team" className="hover:text-white transition">Team</Link></li>
              <li><Link to="/staff" className="hover:text-white transition">Staff</Link></li>
              <li><Link to="/join" className="hover:text-white transition">Join Us</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="font-bold text-lg mb-4">Content</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/news" className="hover:text-white transition">News</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link to="/schedule" className="hover:text-white transition">Schedule</Link></li>
              <li><Link to="/results" className="hover:text-white transition">Results</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link to="/sponsors" className="hover:text-white transition">Sponsors</Link></li>
              <li><a href="#" className="hover:text-white transition">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition">YouTube</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold">Phone:</span> +254 715 104288
            </p>
            <p className="text-gray-400 mb-2">
              <span className="font-semibold">Email:</span> info@bluerangers.co.ke
            </p>
            <p className="text-gray-400">
              <span className="font-semibold">Location:</span> Mombasa, Changamwe
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} Blue Rangers. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-green-500 hover:text-green-400 transition">Privacy</a>
              <a href="#" className="text-green-500 hover:text-green-400 transition">Terms</a>
              <a href="#" className="text-green-500 hover:text-green-400 transition">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
