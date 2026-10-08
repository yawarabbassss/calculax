import { GradingScale } from '../types';

export const GRADING_SCALES: GradingScale[] = [
  {
    id: 'standard-4.0',
    name: 'Standard 4.0 Scale',
    institution: 'Standard North American / Global',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, minPercentage: 90, description: 'Outstanding (90%+)' },
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Excellent (85-89%)' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Very Good (80-84%)' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Good (75-79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Above Average (70-74%)' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Average (65-69%)' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory (60-64%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Pass (55-59%)' },
      { letter: 'C-', gradePoint: 1.7, minPercentage: 50, description: 'Marginal Pass (50-54%)' },
      { letter: 'D+', gradePoint: 1.3, minPercentage: 45, description: 'Poor (45-49%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 40, description: 'Barely Passing (40-44%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 40%)' },
    ],
    notes: 'Standard 4.0 scale widely used by international universities.'
  },
  {
    id: 'hec-pakistan',
    name: 'HEC Pakistan Standard Scale',
    institution: 'Higher Education Commission Pakistan',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Exceptional (85% and above)' },
      { letter: 'A-', gradePoint: 3.66, minPercentage: 80, description: 'Excellent (80% - 84%)' },
      { letter: 'B+', gradePoint: 3.33, minPercentage: 75, description: 'Very Good (75% - 79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 71, description: 'Good (71% - 74%)' },
      { letter: 'B-', gradePoint: 2.66, minPercentage: 68, description: 'Fair (68% - 70%)' },
      { letter: 'C+', gradePoint: 2.33, minPercentage: 64, description: 'Satisfactory (64% - 67%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 60, description: 'Pass (60% - 63%)' },
      { letter: 'C-', gradePoint: 1.66, minPercentage: 57, description: 'Marginal (57% - 59%)' },
      { letter: 'D+', gradePoint: 1.33, minPercentage: 54, description: 'Low Pass (54% - 56%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Minimum Pass (50% - 53%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 50%)' },
    ],
    notes: 'Official guidelines issued by HEC Pakistan for uniform semester systems.'
  },
  {
    id: 'nust',
    name: 'NUST Islamabad Scale',
    institution: 'National University of Sciences & Technology',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 80, description: 'High Distinction (80%+)' },
      { letter: 'B+', gradePoint: 3.5, minPercentage: 75, description: 'Distinction (75-79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Very Good (70-74%)' },
      { letter: 'C+', gradePoint: 2.5, minPercentage: 65, description: 'Good (65-69%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 60, description: 'Satisfactory (60-64%)' },
      { letter: 'D+', gradePoint: 1.5, minPercentage: 55, description: 'Pass (55-59%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass (50-54%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 50%)' },
    ],
    notes: 'Standard grading system followed at NUST undergraduate & postgraduate programs.'
  },
  {
    id: 'fast-nuces',
    name: 'FAST-NUCES Scale',
    institution: 'National University of Computer & Emerging Sciences',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, minPercentage: 90, description: 'Outstanding (90%+)' },
      { letter: 'A', gradePoint: 4.0, minPercentage: 86, description: 'Excellent (86-89%)' },
      { letter: 'A-', gradePoint: 3.67, minPercentage: 82, description: 'Very Good (82-85%)' },
      { letter: 'B+', gradePoint: 3.33, minPercentage: 78, description: 'Good (78-81%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 74, description: 'Above Average (74-77%)' },
      { letter: 'B-', gradePoint: 2.67, minPercentage: 70, description: 'Average (70-73%)' },
      { letter: 'C+', gradePoint: 2.33, minPercentage: 66, description: 'Below Average (66-69%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 62, description: 'Satisfactory (62-65%)' },
      { letter: 'C-', gradePoint: 1.67, minPercentage: 58, description: 'Pass (58-61%)' },
      { letter: 'D+', gradePoint: 1.33, minPercentage: 54, description: 'Barely Pass (54-57%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass (50-53%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 50%)' },
    ],
    notes: 'Relative or absolute scale applied at FAST campuses (Islamabad, Lahore, Karachi, Peshawar, CFD).'
  },
  {
    id: 'lums',
    name: 'LUMS Scale',
    institution: 'Lahore University of Management Sciences',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, description: 'Exceptional (4.0)' },
      { letter: 'A', gradePoint: 4.0, description: 'Excellent (4.0)' },
      { letter: 'A-', gradePoint: 3.7, description: 'Very Good (3.7)' },
      { letter: 'B+', gradePoint: 3.3, description: 'Good (3.3)' },
      { letter: 'B', gradePoint: 3.0, description: 'Average / Competent (3.0)' },
      { letter: 'B-', gradePoint: 2.7, description: 'Fair (2.7)' },
      { letter: 'C+', gradePoint: 2.3, description: 'Satisfactory (2.3)' },
      { letter: 'C', gradePoint: 2.0, description: 'Marginal (2.0)' },
      { letter: 'C-', gradePoint: 1.7, description: 'Deficient (1.7)' },
      { letter: 'D+', gradePoint: 1.3, description: 'Poor (1.3)' },
      { letter: 'D', gradePoint: 1.0, description: 'Minimum Passing (1.0)' },
      { letter: 'F', gradePoint: 0.0, description: 'Failing (0.0)' },
    ],
    notes: 'Standard 4.0 relative grading scale at LUMS.'
  },
  {
    id: 'uet',
    name: 'UET Lahore Scale',
    institution: 'University of Engineering & Technology Lahore',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Exceptional (85%+)' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Excellent (80-84%)' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Very Good (75-79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Good (70-74%)' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Fair (65-69%)' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory (60-64%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Passing (55-59%)' },
      { letter: 'C-', gradePoint: 1.7, minPercentage: 50, description: 'Low Pass (50-54%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 40, description: 'Bare Minimum (40-49%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 40%)' },
    ],
    notes: 'Semester grading scale for UET Engineering departments.'
  },
  {
    id: 'comsats',
    name: 'COMSATS Scale',
    institution: 'COMSATS University Islamabad',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Excellent (85%+)' },
      { letter: 'A-', gradePoint: 3.66, minPercentage: 80, description: 'Very Good (80-84%)' },
      { letter: 'B+', gradePoint: 3.33, minPercentage: 75, description: 'Good (75-79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 71, description: 'Above Average (71-74%)' },
      { letter: 'B-', gradePoint: 2.66, minPercentage: 68, description: 'Average (68-70%)' },
      { letter: 'C+', gradePoint: 2.33, minPercentage: 64, description: 'Satisfactory (64-67%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 60, description: 'Pass (60-63%)' },
      { letter: 'C-', gradePoint: 1.66, minPercentage: 57, description: 'Marginal Pass (57-59%)' },
      { letter: 'D+', gradePoint: 1.33, minPercentage: 54, description: 'Deficient (54-56%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Minimum Pass (50-53%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 50%)' },
    ],
    notes: 'Official semester grading policy followed across COMSATS campuses.'
  },
  {
    id: 'pu-punjab',
    name: 'Punjab University (PU) Scale',
    institution: 'University of the Punjab, Lahore',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'High Distinction (85%+)' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Distinction (80-84%)' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Very Good (75-79%)' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Good (70-74%)' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Fair (65-69%)' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory (60-64%)' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Pass (55-59%)' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass (50-54%)' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail (Below 50%)' },
    ],
    notes: 'PU semester system grading framework.'
  }
];

