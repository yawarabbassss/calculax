import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculateAge } from '../../engine/utilities';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface AgeCalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const AgeCalculatorView: React.FC<AgeCalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [birthDate, setBirthDate] = useState<string>(
    initialSnapshot?.birthDate || '2004-06-15'
  );
  const [cutoffDate, setCutoffDate] = useState<string>(
    initialSnapshot?.cutoffDate || new Date().toISOString().split('T')[0]
  );
  const [minAgeRequired, setMinAgeRequired] = useState<number>(
    initialSnapshot?.minAgeRequired ?? 17
  );
  const [maxAgeAllowed, setMaxAgeAllowed] = useState<number>(
    initialSnapshot?.maxAgeAllowed ?? 25
  );

  const { addHistoryItem } = useHistory();

  const result = calculateAge({
    birthDate,
    cutoffDate,
    minAgeRequired,
    maxAgeAllowed
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (birthDate) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `DOB: ${birthDate} • Cutoff: ${cutoffDate}`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { birthDate, cutoffDate, minAgeRequired, maxAgeAllowed }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [birthDate, cutoffDate, minAgeRequired, maxAgeAllowed, result.primaryValue]);

  const handleReset = () => {
    setBirthDate('2004-01-01');
    setCutoffDate(new Date().toISOString().split('T')[0]);
  };

  const handleLoadSample = () => {
    setBirthDate('2005-08-20');
    setCutoffDate(new Date().toISOString().split('T')[0]);
    setMinAgeRequired(17);
    setMaxAgeAllowed(25);
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
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Date of Birth"
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />

          <InputField
            label="Admission / Examination Cutoff Date"
            type="date"
            value={cutoffDate}
            onChange={e => setCutoffDate(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Minimum Age Allowed"
            type="number"
            min="1"
            value={minAgeRequired}
            onChange={e => setMinAgeRequired(Number(e.target.value))}
            suffix="Years"
          />

          <InputField
            label="Maximum Age Allowed"
            type="number"
            min="1"
            value={maxAgeAllowed}
            onChange={e => setMaxAgeAllowed(Number(e.target.value))}
            suffix="Years"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
