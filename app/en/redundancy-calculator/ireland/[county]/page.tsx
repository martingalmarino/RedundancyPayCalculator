import { Metadata } from 'next';
import { countiesIE, County } from '@/lib/countiesIE';
import { generateCountyFaqJsonLd } from '@/lib/faqJsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import FAQAccordion from '@/components/FAQAccordion';
import LocalLawyers from '@/components/LocalLawyers';

interface CountyPageProps {
  params: {
    county: string;
  };
}

export async function generateStaticParams() {
  return countiesIE.map((county) => ({
    county: county.slug,
  }));
}

export async function generateMetadata({ params }: CountyPageProps): Promise<Metadata> {
  const county = countiesIE.find(c => c.slug === params.county);
  
  if (!county) {
    return {
      title: 'County Not Found',
    };
  }

  const canonicalUrl = `https://www.exitpayout.com/en/redundancy-calculator/ireland/${county.slug}`;

  return {
    title: `Redundancy Pay Calculator - ${county.name} | Calculate Your Statutory Redundancy`,
    description: `Calculate your statutory redundancy payment in ${county.name}, Ireland. Free, accurate calculator based on current legislation. Get instant estimates for your redundancy pay in ${county.name}.`,
    keywords: `redundancy pay calculator, ${county.name}, Ireland, statutory redundancy, employment law, redundancy payment, ${county.province}`,
    authors: [{ name: 'ExitPayout.com' }],
    metadataBase: new URL('https://www.exitpayout.com'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Redundancy Pay Calculator - ${county.name}`,
      description: `Calculate your statutory redundancy payment in ${county.name}, Ireland`,
      type: 'website',
      locale: 'en_IE',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Redundancy Pay Calculator - ${county.name}`,
      description: `Calculate your statutory redundancy payment in ${county.name}, Ireland`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CountyPage({ params }: CountyPageProps) {
  const county = countiesIE.find(c => c.slug === params.county);
  
  if (!county) {
    return <div>County not found</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Redundancy Calculator', href: '/en/redundancy-calculator/ireland' },
    { label: 'Ireland', href: '/en/redundancy-calculator/ireland' },
    { label: county.name }
  ];

  const faqJsonLd = generateCountyFaqJsonLd(county.name);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="page-wrap pt-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Section with Calculator */}
        <Hero county={county} />

        {/* Local Lawyers Section */}
        <LocalLawyers countySlug={county.slug} />

        {/* FAQ Section */}
        <section id="faq" className="section-spacing bg-surface">
          <div className="page-wrap">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Frequently Asked Questions - {county.name}
              </h2>
              <p className="text-lg text-inkMuted">
                Everything you need to know about redundancy payments in {county.name}, Ireland
              </p>
            </div>
            
            <FAQAccordion county={county} />
          </div>
        </section>
      </div>
    </>
  );
}