export function getGradingScale(id: string): GradingScale {
  const found = GRADING_SCALES.find(s => s.id === id);
  return found || GRADING_SCALES[0];
}

/**
 * Universal Grade Point Resolver with fallbacks
 */
export function getGradePointFromLetter(scale: GradingScale, letterOrNumber: string | number): number {
  if (typeof letterOrNumber === 'number') {
    return isNaN(letterOrNumber) ? 0 : Math.min(scale.maxGpa, Math.max(0, letterOrNumber));
  }

  const clean = String(letterOrNumber).trim().toUpperCase();
  
  // Check if string is direct number like "3.66" or "4.0"
  const directNum = parseFloat(clean);
  if (!isNaN(directNum) && (clean === directNum.toString() || clean.match(/^\d+(\.\d+)?$/))) {
    return Math.min(scale.maxGpa, Math.max(0, directNum));
  }

  // Exact match in target scale
  const directMatch = scale.grades.find(g => g.letter.toUpperCase() === clean);
  if (directMatch) return directMatch.gradePoint;

  // Generalized fallback map for cross-scale compatibility
  const fallbackMap: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.67,
    'B+': 3.33,
    'B': 3.0,
    'B-': 2.67,
    'C+': 2.33,
    'C': 2.0,
    'C-': 1.67,
    'D+': 1.33,
    'D': 1.0,
    'F': 0.0
  };

  if (clean in fallbackMap) {
    const targetGp = fallbackMap[clean];
    let closest = scale.grades[0];
    let minDiff = Math.abs(closest.gradePoint - targetGp);
    for (const g of scale.grades) {
      const diff = Math.abs(g.gradePoint - targetGp);
      if (diff < minDiff) {
        minDiff = diff;
        closest = g;
      }
    }
    return closest ? closest.gradePoint : targetGp;
  }

  return 0;
}
