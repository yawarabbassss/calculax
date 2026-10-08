import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  HeartPulse, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Clock, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  BookOpen,
  HelpCircle,
  History,
  Layers
} from 'lucide-react';
import { CALCULATOR_REGISTRY, getPopularCalculators } from '../data/calculatorRegistry';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { useHistory } from '../context/HistoryContext';
import { CalculatorCategory } from '../types';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickSearch, setQuickSearch] = useState('');
  const { history, setIsDrawerOpen } = useHistory();

  const popularCalculators = getPopularCalculators();

  const categories: { id: string; label: string; icon: any }[] = [
    { id: 'all', label: 'All Categories', icon: Layers },
    { id: 'academic', label: 'Academic & GPA', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions & MDCAT', icon: Building2 },
    { id: 'student-life', label: 'Student Life', icon: CheckCircle2 },
    { id: 'general', label: 'General & Tools', icon: Sliders },
  ];

  const filteredCalculators = CALCULATOR_REGISTRY.filter(calc => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const matchesSearch = !quickSearch || 
      calc.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
      calc.tagline.toLowerCase().includes(quickSearch.toLowerCase()) ||
      calc.keywords.some(k => k.toLowerCase().includes(quickSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredUniversities = [
    { name: 'NUST Islamabad', formula: '75% NET + 15% FSc + 10% Matric', id: 'merit-calculator' },
    { name: 'FAST-NUCES', formula: '50% NU Test + 50% FSc', id: 'merit-calculator' },
    { name: 'PM&DC / UHS MDCAT', formula: '50% MDCAT + 40% FSc + 10% Matric', id: 'mdcat-aggregate' },
    { name: 'UET Lahore (ECAT)', formula: '33% ECAT + 50% FSc + 17% Matric', id: 'merit-calculator' },
    { name: 'NUMS Army Medical', formula: '50% NUMS + 40% FSc + 10% Matric', id: 'mdcat-aggregate' },
    { name: 'GIKI Topi', formula: '85% Test + 10% FSc + 5% Matric', id: 'merit-calculator' }
  ];

  return (
    <div className="space-y-16 pb-12 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-12 text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-[600px] h-[300px] bg-gradient-to-r from-brand-500/10 via-blue-500/5 to-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fast, Private & 100% Client-Side Academic Engine</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Calculate Anything <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 dark:from-brand-400 dark:via-blue-400 dark:to-indigo-300">Academic.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            CGPA, GPA, percentages, admission merit, MDCAT aggregate, attendance and more — all in one clean, trustworthy platform.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center shadow-premium dark:shadow-premium-dark rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={quickSearch}
                onChange={e => setQuickSearch(e.target.value)}
                placeholder="What do you want to calculate? (e.g. CGPA, MDCAT aggregate, attendance...)"
                className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                onClick={onOpenSearch}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">Try searching:</span>
              {[
                { label: 'Calculate my CGPA', id: 'cgpa-calculator' },
                { label: 'MDCAT aggregate', id: 'mdcat-aggregate' },
                { label: 'Semester GPA', id: 'gpa-calculator' },
                { label: 'Required marks', id: 'required-marks' },
                { label: 'Attendance %', id: 'attendance-calculator' }
              ].map(tag => (
                <button
                  key={tag.label}
                  onClick={() => onNavigate(`/calculators/${tag.id}`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Popular Calculators Grid */}
      {!quickSearch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Popular Calculators
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Most frequently used calculation engines by students
              </p>
            </div>

            <button
              onClick={() => onNavigate('/calculators')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>View All 14 Calculators</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {popularCalculators.map(calc => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.id}`)}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-premium dark:shadow-premium-dark text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <DynamicIcon name={calc.icon} className="w-5 h-5" />
                    </div>

                    {calc.badge && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {calc.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {calc.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {calc.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  <span>Calculate Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Category Tabs & Full Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-10">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                {quickSearch ? `Search Results for "${quickSearch}"` : 'Browse by Category'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Explore dedicated tools for every stage of your academic journey
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
              {categories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCalculators.map(calc => (
              <button
                key={calc.id}
                onClick={() => onNavigate(`/calculators/${calc.id}`)}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 text-left transition-all hover:shadow-subtle flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <DynamicIcon name={calc.icon} className="w-4 h-4" />
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {calc.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {calc.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="uppercase tracking-wider font-medium">{calc.category}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform group-hover:text-brand-600" />
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* University Admission Presets Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl overflow-hidden relative">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-400/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>Official Pakistan University Formulas</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Pre-Configured Admission Formulas
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Don't guess complex percentage weightages. Calculax comes with verified admission weightages for top Pakistani institutions:
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative z-10">
            {featuredUniversities.map((uni, i) => (
              <button
                key={i}
                onClick={() => onNavigate(`/calculators/${uni.id}`)}
                className="p-3.5 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-white">{uni.name}</div>
                  <div className="text-[11px] text-brand-200 mt-0.5">{uni.formula}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principle / Trust Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-premium dark:shadow-premium-dark">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              We don't just give you a number. We show you how it was calculated.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Built on three foundational principles to eliminate academic uncertainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Deterministic Accuracy</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pure TypeScript mathematical algorithms independently verified against HEC and PM&DC criteria. Never produces NaN or broken states.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transparent Breakdowns</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every calculation shows full arithmetic steps, quality points, and formulas so you can understand your academic trajectory.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/50 border border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Private & Client-Side</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                No accounts, no ads, and no tracking. Your marks and history stay strictly stored on your own local device.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
