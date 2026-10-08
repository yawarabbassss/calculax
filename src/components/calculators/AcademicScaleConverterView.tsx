import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { convertAcademicScale } from '../../engine/utilities';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface AcademicScaleConverterViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const AcademicScaleConverterView: React.FC<AcademicScaleConverterViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [inputScore, setInputScore] = useState<number>(initialSnapshot?.inputScore ?? 765);
  const [inputMax, setInputMax] = useState<number>(initialSnapshot?.inputMax ?? 850);
  const [targetMax, setTargetMax] = useState<number>(initialSnapshot?.targetMax ?? 1100);

  const { addHistoryItem } = useHistory();

  const result = convertAcademicScale({ inputScore, inputMax, targetMax });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputMax > 0 && targetMax > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${inputScore}/${inputMax} → Scale ${targetMax}`,
          primaryResult: `${result.primaryValue} / ${targetMax}`,
          primaryLabel: result.primaryLabel,
          inputSnapshot: { inputScore, inputMax, targetMax }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [inputScore, inputMax, targetMax, result.primaryValue]);

  const handleReset = () => {
    setInputScore(700);
    setInputMax(850);
    setTargetMax(1100);
  };

  const handleLoadSample = () => {
    setInputScore(790);
    setInputMax(850);
    setTargetMax(1100);
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
        {/* Preset Conversion Templates */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Quick Conversion Presets:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Sindh SSC (850) → Standard (1100)', inMax: 850, outMax: 1100 },
              { label: '100 Point Scale → 4.0 Scale', inMax: 100, outMax: 4.0 },
              { label: '4.0 GPA → 5.0 Scale', inMax: 4.0, outMax: 5.0 },
              { label: 'Raw Marks → 100% Normalized', inMax: 150, outMax: 100 }
            ].map(p => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setInputMax(p.inMax);
                  setTargetMax(p.outMax);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-400"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Your Obtained Score"
            type="number"
            min="0"
            max={inputMax}
            step="0.01"
            value={inputScore || ''}
            onChange={e => setInputScore(Number(e.target.value))}
            placeholder="e.g. 765"
            suffix="Score"
          />

          <InputField
            label="Original Max Scale"
            type="number"
            min="1"
            step="0.01"
            value={inputMax || ''}
            onChange={e => setInputMax(Number(e.target.value))}
            placeholder="e.g. 850"
            suffix="Max"
          />

          <InputField
            label="Target Desired Scale"
            type="number"
            min="1"
            step="0.01"
            value={targetMax || ''}
            onChange={e => setTargetMax(Number(e.target.value))}
            placeholder="e.g. 1100"
            suffix="Max"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
