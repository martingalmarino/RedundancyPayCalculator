import RedundancyCalculator from './Calculator';
import { County } from '@/lib/countiesIE';

interface HeroProps {
  county?: County;
}

export default function Hero({ county }: HeroProps) {
  return (
    <section className="section-spacing bg-wash">
      <div className="page-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left Column - Marketing Content */}
          <div className="lg:col-span-2 space-y-4 text-center lg:text-left">
            <div>
              <h1 className="heading-1 mb-3">
                Calculate your redundancy payment
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-ink mb-4">
                {county ? `${county.name}, Ireland` : 'Ireland'}
              </div>
              <p className="text-base text-inkMuted leading-relaxed mb-4">
                Whether you've worked 2 years or 20 years, understanding your redundancy rights shouldn't be complicated. 
                Our calculator helps you estimate your statutory redundancy payment under Irish law{county ? ` in ${county.name}` : ''}.
              </p>
              <p className="text-sm text-inkMuted leading-relaxed mb-6">
                Try our calculator to see exactly how much you're entitled to based on current legislation{county ? ` for employees in ${county.name}` : ''}.
              </p>
            </div>
            
            <button className="bg-primary hover:bg-primaryDark text-cta font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
              Discover your redundancy rights
            </button>
          </div>

          {/* Right Column - Calculator */}
          <div className="lg:col-span-3">
            <RedundancyCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
