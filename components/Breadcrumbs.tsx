'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For mobile, show only last 2 items + home (no ellipsis needed)
  const displayItems = isMobile && items.length > 3 
    ? [items[0], ...items.slice(-2)]
    : items;

  return (
    <nav className="flex items-center text-sm text-inkMuted mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex items-center space-x-1 md:space-x-2 min-w-0">
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-inkMuted mx-1 md:mx-2 flex-shrink-0" />
            )}
            {item.label === 'Home' ? (
              <Link 
                href={item.href || '/'} 
                className="hover:text-ink transition-colors flex items-center"
              >
                <Home className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            ) : item.href ? (
              <Link 
                href={item.href} 
                className="hover:text-ink transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-ink font-medium whitespace-nowrap">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
