import React, { createContext, useContext, useEffect, useState } from 'react';
import { CalculationHistoryItem } from '../types';

interface HistoryContextType {
  history: CalculationHistoryItem[];
  addHistoryItem: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);
const HISTORY_STORAGE_KEY = 'calculax_calculation_history';

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.warn('Could not save history to localStorage', e);
    }
  }, [history]);

  const addHistoryItem = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now()
    };

    setHistory(prev => {
      // Keep most recent 50 calculations, prevent identical consecutive entries
      const filtered = prev.filter(
        h => !(h.calculatorId === item.calculatorId && h.primaryResult === item.primaryResult && h.summary === item.summary)
      );
      return [newItem, ...filtered].slice(0, 50);
    });
  };

  const removeHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addHistoryItem,
        removeHistoryItem,
        clearHistory,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) throw new Error('useHistory must be used within a HistoryProvider');
  return context;
}
