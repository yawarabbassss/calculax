import React, { useState } from 'react';
import { X, Copy, Check, Printer, Download, Share2, Calculator } from 'lucide-react';
import { CalculationResult } from '../../types';
import { copyToClipboard } from '../../utils/formatters';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorName: string;
  result: CalculationResult;
  inputSummary?: string[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  calculatorName,
  result,
  inputSummary = []
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedText = `===========================================
  CALCULAX ACADEMIC REPORT
  ${calculatorName.toUpperCase()}
===========================================
Date: ${dateStr}

RESULT:
${result.primaryLabel}: ${result.primaryValue} ${result.primaryUnit || ''}
${result.statusMessage ? `Status: ${result.statusMessage}\n` : ''}
${result.stats && result.stats.length > 0 ? `METRICS:
${result.stats.map(s => `• ${s.label}: ${s.value} ${s.subtext ? `(${s.subtext})` : ''}`).join('\n')}
` : ''}
${result.breakdown && result.breakdown.length > 0 ? `CALCULATION BREAKDOWN:
${result.breakdown.map(b => `• ${b.step}: ${b.value} [${b.formula || b.description}]`).join('\n')}
` : ''}
===========================================
Verified by Calculax — Smart Calculators for Students
https://calculax.app
===========================================`;

  const handleCopy = () => {
    copyToClipboard(formattedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculax-${calculatorName.toLowerCase().replace(/\s+/g, '-')}-result.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Result Report"
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[90vh] print:max-h-full print:shadow-none print:border-none"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Export Calculation Summary
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Preview */}
        <div className="p-6 overflow-y-auto space-y-6 print:p-8">
          
          {/* Brand header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  Calculax
                </span>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Official Academic Report
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <div>{dateStr}</div>
              <div className="text-[10px] text-brand-600 dark:text-brand-400 font-medium">Verified Computation</div>
            </div>
          </div>

          {/* Calculator Title & Dominant Result */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-900/80 border border-brand-100 dark:border-slate-700/60 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {calculatorName}
            </span>
            <div className="mt-1 text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
              {result.primaryValue}
              {result.primaryUnit && (
                <span className="text-lg sm:text-xl font-medium text-slate-500 ml-1">
                  {result.primaryUnit}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
              {result.primaryLabel}
            </p>
            {result.statusMessage && (
              <p className="mt-2 text-xs text-slate-700 dark:text-slate-200 max-w-md mx-auto">
                {result.statusMessage}
              </p>
            )}
          </div>

          {/* Key Metrics */}
          {result.stats && result.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {result.stats.map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-mono">
                    {stat.value} {stat.unit || ''}
                  </div>
                  {stat.subtext && (
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {stat.subtext}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Breakdown summary */}
          {result.breakdown && result.breakdown.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Calculation Breakdown
              </h5>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                {result.breakdown.map((row, i) => (
                  <div key={i} className="p-2.5 flex items-center justify-between bg-white dark:bg-slate-900">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {row.step}
                    </div>
                    <div className="font-mono font-semibold text-brand-600 dark:text-brand-400">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer watermark */}
          <div className="text-center pt-2 text-[10px] text-slate-400">
            Generated with Calculax • Accurate Academic Planning Platform
          </div>

        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-2 print:hidden">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-500/20 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};
