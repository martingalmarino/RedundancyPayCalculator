import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surfaceAlt border-t border-line">
      <div className="page-wrap py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-cta" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-ink leading-tight">
                  ExitPayout.com
                </span>
                <span className="text-xs text-inkMuted leading-tight">
                  Ireland
                </span>
              </div>
            </div>
            <p className="text-inkMuted text-sm leading-relaxed">
              Calculate your statutory redundancy payment under Irish law. 
              Get accurate estimates based on current legislation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-inkMuted hover:text-ink text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-inkMuted hover:text-ink text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-inkMuted hover:text-ink text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-inkMuted hover:text-ink text-sm transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-line">
          <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-inkMuted text-sm">
                      © 2024 ExitPayout.com. All rights reserved.
                    </p>
            <p className="text-inkMuted text-sm mt-2 md:mt-0">
              This calculator is for informational purposes only and should not be considered legal advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
