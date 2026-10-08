import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  subtext?: string;
  group?: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  sublabel?: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  containerClassName?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  sublabel,
  options,
  error,
  hint,
  containerClassName = '',
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  // Group options if applicable
  const groups: { [key: string]: SelectOption[] } = {};
  const ungrouped: SelectOption[] = [];

  options.forEach(opt => {
    if (opt.group) {
      if (!groups[opt.group]) groups[opt.group] = [];
      groups[opt.group].push(opt);
    } else {
      ungrouped.push(opt);
    }
  });

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={selectId} className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
        {sublabel && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
            {sublabel}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-2xs">
        <select
          id={selectId}
          {...props}
          className={`w-full appearance-none block rounded-xl text-sm transition-all focus:outline-none focus:ring-2 pl-3.5 pr-9 py-2.5 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white cursor-pointer ${
            error
              ? 'border-rose-300 dark:border-rose-700 bg-rose-50/40 focus:ring-rose-500/40'
              : 'border border-slate-200 dark:border-slate-800 focus:border-brand-500 focus:ring-brand-500/30'
          } ${className}`}
        >
          {ungrouped.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label} {opt.subtext ? `(${opt.subtext})` : ''}
            </option>
          ))}

          {Object.keys(groups).map(grpName => (
            <optgroup key={grpName} label={grpName}>
              {groups[grpName].map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} {opt.subtext ? `(${opt.subtext})` : ''}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
          {hint}
        </p>
      ) : null}
    </div>
  );
};
