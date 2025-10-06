'use client';

import { useState } from 'react';
import { Calculator as CalculatorIcon, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { calcRedundancyIreland } from '@/lib/calcRedundancy';

export default function Calculator() {
  const [yearsOfService, setYearsOfService] = useState<number>(0);
  const [weeklyWage, setWeeklyWage] = useState<number>(0);
  const [result, setResult] = useState<any>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = () => {
    if (yearsOfService > 0 && weeklyWage > 0) {
      const calculation = calcRedundancyIreland({ yearsOfService, weeklyWage });
      setResult(calculation);
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setYearsOfService(0);
    setWeeklyWage(0);
    setResult(null);
    setIsCalculated(false);
  };

  return (
    <div className="card p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <CalculatorIcon className="h-8 w-8 text-primary-800" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Redundancy Pay Calculator
        </h2>
        <p className="text-gray-600">
          Calculate your statutory redundancy payment under Irish law
        </p>
      </div>

      {/* Input Form */}
      <div className="space-y-6 mb-8">
        {/* Years of Service */}
        <div>
          <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Service
          </label>
          <input
            id="years"
            type="number"
            min="0"
            step="0.5"
            value={yearsOfService || ''}
            onChange={(e) => setYearsOfService(parseFloat(e.target.value) || 0)}
            className="input-field"
            placeholder="Enter years of service"
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum 2 years required for statutory redundancy
          </p>
        </div>

        {/* Weekly Wage */}
        <div>
          <label htmlFor="wage" className="block text-sm font-medium text-gray-700 mb-2">
            Weekly Wage (€)
          </label>
          <input
            id="wage"
            type="number"
            min="0"
            step="0.01"
            value={weeklyWage || ''}
            onChange={(e) => setWeeklyWage(parseFloat(e.target.value) || 0)}
            className="input-field"
            placeholder="Enter weekly wage"
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum €600 per week applies for calculation
          </p>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={yearsOfService <= 0 || weeklyWage <= 0}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Redundancy Pay
        </button>
      </div>

      {/* Results */}
      {isCalculated && result && (
        <div className="border-t border-gray-200 pt-8">
          <div className="space-y-6">
            {/* Eligibility Status */}
            <div className={`p-4 rounded-lg ${
              result.eligible 
                ? 'bg-success-50 border border-success-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {result.eligible ? (
                  <CheckCircle className="h-5 w-5 text-success-600 mr-3" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                )}
                <div>
                  <h3 className={`font-semibold ${
                    result.eligible ? 'text-success-800' : 'text-red-800'
                  }`}>
                    {result.eligible ? 'Eligible for Redundancy Pay' : 'Not Eligible'}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    result.eligible ? 'text-success-700' : 'text-red-700'
                  }`}>
                    {result.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            {result.eligible && (
              <div className="bg-primary-50 border border-primary-200 p-6 rounded-lg">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">
                    Total Redundancy Payment
                  </h3>
                  <div className="text-3xl font-bold text-primary-900 mb-2">
                    €{result.total.toLocaleString()}
                  </div>
                  <p className="text-sm text-primary-700">
                    Based on {yearsOfService} years of service
                  </p>
                </div>
              </div>
            )}

            {/* Capped Wage Info */}
            {result.eligible && result.cappedWage < weeklyWage && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">
                      Weekly Wage Cap Applied
                    </h4>
                    <p className="text-sm text-blue-700">
                      Your weekly wage of €{weeklyWage} has been capped at €{result.cappedWage} 
                      for the calculation, as per statutory limits.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-primary-800 hover:text-primary-900 font-medium transition-colors"
              >
                Calculate Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
