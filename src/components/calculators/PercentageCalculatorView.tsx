import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculatePercentage } from '../../engine/academic';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface PercentageCalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const PercentageCalculatorView: React.FC<PercentageCalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [mode, setMode] = useState<'marks_to_percentage' | 'percentage_to_marks'>(
    initialSnapshot?.mode || 'marks_to_percentage'
  );
  const [obtainedMarks, setObtainedMarks] = useState<number>(initialSnapshot?.obtainedMarks ?? 985);
  const [totalMarks, setTotalMarks] = useState<number>(initialSnapshot?.totalMarks ?? 1100);
  const [percentage, setPercentage] = useState<number>(initialSnapshot?.percentage ?? 85);

  const { addHistoryItem } = useHistory();

  const result = calculatePercentage(mode, {
    obtainedMarks,
    totalMarks,
    percentage
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalMarks > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: mode === 'marks_to_percentage' 
            ? `${obtainedMarks} / ${totalMarks} Marks` 
            : `${percentage}% of ${totalMarks} Marks`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { mode, obtainedMarks, totalMarks, percentage }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [mode, obtainedMarks, totalMarks, percentage, result.primaryValue]);

  const handleReset = () => {
    setObtainedMarks(0);
    setTotalMarks(1100);
    setPercentage(80);
  };

  const handleLoadSample = () => {
    setMode('marks_to_percentage');
    setObtainedMarks(1024);
    setTotalMarks(1100);
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
      {/* Mode Switcher Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
        <button
          onClick={() => setMode('marks_to_percentage')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'marks_to_percentage'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Marks → Percentage (%)
        </button>
        <button
          onClick={() => setMode('percentage_to_marks')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
            mode === 'percentage_to_marks'
              ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Percentage (%) → Marks
        </button>
      </div>

      {/* Quick Total Marks Presets */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Standard Exam / Board Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Matric / FSc (1100)', val: 1100 },
            { label: 'O-Levels (800)', val: 800 },
            { label: 'SSC Sindh (850)', val: 850 },
            { label: 'Test Max (100)', val: 100 },
            { label: 'MDCAT (200)', val: 200 }
          ].map(p => (
            <button
              key={p.val}
              onClick={() => setTotalMarks(p.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                totalMarks === p.val
                  ? 'bg-brand-50 border-brand-300 text-brand-700 dark:bg-brand-950/60 dark:border-brand-800 dark:text-brand-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Form */}
      {mode === 'marks_to_percentage' ? (
        <div className="space-y-4">
          <InputField
            label="Obtained Marks"
            sublabel="Marks you secured"
            type="number"
            min="0"
            max={totalMarks}
            value={obtainedMarks || ''}
            onChange={e => setObtainedMarks(Number(e.target.value))}
            placeholder="e.g. 985"
            suffix="Marks"
          />

          <InputField
            label="Total Maximum Marks"
            sublabel="Total possible marks"
            type="number"
            min="1"
            value={totalMarks || ''}
            onChange={e => setTotalMarks(Number(e.target.value))}
            placeholder="e.g. 1100"
            suffix="Marks"
          />
        </div>
      ) : (
        <div className="space-y-4">
          <InputField
            label="Target Percentage (%)"
            sublabel="Goal or required percentage"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={percentage || ''}
            onChange={e => setPercentage(Number(e.target.value))}
            placeholder="e.g. 85"
            suffix="%"
          />

          <InputField
            label="Total Maximum Marks"
            sublabel="Total possible marks"
            type="number"
            min="1"
            value={totalMarks || ''}
            onChange={e => setTotalMarks(Number(e.target.value))}
            placeholder="e.g. 1100"
            suffix="Marks"
          />
        </div>
      )}
    </CalculatorLayout>
  );
};
