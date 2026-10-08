import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculateDateDifference } from '../../engine/utilities';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface DateDifferenceViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const DateDifferenceView: React.FC<DateDifferenceViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const today = new Date().toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(initialSnapshot?.startDate || today);
  const [endDate, setEndDate] = useState<string>(initialSnapshot?.endDate || defaultEnd);

  const { addHistoryItem } = useHistory();

  const result = calculateDateDifference({ startDate, endDate });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (startDate && endDate) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${startDate} → ${endDate}`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { startDate, endDate }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [startDate, endDate, result.primaryValue]);

  const handleReset = () => {
    setStartDate(today);
    setEndDate(defaultEnd);
  };

  const handleLoadSample = () => {
    setStartDate(today);
    // 16 weeks typical semester
    const semEnd = new Date(Date.now() + 112 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setEndDate(semEnd);
  };

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        <InputField
          label="End Date / Target Deadline"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>
    </CalculatorLayout>
  );
};
