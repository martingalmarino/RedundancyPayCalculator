import Breadcrumbs from '@/components/Breadcrumbs';
import Hero from '@/components/Hero';
import FAQAccordion from '@/components/FAQAccordion';

export default function IrelandCalculatorPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Redundancy Calculator', href: '/en/redundancy-calculator' },
    { label: 'Ireland' }
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <div className="page-wrap pt-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section with Calculator */}
      <Hero />

      {/* FAQ Section */}
      <section id="faq" className="section-spacing bg-surface">
        <div className="page-wrap">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-inkMuted">
              Everything you need to know about redundancy payments in Ireland
            </p>
          </div>
          
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}
