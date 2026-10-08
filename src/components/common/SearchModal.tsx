import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { CALCULATOR_REGISTRY } from '../../data/calculatorRegistry';
import { DynamicIcon } from './DynamicIcon';
import { CalculatorMeta } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (calculatorId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search logic
  const filteredCalculators = CALCULATOR_REGISTRY.filter(calc => {
    if (!normalizedQuery) return true;
    const matchName = calc.name.toLowerCase().includes(normalizedQuery);
    const matchTagline = calc.tagline.toLowerCase().includes(normalizedQuery);
    const matchCategory = calc.category.toLowerCase().includes(normalizedQuery);
    const matchKeyword = calc.keywords.some(k => k.toLowerCase().includes(normalizedQuery));
    return matchName || matchTagline || matchCategory || matchKeyword;
  });

  const handleSelect = (calc: CalculatorMeta) => {
    onSelectCalculator(calc.id);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCalculators.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCalculators.length) % (filteredCalculators.length || 1));
    } else if (e.key === 'Enter' && filteredCalculators[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredCalculators[selectedIndex]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Calculator Search"
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[80vh] animate-slide-up"
      >
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search calculators (e.g., CGPA, MDCAT, NUST, Attendance, Marks)..."
            className="w-full bg-transparent pl-3 pr-8 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-400 shrink-0 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Popular:
            </span>
            {['CGPA', 'MDCAT Aggregate', 'Attendance', 'Merit NUST/FAST', 'Percentage'].map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filteredCalculators.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-400 opacity-60" />
              <p className="font-medium text-sm">No calculators match "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching by course, keyword, university name, or formula.</p>
            </div>
          ) : (
            filteredCalculators.map((calc, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={calc.id}
                  onClick={() => handleSelect(calc)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left group ${
                    isSelected
                      ? 'bg-brand-50/80 dark:bg-brand-950/50 border border-brand-200/80 dark:border-brand-800/50'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-brand-100 dark:group-hover:bg-slate-700 group-hover:text-brand-600'
                    }`}>
                      <DynamicIcon name={calc.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm truncate ${
                          isSelected ? 'text-brand-700 dark:text-brand-300' : 'text-slate-900 dark:text-white'
                        }`}>
                          {calc.name}
                        </span>
                        {calc.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                            {calc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {calc.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 pl-3 shrink-0">
                    <span className="text-[11px] font-medium uppercase tracking-wider hidden sm:inline text-slate-400">
                      {calc.category}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center">
                <CornerDownLeft className="w-3 h-3" />
              </kbd>
              to select
            </span>
          </div>
          <span>{filteredCalculators.length} available</span>
        </div>

      </div>
    </div>
  );
};
