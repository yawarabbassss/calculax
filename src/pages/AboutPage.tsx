import React from 'react';
import { Calculator, ShieldCheck, Sparkles, Cpu, BookOpen, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fade-in">
      
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200/80 dark:border-brand-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Vision & Philosophy</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About Calculax
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Calculax is designed to make important academic and student calculations simple, fast, and completely understandable.
        </p>

        <p className="text-sm font-bold text-brand-600 dark:text-brand-400 italic">
          "We don't just give you a number. We show you how it was calculated."
        </p>
      </div>

      {/* Core Principle Callout */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
        <h3 className="text-2xl font-black tracking-tight">
          Fast input → accurate calculation → clear result.
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Students face pivotal mathematical questions every semester: <em>"What GPA do I need to stay off probation?"</em>, <em>"What is my MDCAT aggregate for King Edward or Army Medical College?"</em>, <em>"How many lectures can I miss before falling below 75% attendance?"</em>, or <em>"What score must I get on the final exam to keep my A grade?"</em>
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          Traditional calculator websites are cluttered with ads, confusing inputs, broken formulas, and zero explanations. Calculax was engineered from the ground up to feel like a modern, trustworthy SaaS platform inspired by Notion, Linear, Apple, and Stripe.
        </p>
      </div>

      {/* Engineering Pillars */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Our Architectural Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Deterministic & Unit-Tested</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every formula is isolated in pure TypeScript modules with automated test suites verifying boundary cases, zero divisors, negative values, and university-specific rounding standards.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">100% Privacy by Design</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Your grades, test scores, and calculation history never leave your browser. Zero tracking, zero third-party telemetry, and no account required.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Institutional Configuration Engine</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We separate university policies into centralized configurations: HEC Pakistan, PM&DC, NUST, FAST-NUCES, UET, LUMS, and COMSATS rules are easily maintained and updated per academic cycle.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Full Arithmetic Transparency</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every calculator features an interactive formula breakdown table with step-by-step substitutions so students can learn and verify the math.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Ready to plan your academic trajectory?
        </h3>
        <button
          onClick={() => onNavigate('/calculators')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 shadow-sm shadow-brand-500/20 transition-all"
        >
          <span>Explore All Calculators</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
