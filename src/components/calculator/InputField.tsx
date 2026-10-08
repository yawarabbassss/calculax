import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sublabel?: string;
  hint?: string;
  error?: string;
  prefix?: string;
  suffix?: string;
  containerClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  sublabel,
  hint,
  error,
  prefix,
  suffix,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
        {sublabel && (
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
            {sublabel}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-2xs">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
            {prefix}
          </div>
        )}

        <input
          id={inputId}
          {...props}
          className={`w-full block rounded-xl text-sm transition-all focus:outline-none focus:ring-2 disabled:bg-slate-100 disabled:dark:bg-slate-900 disabled:cursor-not-allowed ${
            prefix ? 'pl-8' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'} py-2.5 ${
            error
              ? 'border-rose-300 dark:border-rose-700 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-100 focus:ring-rose-500/40 focus:border-rose-500'
              : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder-slate-400 focus:border-brand-500 focus:ring-brand-500/30'
          } ${className}`}
        />

        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 text-xs font-medium">
            {suffix}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
          <HelpCircle className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{hint}</span>
        </p>
      ) : null}
    </div>
  );
};
