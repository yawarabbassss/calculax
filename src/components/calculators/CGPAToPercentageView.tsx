import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { convertCgpaToPercentage } from '../../engine/academic';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface CGPAToPercentageViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const CGPAToPercentageView: React.FC<CGPAToPercentageViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [cgpa, setCgpa] = useState<number>(initialSnapshot?.cgpa ?? 3.65);
  const [maxGpa, setMaxGpa] = useState<number>(initialSnapshot?.maxGpa ?? 4.0);
  const [method, setMethod] = useState<'hec_pakistan' | 'linear' | 'aicte'>(
    initialSnapshot?.method || 'hec_pakistan'
  );

  const { addHistoryItem } = useHistory();

  const result = convertCgpaToPercentage({
    cgpa,
    maxGpa,
    method
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cgpa > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `CGPA ${cgpa}/${maxGpa} (${method})`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { cgpa, maxGpa, method }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [cgpa, maxGpa, method, result.primaryValue]);

  const handleReset = () => {
    setCgpa(3.0);
    setMaxGpa(4.0);
    setMethod('hec_pakistan');
  };

  const handleLoadSample = () => {
    setCgpa(3.78);
    setMaxGpa(4.0);
    setMethod('hec_pakistan');
  };

  const methodOptions = [
    { value: 'hec_pakistan', label: 'HEC Pakistan Standard', subtext: 'Proportional Equivalence' },
    { value: 'linear', label: 'Direct Linear Scale', subtext: '(CGPA / Max) × 100' },
    { value: 'aicte', label: 'AICTE Standard Formula', subtext: '(CGPA - 0.75) × 10' }
  ];

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
        <SelectField
          label="Conversion Formula / Authority"
          options={methodOptions}
          value={method}
          onChange={e => setMethod(e.target.value as any)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Your Current CGPA"
            type="number"
            min="0"
            max={maxGpa}
            step="0.01"
            value={cgpa || ''}
            onChange={e => setCgpa(Number(e.target.value))}
            placeholder="e.g. 3.65"
            suffix={`/ ${maxGpa}`}
          />

          <InputField
            label="Grading Scale Maximum GPA"
            type="number"
            min="1"
            max="10"
            step="0.1"
            value={maxGpa || ''}
            onChange={e => setMaxGpa(Number(e.target.value))}
            placeholder="e.g. 4.0"
            suffix="Max"
          />
        </div>

        {/* Quick presets for GPA Scale */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Scale Presets:
          </label>
          <div className="flex gap-2">
            {[4.0, 5.0, 10.0].map(scale => (
              <button
                key={scale}
                type="button"
                onClick={() => setMaxGpa(scale)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  maxGpa === scale
                    ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {scale.toFixed(1)} Scale
              </button>
            ))}
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
