'use client';

import { useState, useEffect } from 'react';
import { Lock, HelpCircle } from 'lucide-react';
import { calcRedundancyIreland } from '@/lib/calcRedundancy';

export default function RedundancyCalculator() {
  const [yearsOfService, setYearsOfService] = useState<string>('5');
  const [weeklyWage, setWeeklyWage] = useState<string>('800');
  const [result, setResult] = useState<any>(null);

  const years = parseFloat(yearsOfService) || 0;
  const wage = parseFloat(weeklyWage) || 0;

  // Auto-calculate when inputs change
  useEffect(() => {
    if (years > 0 && wage > 0) {
      const calculation = calcRedundancyIreland({ yearsOfService: years, weeklyWage: wage });
      setResult(calculation);
    }
  }, [years, wage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const cappedWage = Math.min(wage, 600);
  const totalWeeks = years >= 2 ? (years * 2) + 1 : 0;
  const totalAmount = years >= 2 ? totalWeeks * cappedWage : 0;
  const commission = years >= 2 ? 0 : 0; // No commission for redundancy calculation

  return (
    <div className="card p-8 w-full max-w-[800px] mx-auto">
      {/* Exchange Rate Header */}
      <div className="flex items-center space-x-2 mb-3">
        <Lock className="h-5 w-5 text-inkMuted" />
        <span className="text-base text-inkMuted">Statutory calculation (Ireland)</span>
      </div>
      
      <div className="text-base text-inkMuted mb-8">
        Based on Redundancy Payments Acts 1967–2014
      </div>

      {/* Input Fields - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Years of Service Input */}
        <div>
          <label className="block text-base font-medium text-ink mb-3">
            Years of service
          </label>
          <div className="relative">
            <input
              type="number"
              value={yearsOfService}
              onChange={(e) => setYearsOfService(e.target.value)}
              className="w-full h-14 px-4 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base"
              placeholder="Enter years"
              min="0"
              step="0.5"
            />
          </div>
        </div>

        {/* Weekly Wage Input */}
        <div>
          <label className="block text-base font-medium text-ink mb-3">
            Weekly wage
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-inkMuted text-base font-medium">EUR</span>
            </div>
            <input
              type="number"
              value={weeklyWage}
              onChange={(e) => setWeeklyWage(e.target.value)}
              className="w-full h-14 pl-14 pr-4 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base"
              placeholder="Enter weekly wage"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Info about cap */}
      {wage > 600 && (
        <div className="flex items-start space-x-2 mb-6 p-3 bg-wash rounded-lg">
          <HelpCircle className="h-4 w-4 text-inkMuted mt-0.5 flex-shrink-0" />
          <span className="text-xs text-inkMuted">
            Weekly wage capped at €600 for statutory calculation
          </span>
        </div>
      )}

      {/* Results - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Result */}
        <div>
          <label className="block text-base font-medium text-ink mb-3">
            Estimated redundancy payment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-inkMuted text-base font-medium">EUR</span>
            </div>
            <div className="w-full h-14 pl-14 pr-4 border border-line rounded-lg bg-wash flex items-center">
              <span className="text-lg font-semibold text-ink">
                {years >= 2 ? formatCurrency(totalAmount) : 'Not eligible'}
              </span>
            </div>
          </div>
        </div>

        {/* Eligibility Status */}
        <div>
          <label className="block text-base font-medium text-ink mb-3">
            Eligibility status
          </label>
          <div className="flex items-center h-14">
            <div className={`px-4 py-2 rounded-full text-base font-medium ${
              years >= 2 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {years >= 2 ? 'Eligible' : 'Not eligible (minimum 2 years required)'}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      {years >= 2 && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-line">
            <span className="text-inkMuted">
              {years} years × 2 weeks × {formatCurrency(cappedWage)}
            </span>
            <span className="font-medium text-ink">
              {formatCurrency(years * 2 * cappedWage)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-line">
            <span className="text-inkMuted">
              + 1 additional week × {formatCurrency(cappedWage)}
            </span>
            <span className="font-medium text-ink">
              {formatCurrency(cappedWage)}
            </span>
          </div>
          {cappedWage < wage && (
            <div className="flex justify-between items-center py-2">
              <span className="text-inkMuted">
                Weekly wage cap applied
              </span>
              <span className="font-medium text-ink">
                {formatCurrency(cappedWage)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Savings info */}
      {years >= 2 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <strong>Based on current Irish legislation</strong>
          </div>
          <div className="text-xs text-green-700 mt-1">
            This is your statutory entitlement under Irish law
          </div>
        </div>
      )}
    </div>
  );
}
