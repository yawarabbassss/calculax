import { CalculatorMeta } from '../types';

export const CALCULATOR_REGISTRY: CalculatorMeta[] = [
  // --- ACADEMIC ---
  {
    id: 'cgpa-calculator',
    name: 'CGPA Calculator',
    shortName: 'CGPA',
    category: 'academic',
    tagline: 'Multi-semester cumulative GPA with university grading scales',
    description: 'Calculate your Cumulative Grade Point Average across multiple semesters and courses. Supports Pakistan (HEC, NUST, FAST, LUMS, UET, PU, COMSATS) and standard 4.0 scales.',
    icon: 'GraduationCap',
    badge: 'Multi-Semester',
    popular: true,
    keywords: ['cgpa', 'cumulative gpa', 'gpa', 'semester', 'grade point', 'quality points', 'university', 'hec', 'nust', 'fast'],
    formulaSummary: 'CGPA = Sum(Quality Points) ÷ Sum(Credit Hours)',
    seoTitle: 'CGPA Calculator — Multi-Semester University Cumulative GPA',
    seoDescription: 'Accurately calculate your Cumulative GPA across semesters with credit hour weightages and Pakistani university grading scales.'
  },
  {
    id: 'gpa-calculator',
    name: 'Semester GPA Calculator',
    shortName: 'GPA',
    category: 'academic',
    tagline: 'Calculate term GPA from course credits & letter grades',
    description: 'Fast and accurate semester GPA calculation. Add your enrolled subjects, credit hours, and target or earned grades with instant quality points breakdown.',
    icon: 'Award',
    badge: 'Popular',
    popular: true,
    keywords: ['gpa', 'semester gpa', 'term gpa', 'grades', 'credit hours', 'subject gpa', 'academic standing'],
    formulaSummary: 'GPA = Total Quality Points ÷ Total Credit Hours',
    seoTitle: 'Semester GPA Calculator — Instant Credit Hour & Grade Calculation',
    seoDescription: 'Calculate your semester GPA instantly with course credit hours and letter grades. Includes Dean’s list benchmarks.'
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage & Marks Calculator',
    shortName: 'Percentage',
    category: 'academic',
    tagline: 'Marks to percentage & percentage to required marks',
    description: 'Easily convert obtained marks to percentage or determine the marks needed to hit a specific percentage goal across exams, boards, and tests.',
    icon: 'Percent',
    badge: 'Dual Mode',
    popular: true,
    keywords: ['percentage', 'marks to percentage', 'percentage to marks', 'board marks', 'matric marks', 'fsc percentage'],
    formulaSummary: 'Percentage = (Obtained Marks ÷ Total Marks) × 100',
    seoTitle: 'Marks to Percentage Calculator — Bi-Directional Exam Tool',
    seoDescription: 'Convert obtained marks to percentage or find required marks from percentage. Fast, accurate, and includes letter grade equivalents.'
  },
  {
    id: 'cgpa-to-percentage',
    name: 'CGPA to Percentage Converter',
    shortName: 'CGPA ⇄ %',
    category: 'academic',
    tagline: 'Convert CGPA to percentage using HEC and official scales',
    description: 'Convert your university CGPA (4.0, 5.0, or 10.0 scale) into percentage for jobs, scholarships, and international admissions with HEC and AICTE formulas.',
    icon: 'RefreshCw',
    badge: 'HEC Formula',
    popular: false,
    keywords: ['cgpa to percentage', 'percentage to cgpa', 'gpa conversion', 'hec formula', 'grade conversion'],
    formulaSummary: 'Percentage = (CGPA ÷ Max GPA) × 100',
    seoTitle: 'CGPA to Percentage Calculator — HEC Pakistan & Standard Scale',
    seoDescription: 'Convert CGPA to percentage and vice-versa according to HEC Pakistan official guidelines and international conversion models.'
  },
  {
    id: 'weighted-grade',
    name: 'Weighted Grade & Assessment Calculator',
    shortName: 'Weighted Grade',
    category: 'academic',
    tagline: 'Quizzes, assignments, midterms & finals weighted breakdown',
    description: 'Track your overall course performance by weighting quizzes, assignments, projects, midterms, and finals. Discover what you need on upcoming exams.',
    icon: 'Sliders',
    badge: 'Course Tracker',
    popular: false,
    keywords: ['weighted grade', 'course grade', 'assignment weight', 'midterm', 'final exam', 'grade tracker'],
    formulaSummary: 'Grade = Sum(Score% × Weight%)',
    seoTitle: 'Weighted Grade Calculator — Course Assessment & Syllabus Tracker',
    seoDescription: 'Calculate weighted syllabus grades for quizzes, midterms, and finals. Find the score you need on remaining exams to get an A.'
  },
  {
    id: 'required-marks',
    name: 'Required Final Exam Marks',
    shortName: 'Target Marks',
    category: 'academic',
    tagline: 'Calculate exact marks needed in final exam to achieve target grade',
    description: 'Find out the exact score or percentage you must achieve in your final exam or remaining tests to secure your target overall grade or percentage.',
    icon: 'Target',
    badge: 'Goal Planner',
    popular: true,
    keywords: ['required marks', 'final exam marks', 'target percentage', 'needed marks', 'pass exam', 'target grade'],
    formulaSummary: 'Needed = (Target% × Total Marks) - Current Score',
    seoTitle: 'Required Marks Calculator — What Score Do You Need on the Final?',
    seoDescription: 'Find out the exact marks required in your final examination to reach your target semester percentage or passing grade.'
  },

  // --- ADMISSIONS ---
  {
    id: 'mdcat-aggregate',
    name: 'Pakistan MDCAT Aggregate Calculator',
    shortName: 'MDCAT Aggregate',
    category: 'admissions',
    tagline: 'Official PM&DC, UHS, NUMS, SZABMU, Sindh & KPK formulas',
    description: 'Calculate your medical & dental admission aggregate based on Matric (10%), FSc Pre-Medical (40%), and MDCAT (50%) with provincial institution presets.',
    icon: 'HeartPulse',
    badge: 'PM&DC 2024-25',
    popular: true,
    keywords: ['mdcat', 'mdcat aggregate', 'pmdc', 'uhs', 'nums', 'szabmu', 'mbbs merit', 'bds merit', 'medical admission'],
    formulaSummary: 'Aggregate = (Matric × 10%) + (FSc × 40%) + (MDCAT × 50%)',
    seoTitle: 'MDCAT Aggregate Calculator Pakistan — UHS, NUMS, SZABMU & PMDC',
    seoDescription: 'Calculate your MDCAT admission aggregate accurately for Punjab UHS, NUMS, SZABMU, Sindh, and KPK medical colleges.'
  },
  {
    id: 'merit-calculator',
    name: 'University Admission Merit Calculator',
    shortName: 'Merit Calculator',
    category: 'admissions',
    tagline: 'NUST NET, FAST NU, UET ECAT, GIKI, PIEAS & Custom Merit',
    description: 'Comprehensive admission merit calculator for Pakistan engineering, computing, business, and medical universities. Includes NUST NET, FAST NU, UET ECAT, and GIKI presets.',
    icon: 'Building2',
    badge: 'NUST / FAST / UET',
    popular: true,
    keywords: ['merit calculator', 'nust net aggregate', 'fast aggregate', 'uet ecat aggregate', 'giki merit', 'comsats aggregate', 'engineering merit'],
    formulaSummary: 'Merit = Sum(Component Score% × Weight%)',
    seoTitle: 'University Merit Calculator Pakistan — NUST, FAST, UET, GIKI, COMSATS',
    seoDescription: 'Calculate university admission aggregates for NUST, FAST-NUCES, UET Lahore, GIKI, PIEAS, and COMSATS instantly.'
  },

  // --- STUDENT LIFE & PRODUCTIVITY ---
  {
    id: 'attendance-calculator',
    name: 'Attendance & Bunk Planner',
    shortName: 'Attendance',
    category: 'student-life',
    tagline: 'Check attendance %, safe bunks & recovery classes required',
    description: 'Know exactly where you stand with 75% or 80% university attendance rules. Calculates how many classes you can safely skip or must attend to clear exam criteria.',
    icon: 'CheckCircle2',
    badge: 'Exam Safe',
    popular: true,
    keywords: ['attendance', 'bunk calculator', 'attendance percentage', '75 percent attendance', 'college attendance', 'miss classes'],
    formulaSummary: 'Attendance% = (Attended ÷ Total) × 100',
    seoTitle: 'Attendance & Bunk Calculator — Safe Absences & Recovery Planner',
    seoDescription: 'Calculate your attendance percentage, how many classes you can safely bunk, or how many consecutive lectures you need to reach 75%.'
  },
  {
    id: 'study-time-planner',
    name: 'Study Time & Exam Countdown',
    shortName: 'Study Planner',
    category: 'student-life',
    tagline: 'Daily study hours needed to complete syllabus before exams',
    description: 'Plan your syllabus completion effortlessly. Input topics, estimated hours, and exam date to get a realistic, actionable daily study schedule.',
    icon: 'Clock',
    badge: 'Productivity',
    popular: false,
    keywords: ['study time', 'exam countdown', 'study planner', 'syllabus planner', 'daily study hours', 'exam preparation'],
    formulaSummary: 'Daily Hours = Total Syllabus Hours ÷ Available Study Days',
    seoTitle: 'Study Time & Exam Planner — Daily Study Schedule Calculator',
    seoDescription: 'Calculate how many hours per day you need to study to finish your course syllabus before your exams with revision buffer days.'
  },
  {
    id: 'scholarship-calculator',
    name: 'Merit Scholarship & Fee Waiver',
    shortName: 'Scholarship',
    category: 'student-life',
    tagline: 'Estimate tuition fee waivers & monetary savings from GPA / merit',
    description: 'Determine scholarship brackets, tuition fee discount percentages, and semester financial savings based on your university CGPA or entry test aggregate.',
    icon: 'Coins',
    badge: 'Financial Aid',
    popular: false,
    keywords: ['scholarship', 'fee waiver', 'tuition discount', 'merit scholarship', 'cgpa scholarship', 'financial aid'],
    formulaSummary: 'Waiver = Bracket% × Semester Tuition Fee',
    seoTitle: 'University Scholarship & Fee Waiver Calculator — CGPA & Merit',
    seoDescription: 'Estimate your tuition fee waiver and financial savings based on university GPA thresholds and entry test scores.'
  },

  // --- GENERAL & UTILITY ---
  {
    id: 'age-calculator',
    name: 'Age & Eligibility Calculator',
    shortName: 'Age Calculator',
    category: 'general',
    tagline: 'Exact age in years, months & days for admission cutoffs',
    description: 'Calculate precise age down to the day as of an admission deadline or government job cutoff date (PM&DC, Armed Forces, CSS, PMA).',
    icon: 'Calendar',
    badge: 'Admission Cutoffs',
    popular: false,
    keywords: ['age calculator', 'admission age', 'cutoff date', 'pma age', 'css age', 'exact age in days'],
    formulaSummary: 'Age = Target Date - Date of Birth (Y/M/D)',
    seoTitle: 'Academic Age & Eligibility Calculator — Exact Cutoff Dates',
    seoDescription: 'Calculate exact age in years, months, and days for university admissions, CSS, PMA, and competitive examination cutoff dates.'
  },
  {
    id: 'date-difference',
    name: 'Date Difference & Semester Weeks',
    shortName: 'Date Diff',
    category: 'general',
    tagline: 'Working days, semester weeks & calendar duration',
    description: 'Measure the exact time between two dates in days, academic weeks, and working days. Perfect for semester timelines and project deadlines.',
    icon: 'CalendarDays',
    badge: 'Academic Calendar',
    popular: false,
    keywords: ['date difference', 'semester weeks', 'working days', 'days between dates', 'countdown to finals'],
    formulaSummary: 'Duration = End Date - Start Date',
    seoTitle: 'Date Difference & Academic Semester Week Calculator',
    seoDescription: 'Calculate the number of days, weeks, and working study days between any two dates for academic semesters and project milestones.'
  },
  {
    id: 'academic-scale-converter',
    name: 'Academic Marks & Scale Converter',
    shortName: 'Scale Converter',
    category: 'general',
    tagline: 'Scale marks across 850, 1100, 4.0, 5.0 and 100 max points',
    description: 'Normalize and scale exam marks from one maximum total to another (e.g. converting 850 SSC marks to 1100 standard, or scaling test scores).',
    icon: 'Scale',
    badge: 'Score Normalizer',
    popular: false,
    keywords: ['scale converter', 'marks scaling', 'marks normalizer', '850 to 1100', 'score ratio'],
    formulaSummary: 'Scaled Score = (Obtained ÷ Max Old) × Max New',
    seoTitle: 'Academic Scale & Score Converter — Standardize Exam Marks',
    seoDescription: 'Easily scale and normalize exam scores across different maximum marks totals like 850, 1100, and 100.'
  }
];

export function getCalculatorMeta(id: string): CalculatorMeta | undefined {
  return CALCULATOR_REGISTRY.find(c => c.id === id);
}

export function getCalculatorsByCategory(category: CalculatorMeta['category']): CalculatorMeta[] {
  return CALCULATOR_REGISTRY.filter(c => c.category === category);
}

export function getPopularCalculators(): CalculatorMeta[] {
  return CALCULATOR_REGISTRY.filter(c => c.popular);
}
