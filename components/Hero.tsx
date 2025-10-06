import RedundancyCalculator from './Calculator';

export default function Hero() {
  return (
    <section className="section-spacing bg-wash">
      <div className="page-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Marketing Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="heading-1 mb-4">
                Calculate your redundancy payment
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Ireland
              </div>
              <p className="text-lg text-inkMuted leading-relaxed mb-6">
                Whether you've worked 2 years or 20 years, understanding your redundancy rights shouldn't be complicated. 
                Our calculator helps you estimate your statutory redundancy payment under Irish law, with no hidden fees or complex terms.
              </p>
              <p className="text-inkMuted leading-relaxed mb-8">
                Try our calculator to see exactly how much you're entitled to based on current legislation. 
                Get instant, accurate estimates based on the Redundancy Payments Acts 1967–2014.
              </p>
            </div>
            
            <button className="bg-primary hover:bg-primaryDark text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Discover your redundancy rights
            </button>
          </div>

          {/* Right Column - Calculator */}
          <div className="lg:col-span-1">
            <RedundancyCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}
