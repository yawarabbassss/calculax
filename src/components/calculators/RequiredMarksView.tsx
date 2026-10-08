import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculateRequiredFinalMarks } from '../../engine/academic';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface RequiredMarksViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const RequiredMarksView: React.FC<RequiredMarksViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [currentMarksObtained, setCurrentMarksObtained] = useState<number>(
    initialSnapshot?.currentMarksObtained ?? 42
  );
  const [currentMarksTotal, setCurrentMarksTotal] = useState<number>(
    initialSnapshot?.currentMarksTotal ?? 60
  );
  const [finalExamTotalMarks, setFinalExamTotalMarks] = useState<number>(
    initialSnapshot?.finalExamTotalMarks ?? 40
  );
  const [targetPercentage, setTargetPercentage] = useState<number>(
    initialSnapshot?.targetPercentage ?? 80
  );

  const { addHistoryItem } = useHistory();

  const result = calculateRequiredFinalMarks({
    currentMarksObtained,
    currentMarksTotal,
    finalExamTotalMarks,
    targetPercentage
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentMarksTotal > 0 && finalExamTotalMarks > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `Current: ${currentMarksObtained}/${currentMarksTotal} • Target: ${targetPercentage}%`,
          primaryResult: `${result.primaryValue} / ${finalExamTotalMarks}`,
          primaryLabel: result.primaryLabel,
          inputSnapshot: { currentMarksObtained, currentMarksTotal, finalExamTotalMarks, targetPercentage }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [currentMarksObtained, currentMarksTotal, finalExamTotalMarks, targetPercentage, result.primaryValue]);

  const handleReset = () => {
    setCurrentMarksObtained(0);
    setCurrentMarksTotal(50);
    setFinalExamTotalMarks(50);
    setTargetPercentage(75);
  };

  const handleLoadSample = () => {
    setCurrentMarksObtained(44);
    setCurrentMarksTotal(60);
    setFinalExamTotalMarks(40);
    setTargetPercentage(85);
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
      {/* Target Goal Buttons */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Target Overall Grade / Percentage:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Pass (50%)', val: 50 },
            { label: 'Grade B (70%)', val: 70 },
            { label: 'Grade A (80%)', val: 80 },
            { label: 'Grade A+ (85%)', val: 85 }
          ].map(g => (
            <button
              key={g.val}
              type="button"
              onClick={() => setTargetPercentage(g.val)}
              className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                targetPercentage === g.val
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            1. Completed Sessional Assessments (Quizzes, Midterms, Assignments)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Marks Scored So Far"
              type="number"
              min="0"
              max={currentMarksTotal}
              value={currentMarksObtained || ''}
              onChange={e => setCurrentMarksObtained(Number(e.target.value))}
              placeholder="e.g. 42"
              suffix="Marks"
            />
            <InputField
              label="Total Sessional Marks"
              type="number"
              min="1"
              value={currentMarksTotal || ''}
              onChange={e => setCurrentMarksTotal(Number(e.target.value))}
              placeholder="e.g. 60"
              suffix="Marks"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            2. Final Examination Paper
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Final Exam Maximum Marks"
              type="number"
              min="1"
              value={finalExamTotalMarks || ''}
              onChange={e => setFinalExamTotalMarks(Number(e.target.value))}
              placeholder="e.g. 40"
              suffix="Marks"
            />
            <InputField
              label="Desired Overall Target (%)"
              type="number"
              min="1"
              max="100"
              value={targetPercentage || ''}
              onChange={e => setTargetPercentage(Number(e.target.value))}
              placeholder="e.g. 80"
              suffix="%"
            />
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
