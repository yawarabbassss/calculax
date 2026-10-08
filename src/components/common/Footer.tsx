import React from 'react';
import { Calculator, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { CALCULATOR_REGISTRY } from '../../data/calculatorRegistry';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const academicCalcs = CALCULATOR_REGISTRY.filter(c => c.category === 'academic').slice(0, 5);
  const admissionCalcs = CALCULATOR_REGISTRY.filter(c => c.category === 'admissions').slice(0, 5);
  const studentLifeCalcs = CALCULATOR_REGISTRY.filter(c => c.category === 'student-life' || c.category === 'general').slice(0, 5);

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-slate-50 dark:border-slate-800/80 dark:bg-[#070b13] transition-colors text-slate-600 dark:text-slate-400 text-sm">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Deterministic & 100% Private</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">All calculations are processed locally in your browser. Zero tracking, no sign-up required.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
              Pakistan University Presets (HEC, NUST, FAST, UHS, UET)
            </span>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              The premier all-in-one calculation platform designed for students. Fast input, mathematically accurate computation, and transparent formula explanations.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 italic">
              "Calculate. Understand. Plan."
            </p>
          </div>

          {/* Academic Calcs */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white">
              Academic
            </h4>
            <ul className="space-y-2 text-xs">
              {academicCalcs.map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate(`/calculators/${c.id}`)}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Admission Calcs */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white">
              Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              {admissionCalcs.map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate(`/calculators/${c.id}`)}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs tracking-wider uppercase text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  About Calculax
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/methodology')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Formulas & Methodology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-terms')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Privacy & Terms
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/calculators')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Calculator Directory
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Admission Trust Notice */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/60 text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed">
          <p>
            <strong className="text-slate-700 dark:text-slate-400">Institutional Disclaimer:</strong> Calculax provides academic and admission calculation utilities for educational and informational planning purposes. Admission weightages, eligibility cutoffs, and grading policies are determined by respective universities (PM&DC, HEC, PEC, NUST, UHS, FAST-NUCES, UET, etc.) and may be updated periodically. Always verify current criteria against official prospectus announcements.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} Calculax. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/privacy-terms')} className="hover:underline">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('/privacy-terms')} className="hover:underline">Terms of Use</button>
            <span>•</span>
            <button onClick={() => onNavigate('/methodology')} className="hover:underline">Academic Guidelines</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
