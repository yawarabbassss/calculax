import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle } from 'lucide-react';
import { CalculationResult } from '../../types';

interface FormulaBreakdownProps {
  result: CalculationResult;
  defaultOpen?: boolean;
}

export const FormulaBreakdown: React.FC<FormulaBreakdownProps> = ({
  result,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasBreakdown = result.breakdown && result.breakdown.length > 0;
  const hasExplanation = result.explanation && result.explanation.length > 0;
  const hasNotes = result.notes && result.notes.length > 0;

  if (!hasBreakdown && !hasExplanation && !hasNotes) return null;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 overflow-hidden shadow-xs">
      
      {/* Accordion Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left bg-slate-50/70 dark:bg-slate-850/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <span className="font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Calculation Methodology & Formula
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span>{isOpen ? 'Collapse' : 'View Formula'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-5 space-y-5 text-sm divide-y divide-slate-100 dark:divide-slate-800/70">
          
          {/* Step by step table */}
          {hasBreakdown && (
            <div className="space-y-2.5">
              <h5 className="font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Step-by-Step Breakdown
              </h5>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden">
                {result.breakdown!.map((step, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{step.step}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 pl-5">
                        {step.description}
                      </p>
                    </div>

                    <div className="text-right pl-5 sm:pl-0">
                      {step.formula && (
                        <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block">
                          {step.formula}
                        </div>
                      )}
                      <div className="font-mono font-bold text-slate-900 dark:text-brand-300 mt-0.5">
                        {step.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed explanation text */}
          {hasExplanation && (
            <div className="pt-4 space-y-2">
              <h5 className="font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Mathematical Explanation
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {result.explanation!.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-500 font-bold">•</span>
                    <span className="leading-relaxed">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Academic notes / institutional context */}
          {hasNotes && (
            <div className="pt-4 space-y-1.5">
              <h5 className="font-semibold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Important Academic Notes</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                {result.notes!.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">
                    • {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Disclaimer */}
          {result.disclaimer && (
            <div className="pt-3 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
              <strong>Official Note:</strong> {result.disclaimer}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
