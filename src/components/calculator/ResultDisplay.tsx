import React, { useEffect, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  XCircle,
  TrendingUp,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CalculationResult } from '../../types';
import { copyToClipboard } from '../../utils/formatters';

interface ResultDisplayProps {
  result: CalculationResult;
  calculatorTitle: string;
  onOpenExport?: () => void;
  triggerConfetti?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  calculatorTitle,
  onOpenExport,
  triggerConfetti = false
}) => {
  const [copied, setCopied] = React.useState(false);
  const prevValueRef = useRef<string | number>(result.primaryValue);

  // Trigger celebration confetti on stellar performance
  useEffect(() => {
    const isNew = prevValueRef.current !== result.primaryValue;
    prevValueRef.current = result.primaryValue;

    if (isNew && triggerConfetti && result.statusType === 'success') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Ignore in testing environments
      }
    }
  }, [result.primaryValue, triggerConfetti, result.statusType]);

  const handleCopy = () => {
    const summaryText = `${calculatorTitle}: ${result.primaryValue} ${result.primaryUnit || ''} (${result.primaryLabel})\n${result.statusMessage || ''}\nVerified with Calculax`;
    copyToClipboard(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getStatusIcon = () => {
    switch (result.statusType) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500 shrink-0" />;
    }
  };

  const getStatusBg = () => {
    switch (result.statusType) {
      case 'success':
        return 'bg-emerald-50/80 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60';
      case 'warning':
        return 'bg-amber-50/80 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60';
      case 'error':
        return 'bg-rose-50/80 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200/80 dark:border-rose-800/60';
      case 'info':
      default:
        return 'bg-blue-50/80 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/60';
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Dominant Hero Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white to-slate-50/70 dark:from-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-premium dark:shadow-premium-dark overflow-hidden transition-all">
        
        {/* Subtle accent glow top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-blue-600 to-indigo-500" />

        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <TrendingUp className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{result.primaryLabel}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Copy Result"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {onOpenExport && (
              <button
                onClick={onOpenExport}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Export / Print Summary"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Big Calculated Number */}
        <div className="my-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight font-mono font-feature-settings-tnum">
              {result.primaryValue}
            </span>
            {result.primaryUnit && (
              <span className="text-lg sm:text-xl font-medium text-slate-400 dark:text-slate-500">
                {result.primaryUnit}
              </span>
            )}
          </div>
        </div>

        {/* Status Message / Notification Banner */}
        {result.statusMessage && (
          <div className={`mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs leading-relaxed ${getStatusBg()}`}>
            {getStatusIcon()}
            <span className="font-medium">{result.statusMessage}</span>
          </div>
        )}

      </div>

      {/* Secondary Metrics Stats Grid */}
      {result.stats && result.stats.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {result.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1"
            >
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {stat.label}
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {stat.value} {stat.unit && <span className="text-xs text-slate-400 font-normal">{stat.unit}</span>}
              </div>
              {stat.subtext && (
                <div className="text-[11px] text-slate-400 dark:text-slate-400 leading-tight">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
