'use client';

import Link from 'next/link';
import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-surfaceAlt border-b border-line h-16">
      <div className="page-wrap">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primaryDark transition-colors">
                  <TrendingUp className="h-5 w-5 text-cta" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-ink group-hover:text-primary transition-colors leading-tight">
                  ExitPayout.com
                </span>
                <span className="text-xs text-inkMuted leading-tight">
                  Ireland
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className="text-inkMuted hover:text-ink px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                href="#faq" 
                className="text-inkMuted hover:text-ink px-3 py-2 text-sm font-medium transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ink hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-surfaceAlt border-b border-line shadow-lg z-40">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link 
                href="/" 
                className="text-inkMuted hover:text-ink hover:bg-surface block px-4 py-3 text-base font-medium rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#faq" 
                className="text-inkMuted hover:text-ink hover:bg-surface block px-4 py-3 text-base font-medium rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
