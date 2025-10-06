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
  }
];

export default function FAQAccordion() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-1">
      {faqData.map((item, index) => (
        <div key={index} className="card-small">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-wash transition-colors"
          >
            <h3 className="font-medium text-ink pr-4">
              {item.question}
            </h3>
            {openItems.includes(index) ? (
              <ChevronUp className="h-4 w-4 text-inkMuted flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-inkMuted flex-shrink-0" />
            )}
          </button>
          
          {openItems.includes(index) && (
            <div className="px-6 pb-4">
              <div className="border-t border-line pt-4">
                <p className="text-inkMuted leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
