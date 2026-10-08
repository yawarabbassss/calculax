import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculateScholarshipEligibility } from '../../engine/studentLife';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface ScholarshipCalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const ScholarshipCalculatorView: React.FC<ScholarshipCalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [metricType, setMetricType] = useState<'cgpa' | 'percentage'>(
    initialSnapshot?.metricType || 'cgpa'
  );
  const [cgpaOrAggregate, setCgpaOrAggregate] = useState<number>(
    initialSnapshot?.cgpaOrAggregate ?? 3.82
  );
  const [semesterTuitionFee, setSemesterTuitionFee] = useState<number>(
    initialSnapshot?.semesterTuitionFee ?? 185000
  );

  const { addHistoryItem } = useHistory();

  const result = calculateScholarshipEligibility({
    cgpaOrAggregate,
    metricType,
    semesterTuitionFee
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cgpaOrAggregate > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${metricType === 'cgpa' ? `CGPA ${cgpaOrAggregate}` : `${cgpaOrAggregate}%`} • Fee: Rs. ${semesterTuitionFee.toLocaleString()}`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { metricType, cgpaOrAggregate, semesterTuitionFee }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [metricType, cgpaOrAggregate, semesterTuitionFee, result.primaryValue]);

  const handleReset = () => {
    setCgpaOrAggregate(3.5);
    setSemesterTuitionFee(150000);
    setMetricType('cgpa');
  };

  const handleLoadSample = () => {
    setCgpaOrAggregate(3.92);
    setSemesterTuitionFee(210000);
    setMetricType('cgpa');
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
        {/* Metric Switcher */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => {
              setMetricType('cgpa');
              setCgpaOrAggregate(3.8);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              metricType === 'cgpa'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            CGPA Based (Semester System)
          </button>
          <button
            onClick={() => {
              setMetricType('percentage');
              setCgpaOrAggregate(88);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              metricType === 'percentage'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Percentage / Aggregate Based
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label={metricType === 'cgpa' ? 'Your CGPA' : 'Your Aggregate / Percentage'}
            type="number"
            min="0"
            max={metricType === 'cgpa' ? 4.0 : 100}
            step={metricType === 'cgpa' ? '0.01' : '0.1'}
            value={cgpaOrAggregate || ''}
            onChange={e => setCgpaOrAggregate(Number(e.target.value))}
            placeholder={metricType === 'cgpa' ? 'e.g. 3.82' : 'e.g. 88.5'}
            suffix={metricType === 'cgpa' ? '/ 4.0' : '%'}
          />

          <InputField
            label="Semester Tuition Fee (Rs.)"
            type="number"
            min="0"
            step="5000"
            value={semesterTuitionFee || ''}
            onChange={e => setSemesterTuitionFee(Number(e.target.value))}
            placeholder="e.g. 185000"
            prefix="Rs."
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
