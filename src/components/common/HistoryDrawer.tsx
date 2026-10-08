import React from 'react';
import { X, Trash2, Copy, Check, Clock, ArrowUpRight, History as HistoryIcon } from 'lucide-react';
import { useHistory } from '../../context/HistoryContext';
import { copyToClipboard } from '../../utils/formatters';

interface HistoryDrawerProps {
  onNavigateToCalculator: (calculatorId: string, snapshot?: Record<string, any>) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ onNavigateToCalculator }) => {
  const { history, removeHistoryItem, clearHistory, isDrawerOpen, setIsDrawerOpen } = useHistory();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const handleCopy = (item: any) => {
    const text = `Calculax Summary: ${item.calculatorName}\nResult: ${item.primaryResult} (${item.primaryLabel})\nDetails: ${item.summary}\nCalculated at: ${new Date(item.timestamp).toLocaleString()}`;
    copyToClipboard(text).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleOpenCalc = (item: any) => {
    setIsDrawerOpen(false);
    onNavigateToCalculator(item.calculatorId, item.inputSnapshot);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <HistoryIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Calculation History
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Stored locally on your device
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="p-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1"
                  title="Clear All History"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <div className="py-16 text-center text-slate-500">
                <Clock className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
                <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">No calculations yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                  Run a calculation in any calculator and your verified results will appear here automatically.
                </p>
              </div>
            ) : (
              history.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 dark:bg-[#111928] border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.calculatorName}
                      </span>
                      <div className="mt-2 font-mono font-bold text-lg text-slate-900 dark:text-white">
                        {item.primaryResult}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.primaryLabel}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(item)}
                        className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                        title="Copy Summary"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => removeHistoryItem(item.id)}
                        className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete this record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {item.summary && (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 bg-white dark:bg-slate-900/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800/60">
                      {item.summary}
                    </p>
                  )}

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                    
                    <button
                      onClick={() => handleOpenCalc(item)}
                      className="flex items-center gap-1 text-brand-600 dark:text-brand-400 font-semibold hover:underline"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 text-center">
            {history.length} {history.length === 1 ? 'record' : 'records'} saved in local browser storage
          </div>

        </div>
      </div>
    </div>
  );
};
