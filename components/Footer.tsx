import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RedundancyCalc</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Calculate your statutory redundancy payment under Irish law. 
              Get accurate estimates based on current legislation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-800 text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 RedundancyCalc. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              This calculator is for informational purposes only and should not be considered legal advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
