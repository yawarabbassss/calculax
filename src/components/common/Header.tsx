import React, { useState } from 'react';
import { 
  Calculator, 
  Search, 
  History, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  GraduationCap, 
  Compass, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useHistory } from '../../context/HistoryContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { history, setIsDrawerOpen } = useHistory();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'All Calculators', route: '/calculators' },
    { label: 'Academic', route: '/category/academic' },
    { label: 'Admissions', route: '/category/admissions' },
    { label: 'Student Life', route: '/category/student-life' },
    { label: 'About', route: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              onNavigate('/');
              setMobileMenuOpen(false);
            }}
            className="group focus:outline-none"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navItems.map(item => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-brand-600 dark:bg-slate-800/70 dark:text-brand-400 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-100/80 hover:bg-slate-200/70 text-slate-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            title="Search Calculators (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors" />
            <span className="hidden sm:inline font-normal text-xs text-slate-500 dark:text-slate-400">Search calculators...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
              Ctrl K
            </kbd>
          </button>

          {/* History Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            title="Calculation History"
            aria-label="View Calculation History"
          >
            <History className="w-5 h-5" />
            {history.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center animate-fade-in">
                {history.length > 9 ? '9+' : history.length}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            title={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle Theme"
          >
            {effectiveTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60 transition-colors"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <button
              onClick={() => {
                onNavigate('/calculators/cgpa-calculator');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <GraduationCap className="w-4 h-4 text-brand-600" />
              <span>CGPA Calculator</span>
            </button>
            <button
              onClick={() => {
                onNavigate('/calculators/mdcat-aggregate');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>MDCAT Aggregate</span>
            </button>
            <button
              onClick={() => {
                onNavigate('/calculators/merit-calculator');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Merit Calculator</span>
            </button>
            <button
              onClick={() => {
                onNavigate('/calculators/attendance-calculator');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200"
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Attendance</span>
            </button>
          </div>

          <div className="space-y-1 pt-1">
            {navItems.map(item => (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentRoute === item.route
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
