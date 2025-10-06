import StatusChips from './StatusChips';
import RedundancyCalculator from './Calculator';
import FeatureStrip from './FeatureStrip';

export default function Hero() {
  const statusChips = [
    { text: 'Statutory cap €600 / week' },
    { text: 'Based on Redundancy Payments Acts 1967–2014' }
  ];

  return (
    <section className="section-spacing bg-wash">
      <div className="page-wrap">
        {/* Headline Stack */}
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-4">
            Redundancy Pay Calculator
          </h1>
          <div className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Ireland
          </div>
          <p className="text-lg text-inkMuted max-w-2xl mx-auto">
            Quickly estimate your statutory redundancy payment under Irish law.
          </p>
        </div>

        {/* Status Chips */}
        <StatusChips items={statusChips} />

        {/* Calculator Card */}
        <RedundancyCalculator />

        {/* Feature Strip */}
        <FeatureStrip />
      </div>
    </section>
  );
}
