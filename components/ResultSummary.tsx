import { CheckCircle, Info } from 'lucide-react';

interface ResultSummaryProps {
  total: number;
  eligible: boolean;
  cappedWage: number;
  years: number;
  weeklyWage: number;
}

export default function ResultSummary({ 
  total, 
  eligible, 
  cappedWage, 
  years, 
  weeklyWage 
}: ResultSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-8 pt-8 border-t border-line">
      <div className="space-y-6">
        {/* Main Result */}
        <div className="text-center">
          <h3 className="text-sm font-medium text-inkMuted mb-2">
            Estimated redundancy
          </h3>
          <div className="text-2xl md:text-3xl font-bold text-ink mb-3">
            {formatCurrency(total)}
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            eligible 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {eligible ? 'Eligible' : 'Not eligible'}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-wash rounded-lg p-4">
          <h4 className="text-sm font-medium text-ink mb-3">Breakdown</h4>
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
            {cappedWage < weeklyWage && (
              <div className="flex justify-between items-center py-2">
                <span className="text-inkMuted">
                  Capped weekly wage applied
                </span>
                <span className="font-medium text-ink">
                  {formatCurrency(cappedWage)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Success Hint */}
        {eligible && (
          <div className="flex items-start space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-800">
              Your result is based on current Irish legislation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
