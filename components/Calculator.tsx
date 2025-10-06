'use client';

import { useState } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { calcRedundancyIreland } from '@/lib/calcRedundancy';
import LabeledField from './LabeledField';
import MoneyField from './MoneyField';
import ResultSummary from './ResultSummary';

export default function RedundancyCalculator() {
  const [yearsOfService, setYearsOfService] = useState<string>('');
  const [weeklyWage, setWeeklyWage] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const years = parseFloat(yearsOfService) || 0;
  const wage = parseFloat(weeklyWage) || 0;

  const handleCalculate = () => {
    if (years > 0 && wage > 0) {
      const calculation = calcRedundancyIreland({ yearsOfService: years, weeklyWage: wage });
      setResult(calculation);
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setYearsOfService('');
    setWeeklyWage('');
    setResult(null);
    setIsCalculated(false);
  };

  const isFormValid = years > 0 && wage > 0;
  const yearsError = years > 0 && years < 2 ? 'Minimum 2 years required for statutory redundancy' : '';

  return (
    <div className="card p-8 max-w-[720px] mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="inline-flex items-center justify-center w-10 h-10 bg-wash rounded-full">
          <CalculatorIcon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="heading-3">
          Calculate your statutory redundancy
        </h2>
      </div>

      {/* Input Form */}
      <div className="space-y-6">
        <LabeledField
          label="Years of Service"
          id="years"
          type="number"
          value={yearsOfService}
          onChange={setYearsOfService}
          placeholder="Enter years of service"
          helperText="Minimum 2 years required for statutory redundancy"
          errorText={yearsError}
          min={0}
          step={0.5}
          required
        />

        <MoneyField
          label="Weekly Wage"
          id="wage"
          value={weeklyWage}
          onChange={setWeeklyWage}
          placeholder="Enter weekly wage"
          helperText="Maximum €600 per week applies"
          required
        />

        <button
          onClick={handleCalculate}
          disabled={!isFormValid}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate
        </button>
      </div>

      {/* Results */}
      {isCalculated && result && (
        <ResultSummary
          total={result.total}
          eligible={result.eligible}
          cappedWage={result.cappedWage}
          years={years}
          weeklyWage={wage}
        />
      )}

      {/* Reset Button */}
      {isCalculated && (
        <div className="text-center mt-6">
          <button
            onClick={handleReset}
            className="text-inkMuted hover:text-ink font-medium transition-colors"
          >
            Calculate Again
          </button>
        </div>
      )}
    </div>
  );
}
