import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { calculateWeightedGrade, AssessmentWeightItem } from '../../engine/academic';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface WeightedGradeViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

const DEFAULT_ASSESSMENTS: AssessmentWeightItem[] = [
  { id: '1', name: 'Quizzes (Total 4)', weight: 15, score: 88, isCompleted: true },
  { id: '2', name: 'Assignments / Homework', weight: 15, score: 92, isCompleted: true },
  { id: '3', name: 'Midterm Exam 1', weight: 15, score: 78, isCompleted: true },
  { id: '4', name: 'Midterm Exam 2', weight: 15, score: 84, isCompleted: true },
  { id: '5', name: 'Final Project', weight: 10, score: 90, isCompleted: true },
  { id: '6', name: 'Final Comprehensive Exam', weight: 30, score: 0, isCompleted: false }
];

export const WeightedGradeView: React.FC<WeightedGradeViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [items, setItems] = useState<AssessmentWeightItem[]>(
    initialSnapshot?.items || DEFAULT_ASSESSMENTS
  );
  const [targetPercentage, setTargetPercentage] = useState<number>(
    initialSnapshot?.targetPercentage ?? 85
  );

  const { addHistoryItem } = useHistory();

  const result = calculateWeightedGrade(items, targetPercentage);

  useEffect(() => {
    const timer = setTimeout(() => {
      const completedCount = items.filter(i => i.isCompleted).length;
      if (completedCount > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${completedCount}/${items.length} Assessments Complete • Target ${targetPercentage}%`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { items, targetPercentage }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [items, targetPercentage, result.primaryValue]);

  const handleReset = () => {
    setItems([
      { id: '1', name: 'Assignments', weight: 20, score: 85, isCompleted: true },
      { id: '2', name: 'Midterm Exam', weight: 30, score: 75, isCompleted: true },
      { id: '3', name: 'Final Exam', weight: 50, score: 0, isCompleted: false }
    ]);
    setTargetPercentage(85);
  };

  const handleLoadSample = () => {
    setItems(DEFAULT_ASSESSMENTS);
    setTargetPercentage(85);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: `${Date.now()}`,
        name: `Assessment ${items.length + 1}`,
        weight: 10,
        score: 80,
        isCompleted: true
      }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, updates: Partial<AssessmentWeightItem>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const totalWeight = items.reduce((sum, it) => sum + it.weight, 0);

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      {/* Target Grade Selector */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
        <div>
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
            Target Final Desired Grade:
          </label>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Calculates what score is needed on remaining exams
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min="1"
            max="100"
            value={targetPercentage}
            onChange={e => setTargetPercentage(Number(e.target.value))}
            className="w-20 px-3 py-1.5 text-xs font-bold font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-center focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <span className="text-xs font-semibold text-slate-500">%</span>
        </div>
      </div>

      {/* Assessment Weights List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            Course Assessments
          </h4>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            totalWeight === 100
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
          }`}>
            Total Syllabus Weight: {totalWeight}% {totalWeight === 100 ? '✓' : '(≠ 100%)'}
          </span>
        </div>

        <div className="space-y-3">
          {items.map((it, idx) => (
            <div
              key={it.id}
              className={`p-4 rounded-2xl border transition-all ${
                it.isCompleted
                  ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  : 'border-dashed border-brand-300 dark:border-brand-800 bg-brand-50/20 dark:bg-brand-950/10'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateItem(it.id, { isCompleted: !it.isCompleted })}
                    className="text-brand-600 dark:text-brand-400 focus:outline-none"
                    title={it.isCompleted ? 'Mark as Upcoming / Incomplete' : 'Mark as Completed'}
                  >
                    {it.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <input
                    type="text"
                    value={it.name}
                    onChange={e => updateItem(it.id, { name: e.target.value })}
                    placeholder={`Assessment ${idx + 1}`}
                    className="font-bold text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-brand-500 focus:outline-none px-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                    it.isCompleted ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {it.isCompleted ? 'Graded' : 'Upcoming'}
                  </span>

                  {items.length > 1 && (
                    <button
                      onClick={() => removeItem(it.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                      title="Remove Assessment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputField
                  label="Assessment Weight (%)"
                  type="number"
                  min="1"
                  max="100"
                  value={it.weight || ''}
                  onChange={e => updateItem(it.id, { weight: Number(e.target.value) })}
                  suffix="%"
                />

                <InputField
                  label={it.isCompleted ? "Your Scored Percentage (%)" : "Estimated / Target Score (%)"}
                  type="number"
                  min="0"
                  max="100"
                  disabled={!it.isCompleted}
                  value={it.isCompleted ? (it.score || '') : ''}
                  onChange={e => updateItem(it.id, { score: Number(e.target.value) })}
                  placeholder={it.isCompleted ? "e.g. 85" : "Calculated automatically"}
                  suffix="%"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={addItem}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-900 text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Assessment</span>
          </button>
        </div>
      </div>
    </CalculatorLayout>
  );
};
