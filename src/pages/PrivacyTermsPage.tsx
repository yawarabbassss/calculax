import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

export const PrivacyTermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fade-in">
      
      <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust & Transparency</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy & Terms of Service
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Calculax operates on a strict zero-data collection architecture.
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        {/* Privacy Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <Lock className="w-4 h-4 text-brand-600" />
            <h2>1. Privacy Commitment & Local Storage</h2>
          </div>
          <p>
            Calculax does not require account creation, sign-in, or personal identification. All calculation inputs (grades, subject names, exam marks, and attendance counts) are executed client-side in your web browser.
          </p>
          <p>
            When you perform calculations, history records are stored exclusively in your browser's local storage (<code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">localStorage</code>) to enable quick reference. No data is sent to external servers or third parties.
          </p>
        </section>

        {/* Accuracy & Terms */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h2>2. Educational Information Disclaimer</h2>
          </div>
          <p>
            Calculax is provided as an academic utility to assist students in evaluating grades, attendance buffers, and admission projections. While every formula is tested against official guidelines (HEC, PM&DC, NUST, FAST-NUCES, UET, etc.), university admission criteria, quota rules, and merit cut-offs can change between admission cycles.
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
            <strong>Always Verify:</strong> Official merit lists, admissions eligibility, and graduation clearance are governed exclusively by your respective university registrar or testing agency.
          </div>
        </section>

        {/* Open Configuration */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3. Open Formula Updates
          </h2>
          <p>
            We regularly review provincial and institutional policy updates. If an institution updates its grading scale or entry test weightages, our centralized registry is updated to reflect current standards.
          </p>
        </section>

      </div>

    </div>
  );
};
