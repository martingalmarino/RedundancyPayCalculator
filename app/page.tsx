'use client';

import { ArrowDown, Calculator as CalculatorIcon, Shield, Clock, Euro } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import RedundancyCalculator from '@/components/Calculator';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';

export default function Home() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Redundancy Calculator', href: '/en/redundancy-calculator/ireland' },
    { label: 'Ireland' }
  ];

  const features = [
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Breadcrumbs items={breadcrumbItems} />
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Redundancy Pay Calculator
              <span className="block text-primary-800">Ireland</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Quickly estimate your statutory redundancy payment under Irish law. 
              Get accurate calculations based on current legislation.
            </p>
            
            <button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors text-lg"
            >
              Calculate Now
              <ArrowDown className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-primary-800" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RedundancyCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </section>
    </div>
  );
}
