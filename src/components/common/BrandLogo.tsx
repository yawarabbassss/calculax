import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon SVG */}
      <div className={`${iconSizes[size]} bg-gradient-to-br from-brand-600 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-brand-500/25 shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform`}>
        <svg viewBox="0 0 48 48" className="w-[85%] h-[85%]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 16C32 13 28 11.5 23.5 11.5C16.5 11.5 12 16.8 12 24C12 31.2 16.5 36.5 23.5 36.5C28 36.5 32 35 34 32" stroke="#ffffff" stroke-width="4.2" stroke-linecap="round"/>
          <line x1="21" y1="21" x2="33" y2="21" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="21" y1="27" x2="33" y2="27" stroke="#93c5fd" stroke-width="3.5" stroke-linecap="round"/>
          <circle cx="33.5" cy="14.5" r="2.2" fill="#93c5fd"/>
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${textSizes[size]}`}>
            Calcula<span className="text-brand-600 dark:text-brand-400">x</span>
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="hidden sm:block text-[10.5px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5 leading-none">
            Smart Calculators for Students
          </span>
        )}
      </div>
    </div>
  );
};
