'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Who qualifies for redundancy payment in Ireland?",
    answer: "Employees with at least 2 years of continuous service with the same employer are entitled to statutory redundancy payment under Irish law. This includes full-time, part-time, and temporary employees."
  },
  {
    question: "How is statutory redundancy calculated in Ireland?",
    answer: "The calculation is based on 2 weeks' pay for each year of service plus 1 additional week's pay. The weekly wage is capped at €600. For example, 5 years of service = (5 × 2 + 1) × €600 = €6,600."
  },
  {
    question: "Is redundancy payment taxable in Ireland?",
    answer: "The first €10,160 of redundancy payment is tax-free. Any amount above this threshold is subject to income tax, PRSI, and USC at your normal rates."
  },
  {
    question: "What is the minimum service requirement?",
    answer: "You must have at least 2 years of continuous service with your employer to qualify for statutory redundancy payment. Service with previous employers does not count unless there was a transfer of business."
  },
  {
    question: "Can I get redundancy pay if I resign?",
    answer: "No, statutory redundancy payment is only available when you are made redundant by your employer. If you resign voluntarily, you are not entitled to redundancy payment."
  },
  {
    question: "What if my employer doesn't pay redundancy?",
    answer: "If your employer refuses to pay statutory redundancy, you can make a claim to the Workplace Relations Commission (WRC). You have 6 months from the date of dismissal to make a claim."
  },
  {
    question: "Does redundancy pay affect social welfare?",
    answer: "Redundancy payment may affect your entitlement to Jobseeker's Benefit or Jobseeker's Allowance. The payment is considered as means and may reduce your social welfare payment."
  },
  {
    question: "Can I negotiate a higher redundancy package?",
    answer: "Yes, you can negotiate with your employer for a higher redundancy package than the statutory minimum. Many employers offer enhanced redundancy packages, especially for long-serving employees."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to know about redundancy payments in Ireland
        </p>
      </div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="card">
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-4">
                {item.question}
              </h3>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
