import { GradingScale } from '../types';

export const GRADING_SCALES: GradingScale[] = [
  {
    id: 'standard-4.0',
    name: 'Standard 4.0 Scale',
    institution: 'Standard North American / Global',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, minPercentage: 90, description: 'Outstanding' },
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Excellent' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Very Good' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Good' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Above Average' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Average' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Pass' },
      { letter: 'C-', gradePoint: 1.7, minPercentage: 50, description: 'Marginal Pass' },
      { letter: 'D+', gradePoint: 1.3, minPercentage: 45, description: 'Poor' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 40, description: 'Barely Passing' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
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
      { letter: 'A', gradePoint: 4.0, minPercentage: 80, description: 'High Distinction' },
      { letter: 'B+', gradePoint: 3.5, minPercentage: 75, description: 'Distinction' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Very Good' },
      { letter: 'C+', gradePoint: 2.5, minPercentage: 65, description: 'Good' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 60, description: 'Satisfactory' },
      { letter: 'D+', gradePoint: 1.5, minPercentage: 55, description: 'Pass' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
    ],
    notes: 'Standard grading system followed at NUST undergraduate & postgraduate programs.'
  },
  {
    id: 'fast-nuces',
    name: 'FAST-NUCES Scale',
    institution: 'National University of Computer & Emerging Sciences',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, minPercentage: 90, description: 'Outstanding' },
      { letter: 'A', gradePoint: 4.0, minPercentage: 86, description: 'Excellent' },
      { letter: 'A-', gradePoint: 3.67, minPercentage: 82, description: 'Very Good' },
      { letter: 'B+', gradePoint: 3.33, minPercentage: 78, description: 'Good' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 74, description: 'Above Average' },
      { letter: 'B-', gradePoint: 2.67, minPercentage: 70, description: 'Average' },
      { letter: 'C+', gradePoint: 2.33, minPercentage: 66, description: 'Below Average' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 62, description: 'Satisfactory' },
      { letter: 'C-', gradePoint: 1.67, minPercentage: 58, description: 'Pass' },
      { letter: 'D+', gradePoint: 1.33, minPercentage: 54, description: 'Barely Pass' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
    ],
    notes: 'Relative or absolute scale applied at FAST campuses (Islamabad, Lahore, Karachi, Peshawar, CFD).'
  },
  {
    id: 'lums',
    name: 'LUMS Scale',
    institution: 'Lahore University of Management Sciences',
    maxGpa: 4.0,
    grades: [
      { letter: 'A+', gradePoint: 4.0, description: 'Exceptional' },
      { letter: 'A', gradePoint: 4.0, description: 'Excellent' },
      { letter: 'A-', gradePoint: 3.7, description: 'Very Good' },
      { letter: 'B+', gradePoint: 3.3, description: 'Good' },
      { letter: 'B', gradePoint: 3.0, description: 'Average / Competent' },
      { letter: 'B-', gradePoint: 2.7, description: 'Fair' },
      { letter: 'C+', gradePoint: 2.3, description: 'Satisfactory' },
      { letter: 'C', gradePoint: 2.0, description: 'Marginal' },
      { letter: 'C-', gradePoint: 1.7, description: 'Deficient' },
      { letter: 'D+', gradePoint: 1.3, description: 'Poor' },
      { letter: 'D', gradePoint: 1.0, description: 'Minimum Passing' },
      { letter: 'F', gradePoint: 0.0, description: 'Failing' },
    ],
    notes: 'Standard 4.0 relative grading scale at LUMS.'
  },
  {
    id: 'uet',
    name: 'UET Lahore Scale',
    institution: 'University of Engineering & Technology Lahore',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Exceptional' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Excellent' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Very Good' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Good' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Fair' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Passing' },
      { letter: 'C-', gradePoint: 1.7, minPercentage: 50, description: 'Low Pass' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 40, description: 'Bare Minimum' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
    ],
    notes: 'Semester grading scale for UET Engineering departments.'
  },
  {
    id: 'comsats',
    name: 'COMSATS Scale',
    institution: 'COMSATS University Islamabad',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'Excellent' },
      { letter: 'A-', gradePoint: 3.66, minPercentage: 80, description: 'Very Good' },
      { letter: 'B+', gradePoint: 3.33, minPercentage: 75, description: 'Good' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 71, description: 'Above Average' },
      { letter: 'B-', gradePoint: 2.66, minPercentage: 68, description: 'Average' },
      { letter: 'C+', gradePoint: 2.33, minPercentage: 64, description: 'Satisfactory' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 60, description: 'Pass' },
      { letter: 'C-', gradePoint: 1.66, minPercentage: 57, description: 'Marginal Pass' },
      { letter: 'D+', gradePoint: 1.33, minPercentage: 54, description: 'Deficient' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Minimum Pass' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
    ],
    notes: 'Official semester grading policy followed across COMSATS campuses.'
  },
  {
    id: 'pu-punjab',
    name: 'Punjab University (PU) Scale',
    institution: 'University of the Punjab, Lahore',
    maxGpa: 4.0,
    grades: [
      { letter: 'A', gradePoint: 4.0, minPercentage: 85, description: 'High Distinction' },
      { letter: 'A-', gradePoint: 3.7, minPercentage: 80, description: 'Distinction' },
      { letter: 'B+', gradePoint: 3.3, minPercentage: 75, description: 'Very Good' },
      { letter: 'B', gradePoint: 3.0, minPercentage: 70, description: 'Good' },
      { letter: 'B-', gradePoint: 2.7, minPercentage: 65, description: 'Fair' },
      { letter: 'C+', gradePoint: 2.3, minPercentage: 60, description: 'Satisfactory' },
      { letter: 'C', gradePoint: 2.0, minPercentage: 55, description: 'Pass' },
      { letter: 'D', gradePoint: 1.0, minPercentage: 50, description: 'Low Pass' },
      { letter: 'F', gradePoint: 0.0, minPercentage: 0, description: 'Fail' },
    ],
    notes: 'PU semester system grading framework.'
  }
];

export function getGradingScale(id: string): GradingScale {
  const found = GRADING_SCALES.find(s => s.id === id);
  return found || GRADING_SCALES[0];
}

export function getGradePointFromLetter(scale: GradingScale, letter: string): number {
  const grade = scale.grades.find(g => g.letter.toUpperCase() === letter.toUpperCase().trim());
  return grade ? grade.gradePoint : 0;
}
