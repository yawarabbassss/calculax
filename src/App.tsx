import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { HistoryProvider } from './context/HistoryContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HistoryDrawer } from './components/common/HistoryDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { AllCalculatorsPage } from './pages/AllCalculatorsPage';
import { CalculatorDetailPage } from './pages/CalculatorDetailPage';
import { AboutPage } from './pages/AboutPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { PrivacyTermsPage } from './pages/PrivacyTermsPage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeSnapshot, setActiveSnapshot] = useState<any>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setActiveSnapshot(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, snapshot?: any) => {
    if (path !== currentPath || snapshot) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      setActiveSnapshot(snapshot || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route parser
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
      );
    }

    if (currentPath === '/calculators') {
      return <AllCalculatorsPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/category/')) {
      const category = currentPath.replace('/category/', '') as any;
      return <AllCalculatorsPage initialCategory={category} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/calculators/')) {
      const calcId = currentPath.replace('/calculators/', '');
      return (
        <CalculatorDetailPage
          calculatorId={calcId}
          onNavigate={navigate}
          snapshot={activeSnapshot}
        />
      );
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/methodology') {
      return <MethodologyPage />;
    }

    if (currentPath === '/privacy-terms') {
      return <PrivacyTermsPage />;
    }

    // Fallback to Home
    return (
      <HomePage
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b13] dark:text-slate-100 font-sans transition-colors selection:bg-brand-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentRoute={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCalculator={id => navigate(`/calculators/${id}`)}
      />

      {/* Slide-out Calculation History */}
      <HistoryDrawer
        onNavigateToCalculator={(id, snapshot) => navigate(`/calculators/${id}`, snapshot)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <AppContent />
      </HistoryProvider>
    </ThemeProvider>
  );
}
