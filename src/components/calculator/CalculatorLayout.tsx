import React from 'react';
import { RotateCcw, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { CalculatorMeta, CalculationResult } from '../../types';
import { ResultDisplay } from './ResultDisplay';
import { FormulaBreakdown } from './FormulaBreakdown';
import { DynamicIcon } from '../common/DynamicIcon';

interface CalculatorLayoutProps {
  meta: CalculatorMeta;
  result: CalculationResult;
  onReset: () => void;
  onLoadSample?: () => void;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  children: React.ReactNode;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  meta,
  result,
  onReset,
  onLoadSample,
  onOpenExport,
  onNavigate,
  children
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
        <button 
          onClick={() => onNavigate && onNavigate('/')}
          className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <button 
          onClick={() => onNavigate && onNavigate(`/category/${meta.category}`)}
          className="hover:text-brand-600 dark:hover:text-brand-400 capitalize transition-colors"
        >
          {meta.category.replace('-', ' ')}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900 dark:text-white truncate">
          {meta.name}
        </span>
      </nav>

      {/* Calculator Header / Meta Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm shadow-brand-500/20">
              <DynamicIcon name={meta.icon} className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {meta.name}
              </h1>
            </div>
            {meta.badge && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                {meta.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          {onLoadSample && (
            <button
              onClick={onLoadSample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Load realistic sample data to see calculation in action"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              <span>Sample Data</span>
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Reset all inputs to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Focused 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Form Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-premium dark:shadow-premium-dark space-y-6">
            {children}
          </div>
        </div>

        {/* Right Column: Sticky Dominant Result & Breakdown */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          <ResultDisplay
            result={result}
            calculatorTitle={meta.name}
            onOpenExport={onOpenExport}
            triggerConfetti={true}
          />

          <FormulaBreakdown result={result} />
        </div>

      </div>

    </div>
  );
};
