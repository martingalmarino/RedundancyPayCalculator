import Link from 'next/link';
import { countiesIE } from '@/lib/countiesIE';

// Top 10 most populous counties in Ireland
const topCounties = [
  'dublin', 'cork', 'galway', 'limerick', 'waterford',
  'kilkenny', 'wexford', 'meath', 'louth', 'kildare'
];

export default function CountiesPills() {
  const featuredCounties = countiesIE.filter(county => 
    topCounties.includes(county.slug)
  );

  return (
    <div className="bg-surface rounded-2xl shadow-card border border-line p-6">
      <div className="text-center mb-6">
        <h3 className="heading-3 mb-2">
          Calculate Redundancy by County
        </h3>
        <p className="text-inkMuted">
          Get localized redundancy calculations for major Irish counties
        </p>
      </div>

      {/* Counties Pills */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {featuredCounties.map((county) => (
          <Link
            key={county.slug}
            href={`/en/redundancy-calculator/ireland/${county.slug}`}
            className="inline-flex items-center px-4 py-2 bg-wash hover:bg-wash-deeper text-ink font-medium rounded-full border border-line hover:border-primary transition-all duration-200 hover:shadow-sm"
          >
            <span className="text-sm">{county.name}</span>
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link
          href="/en/redundancy-calculator/ireland/counties"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primaryDark text-cta font-semibold rounded-lg transition-colors text-sm"
        >
          View All 26 Counties
          <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
