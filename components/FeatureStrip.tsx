import { Calculator as CalculatorIcon, Shield, Clock, Euro } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: CalculatorIcon,
    title: 'Accurate Calculations',
    description: 'Based on current Irish legislation and statutory rates'
  },
  {
    icon: Shield,
    title: 'Legal Compliance',
    description: 'Follows Redundancy Payments Acts 1967–2014'
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Get your redundancy estimate in seconds'
  },
  {
    icon: Euro,
    title: 'Free to Use',
    description: 'No registration required, completely free'
  }
];

export default function FeatureStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {features.map((feature, index) => (
        <div key={index} className="card-small p-4 text-center hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-wash rounded-full mb-3">
            <feature.icon className="h-5 w-5 text-ink" />
          </div>
          <h3 className="text-sm font-semibold text-ink mb-1">
            {feature.title}
          </h3>
          <p className="text-xs text-inkMuted leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
