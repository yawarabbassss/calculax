import React, { useState, useEffect } from 'react';
import { Sparkles, Plus, Minus, CheckCircle, AlertTriangle } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { calculateAttendance } from '../../engine/studentLife';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface AttendanceCalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const AttendanceCalculatorView: React.FC<AttendanceCalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [totalClasses, setTotalClasses] = useState<number>(initialSnapshot?.totalClasses ?? 45);
  const [attendedClasses, setAttendedClasses] = useState<number>(initialSnapshot?.attendedClasses ?? 38);
  const [targetPercentage, setTargetPercentage] = useState<number>(initialSnapshot?.targetPercentage ?? 75);

  const { addHistoryItem } = useHistory();

  const result = calculateAttendance({
    totalClasses,
    attendedClasses,
    targetPercentage
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalClasses > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${attendedClasses}/${totalClasses} Attended • Target ${targetPercentage}%`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { totalClasses, attendedClasses, targetPercentage }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [totalClasses, attendedClasses, targetPercentage, result.primaryValue]);

  const handleReset = () => {
    setTotalClasses(30);
    setAttendedClasses(25);
    setTargetPercentage(75);
  };

  const handleLoadSample = () => {
    setTotalClasses(48);
    setAttendedClasses(34);
    setTargetPercentage(75);
  };

  // Interactive Simulator
  const simulateAttend = () => {
    setTotalClasses(prev => prev + 1);
    setAttendedClasses(prev => prev + 1);
  };

  const simulateMiss = () => {
    setTotalClasses(prev => prev + 1);
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
      {/* Target Requirement Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">
          Target Minimum Requirement:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[70, 75, 80, 85].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTargetPercentage(t)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                targetPercentage === t
                  ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              {t}% {t === 75 ? '(Standard)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Total Classes Conducted"
          sublabel="Lectures held so far"
          type="number"
          min="1"
          value={totalClasses || ''}
          onChange={e => setTotalClasses(Number(e.target.value))}
          placeholder="e.g. 45"
          suffix="Classes"
        />

        <InputField
          label="Classes Attended"
          sublabel="Present in lecture"
          type="number"
          min="0"
          max={totalClasses}
          value={attendedClasses || ''}
          onChange={e => setAttendedClasses(Number(e.target.value))}
          placeholder="e.g. 38"
          suffix="Classes"
        />
      </div>

      {/* Interactive Future Simulation Box */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Interactive Attendance Simulator
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Test what happens to your percentage if you attend or miss upcoming lectures:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={simulateAttend}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+1 Attend Next Lecture</span>
          </button>

          <button
            type="button"
            onClick={simulateMiss}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold hover:bg-rose-100 transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>+1 Skip / Miss Next Lecture</span>
          </button>
        </div>
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Attendance Trajectory
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-white">
            {result.currentPercentage?.toFixed(1) || 0}% / {targetPercentage}% Required
          </span>
        </div>

        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <div
            className={`h-full transition-all duration-300 ${
              (result.currentPercentage || 0) >= targetPercentage
                ? 'bg-emerald-500'
                : (result.currentPercentage || 0) >= 60
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, result.currentPercentage || 0))}%` }}
          />
          {/* Target line indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10"
            style={{ left: `${targetPercentage}%` }}
            title={`Target: ${targetPercentage}%`}
          />
        </div>
      </div>

    </CalculatorLayout>
  );
};
