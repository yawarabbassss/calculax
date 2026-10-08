export type CalculatorCategory = 'academic' | 'admissions' | 'student-life' | 'general';

export interface CalculatorMeta {
  id: string;
  name: string;
  shortName?: string;
  category: CalculatorCategory;
  tagline: string;
  description: string;
  icon: string; // Lucide icon name
  badge?: string;
  popular?: boolean;
  keywords: string[];
  formulaSummary: string;
  seoTitle: string;
  seoDescription: string;
}

export interface CalculationResult {
  primaryValue: string | number;
  primaryLabel: string;
  primaryUnit?: string;
  statusType?: 'success' | 'warning' | 'info' | 'error' | 'neutral';
  statusMessage?: string;
  stats?: {
    label: string;
    value: string | number;
    unit?: string;
    subtext?: string;
  }[];
  breakdown?: {
    step: string;
    description: string;
    formula?: string;
    value: string | number;
    details?: string;
  }[];
  explanation?: string[];
  notes?: string[];
  disclaimer?: string;
}

export interface CalculationHistoryItem {
  id: string;
  calculatorId: string;
  calculatorName: string;
  category: CalculatorCategory;
  timestamp: number;
  summary: string;
  primaryResult: string;
  primaryLabel: string;
  inputSnapshot: Record<string, any>;
}

// Grading Scales
export interface GradeItem {
  letter: string;
  gradePoint: number;
  minPercentage?: number;
  maxPercentage?: number;
  description?: string;
}

export interface GradingScale {
  id: string;
  name: string;
  institution?: string;
  maxGpa: number;
  grades: GradeItem[];
  notes?: string;
}

// University Admission Formulas
export interface AdmissionWeightComponent {
  id: string;
  name: string;
  defaultWeight: number; // percentage (e.g., 50 for 50%)
  minWeight?: number;
  maxWeight?: number;
  maxMarksDefault?: number;
  description?: string;
  optional?: boolean;
}

export interface UniversityAdmissionConfig {
  id: string;
  name: string;
  shortName: string;
  city?: string;
  category: 'medical' | 'engineering' | 'general' | 'business' | 'it';
  effectiveYear: string;
  degreeType: string;
  components: AdmissionWeightComponent[];
  formulaDescription: string;
  sourceUrl?: string;
  notes?: string[];
}
