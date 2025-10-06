import { Metadata } from 'next';
import { countiesIE } from '@/lib/countiesIE';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Irish Counties - Redundancy Pay Calculator | Complete County List',
  description: 'Complete list of all 26 Irish counties with redundancy pay calculators. Find your county and calculate your statutory redundancy payment under Irish law.',
  keywords: 'Irish counties, redundancy calculator, Ireland, statutory redundancy, employment law, all counties',
  authors: [{ name: 'ExitPayout.com' }],
  metadataBase: new URL('https://www.exitpayout.com'),
  alternates: {
    canonical: 'https://www.exitpayout.com/en/redundancy-calculator/ireland/counties',
  },
  openGraph: {
    title: 'All Irish Counties - Redundancy Pay Calculator',
    description: 'Complete list of all 26 Irish counties with redundancy pay calculators',
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.exitpayout.com/en/redundancy-calculator/ireland/counties',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CountiesPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Redundancy Calculator', href: '/en/redundancy-calculator/ireland' },
    { label: 'Ireland', href: '/en/redundancy-calculator/ireland' },
    { label: 'All Counties' }
  ];

  // Group counties by province
  const countiesByProvince = countiesIE.reduce((acc, county) => {
    if (!acc[county.province]) {
      acc[county.province] = [];
    }
    acc[county.province].push(county);
    return acc;
  }, {} as Record<string, typeof countiesIE>);

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="page-wrap pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="section-spacing bg-wash">
        <div className="page-wrap">
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">
              Redundancy Pay Calculator by County
            </h1>
            <p className="text-xl text-inkMuted max-w-3xl mx-auto">
              Calculate your statutory redundancy payment for any of the 26 counties in Ireland. 
              Get accurate estimates based on current Irish legislation.
            </p>
          </div>
        </div>
      </section>

      {/* Counties by Province */}
      <section className="section-spacing bg-surface">
        <div className="page-wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {Object.entries(countiesByProvince).map(([province, counties]) => (
              <div key={province} className="bg-surface rounded-2xl shadow-card border border-line p-6">
                <h2 className="heading-3 mb-6 text-center">
                  {province}
                </h2>
                
                <div className="space-y-3">
                  {counties.map((county) => (
                    <Link
                      key={county.slug}
                      href={`/en/redundancy-calculator/ireland/${county.slug}`}
                      className="block p-3 bg-wash hover:bg-wash-deeper rounded-lg border border-line hover:border-primary transition-all duration-200 hover:shadow-sm group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-ink group-hover:text-primary transition-colors">
                          {county.name}
                        </span>
                        <svg className="h-4 w-4 text-inkMuted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-spacing bg-wash">
        <div className="page-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 mb-6">
              Why Use County-Specific Calculators?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-card border border-line">
                <h3 className="font-semibold text-ink mb-3">Same National Rules</h3>
                <p className="text-inkMuted text-sm">
                  Statutory redundancy calculations are the same across all Irish counties, 
                  but local context helps with understanding your rights.
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-card border border-line">
                <h3 className="font-semibold text-ink mb-3">Local Relevance</h3>
                <p className="text-inkMuted text-sm">
                  County-specific pages help you find relevant information faster 
                  and improve local search visibility.
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-card border border-line">
                <h3 className="font-semibold text-ink mb-3">Comprehensive Coverage</h3>
                <p className="text-inkMuted text-sm">
                  Whether you're in Dublin, Cork, or Donegal, get the same accurate 
                  calculations with local context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
