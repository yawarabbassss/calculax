import React, { useState } from 'react';
import { Search, Sparkles, Filter, ArrowRight, Layers } from 'lucide-react';
import { CALCULATOR_REGISTRY } from '../data/calculatorRegistry';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { CalculatorCategory } from '../types';

interface AllCalculatorsPageProps {
  initialCategory?: CalculatorCategory | 'all';
  onNavigate: (route: string) => void;
}

export const AllCalculatorsPage: React.FC<AllCalculatorsPageProps> = ({
  initialCategory = 'all',
  onNavigate
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Calculators', count: CALCULATOR_REGISTRY.length },
    { id: 'academic', label: 'Academic & GPA', count: CALCULATOR_REGISTRY.filter(c => c.category === 'academic').length },
    { id: 'admissions', label: 'Admissions & MDCAT', count: CALCULATOR_REGISTRY.filter(c => c.category === 'admissions').length },
    { id: 'student-life', label: 'Student Life', count: CALCULATOR_REGISTRY.filter(c => c.category === 'student-life').length },
    { id: 'general', label: 'General & Tools', count: CALCULATOR_REGISTRY.filter(c => c.category === 'general').length },
  ];

  const popularTags = ['GPA', 'CGPA', 'MDCAT', 'NUST', 'FAST', 'Attendance', 'Marks', 'HEC', 'Scale'];

  const filteredCalculators = CALCULATOR_REGISTRY.filter(calc => {
    const matchesCat = category === 'all' || calc.category === category;
    const matchesTag = !selectedTag || calc.keywords.some(k => k.toLowerCase().includes(selectedTag.toLowerCase()));
    const matchesSearch = !search || 
      calc.name.toLowerCase().includes(search.toLowerCase()) ||
      calc.tagline.toLowerCase().includes(search.toLowerCase()) ||
      calc.description.toLowerCase().includes(search.toLowerCase()) ||
      calc.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));

    return matchesCat && matchesTag && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Calculator Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          All Student & Academic Calculators
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Browse our complete suite of academic, admission, attendance, and student productivity calculators.
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by name, keyword, or university..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  category === cat.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  category === cat.id ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-900' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Quick Tag Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 text-xs">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Tags:
          </span>
          {popularTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-lg font-medium border transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              #{tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-rose-600 hover:underline font-medium"
            >
              Clear Tag
            </button>
          )}
        </div>
      </div>

      {/* Calculators Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCalculators.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No calculators found</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing your search query or selecting a different category.</p>
          </div>
        ) : (
          filteredCalculators.map(calc => (
            <button
              key={calc.id}
              onClick={() => onNavigate(`/calculators/${calc.id}`)}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-premium dark:shadow-premium-dark text-left transition-all hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <DynamicIcon name={calc.icon} className="w-5 h-5" />
                  </div>

                  {calc.badge && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {calc.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                <span className="text-[11px] uppercase tracking-wider text-slate-400">{calc.category}</span>
                <div className="flex items-center gap-1">
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))
        )}
      </div>

    </div>
  );
};
