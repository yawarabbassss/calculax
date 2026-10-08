import { UniversityAdmissionConfig } from '../types';

export const UNIVERSITY_CONFIGS: UniversityAdmissionConfig[] = [
  // --- MEDICAL (MDCAT) ---
  {
    id: 'pmdc-mdcat-standard',
    name: 'PM&DC / UHS Punjab MDCAT',
    shortName: 'UHS MDCAT (Punjab)',
    city: 'Lahore / Punjab',
    category: 'medical',
    effectiveYear: '2024-2025',
    degreeType: 'MBBS / BDS',
    formulaDescription: '50% MDCAT + 40% FSc Pre-Medical + 10% Matric / SSC',
    components: [
      { id: 'matric', name: 'Matric / SSC / O-Levels', defaultWeight: 10, maxMarksDefault: 1100, description: '10% Weightage' },
      { id: 'fsc', name: 'FSc (Pre-Medical) / HSSC', defaultWeight: 40, maxMarksDefault: 1100, description: '40% Weightage' },
      { id: 'mdcat', name: 'MDCAT Entry Test', defaultWeight: 50, maxMarksDefault: 200, description: '50% Weightage' }
    ],
    notes: [
      'Official PM&DC uniform aggregate formula followed across public medical colleges in Punjab through UHS.',
      'MDCAT passing percentage requirement applies (55% for MBBS, 50% for BDS).'
    ]
  },
  {
    id: 'nums-medical',
    name: 'NUMS (National University of Medical Sciences)',
    shortName: 'NUMS Army Medical',
    city: 'Rawalpindi',
    category: 'medical',
    effectiveYear: '2024-2025',
    degreeType: 'MBBS / BDS',
    formulaDescription: '50% NUMS Entry Test + 40% FSc + 10% Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 10, maxMarksDefault: 1100, description: '10% Weightage' },
      { id: 'fsc', name: 'FSc (Pre-Medical)', defaultWeight: 40, maxMarksDefault: 1100, description: '40% Weightage' },
      { id: 'nums_test', name: 'NUMS Entry Test', defaultWeight: 50, maxMarksDefault: 150, description: '50% Weightage (Psychological test is qualifying)' }
    ],
    notes: [
      'Applies to Army Medical College (AMC) Rawalpindi and NUMS affiliated private medical colleges.',
      'NUMS entry test psychological component is qualifying in nature.'
    ]
  },
  {
    id: 'szabmu-mdcat',
    name: 'SZABMU Islamabad MDCAT',
    shortName: 'SZABMU (Islamabad & AJK)',
    city: 'Islamabad',
    category: 'medical',
    effectiveYear: '2024-2025',
    degreeType: 'MBBS / BDS',
    formulaDescription: '50% MDCAT + 40% FSc + 10% Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 10, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc Pre-Medical', defaultWeight: 40, maxMarksDefault: 1100 },
      { id: 'mdcat', name: 'SZABMU MDCAT', defaultWeight: 50, maxMarksDefault: 200 }
    ]
  },
  {
    id: 'duhs-jsmu-sindh',
    name: 'DUHS / JSMU Sindh Medical Admissions',
    shortName: 'DUHS / Sindh MDCAT',
    city: 'Karachi / Sindh',
    category: 'medical',
    effectiveYear: '2024-2025',
    degreeType: 'MBBS / BDS',
    formulaDescription: '50% MDCAT + 40% HSSC / Inter + 10% SSC / Matric',
    components: [
      { id: 'matric', name: 'SSC / Matric', defaultWeight: 10, maxMarksDefault: 850 },
      { id: 'fsc', name: 'HSSC / Pre-Medical Inter', defaultWeight: 40, maxMarksDefault: 1100 },
      { id: 'mdcat', name: 'Sindh MDCAT', defaultWeight: 50, maxMarksDefault: 200 }
    ]
  },
  {
    id: 'kmu-kpk',
    name: 'KMU (Khyber Medical University) KPK',
    shortName: 'KMU (KPK MDCAT)',
    city: 'Peshawar / KPK',
    category: 'medical',
    effectiveYear: '2024-2025',
    degreeType: 'MBBS / BDS',
    formulaDescription: '50% MDCAT + 40% FSc + 10% SSC',
    components: [
      { id: 'matric', name: 'SSC / Matric', defaultWeight: 10, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc Pre-Medical', defaultWeight: 40, maxMarksDefault: 1100 },
      { id: 'mdcat', name: 'KPK MDCAT', defaultWeight: 50, maxMarksDefault: 200 }
    ]
  },

  // --- ENGINEERING & COMPUTING (NUST, FAST, UET, GIKI, PIEAS) ---
  {
    id: 'nust-net-engineering',
    name: 'NUST (National University of Sciences & Technology)',
    shortName: 'NUST NET Aggregate',
    city: 'Islamabad',
    category: 'engineering',
    effectiveYear: '2024-2025',
    degreeType: 'BS CS / SE / Engineering / Applied Sciences',
    formulaDescription: '75% NUST NET Entry Test + 15% FSc / HSSC + 10% Matric / O-Levels',
    components: [
      { id: 'matric', name: 'Matric / O-Levels', defaultWeight: 10, maxMarksDefault: 1100, description: '10% Weight' },
      { id: 'fsc', name: 'FSc (Part 1 or Complete) / A-Levels', defaultWeight: 15, maxMarksDefault: 1100, description: '15% Weight' },
      { id: 'net_test', name: 'NUST Entry Test (NET)', defaultWeight: 75, maxMarksDefault: 200, description: '75% Weight (Best score of NET 1/2/3/4)' }
    ],
    notes: [
      'NUST considers the highest score if you appear in multiple series (NET-1, 2, 3, or 4).',
      'For A-Level students, equivalence certificate from IBCC is required.'
    ]
  },
  {
    id: 'fast-nuces-computing',
    name: 'FAST-NUCES (CS / Software Engineering)',
    shortName: 'FAST-NUCES Aggregate',
    city: 'All Campuses (ISB, LHR, KHI, PWR, CFD)',
    category: 'it',
    effectiveYear: '2024-2025',
    degreeType: 'BS CS / BS SE / BS AI / BS Data Science',
    formulaDescription: '50% FAST Admission Test (NU) + 50% FSc / HSSC',
    components: [
      { id: 'fsc', name: 'FSc / HSSC (Part 1 or Total)', defaultWeight: 50, maxMarksDefault: 1100, description: '50% Academic weight' },
      { id: 'nu_test', name: 'FAST NU Admission Test', defaultWeight: 50, maxMarksDefault: 100, description: '50% Test weight (Negative marking applies on test)' }
    ],
    notes: [
      'FAST entry test features negative marking (0.25 deducted for wrong answers on selected sections).',
      'For SAT applicants, separate aggregate benchmarks apply.'
    ]
  },
  {
    id: 'uet-ecat',
    name: 'UET Lahore (University of Engineering & Technology)',
    shortName: 'UET ECAT Aggregate',
    city: 'Lahore / Punjab',
    category: 'engineering',
    effectiveYear: '2024-2025',
    degreeType: 'BSc Engineering / Computing',
    formulaDescription: '33% ECAT Entry Test + 50% FSc / DAE + 17% Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 17, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / HSSC / DAE', defaultWeight: 50, maxMarksDefault: 1100 },
      { id: 'ecat_test', name: 'UET Combined ECAT', defaultWeight: 33, maxMarksDefault: 400 }
    ],
    notes: [
      'ECAT maximum marks are 400 (100 MCQs, 4 marks each, -1 negative mark).',
      'Bonus 20 marks may be added to FSc for Hafiz-e-Quran candidates after verification.'
    ]
  },
  {
    id: 'giki-engineering',
    name: 'GIKI (Ghulam Ishaq Khan Institute)',
    shortName: 'GIKI Topi Aggregate',
    city: 'Topi, Swabi',
    category: 'engineering',
    effectiveYear: '2024-2025',
    degreeType: 'BS Engineering / Computer Science',
    formulaDescription: '85% GIKI Admission Test + 10% HSSC / FSc + 5% SSC / Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 5, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / HSSC (Part 1)', defaultWeight: 10, maxMarksDefault: 550 },
      { id: 'giki_test', name: 'GIKI Admission Test', defaultWeight: 85, maxMarksDefault: 200 }
    ],
    notes: [
      'GIKI places maximum emphasis on its institutional entrance test (85%).'
    ]
  },
  {
    id: 'pieas-engineering',
    name: 'PIEAS (Pakistan Institute of Engineering & Applied Sciences)',
    shortName: 'PIEAS Islamabad',
    city: 'Islamabad',
    category: 'engineering',
    effectiveYear: '2024-2025',
    degreeType: 'BS Engineering / CS',
    formulaDescription: '60% PIEAS Written Test + 25% FSc + 15% Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 15, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / HSSC', defaultWeight: 25, maxMarksDefault: 1100 },
      { id: 'pieas_test', name: 'PIEAS Admission Test', defaultWeight: 60, maxMarksDefault: 100 }
    ]
  },
  {
    id: 'comsats-nats',
    name: 'COMSATS University Islamabad (CUI)',
    shortName: 'COMSATS NTS Aggregate',
    city: 'All Campuses (ISB, LHR, ATD, WAH, SWL, VEH, ATT)',
    category: 'general',
    effectiveYear: '2024-2025',
    degreeType: 'BS Programs / Engineering / CS / BBA',
    formulaDescription: '50% NTS (NAT) Entry Test + 40% FSc + 10% Matric',
    components: [
      { id: 'matric', name: 'Matric / SSC', defaultWeight: 10, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / HSSC', defaultWeight: 40, maxMarksDefault: 1100 },
      { id: 'nats_test', name: 'NTS NAT Entry Test', defaultWeight: 50, maxMarksDefault: 100 }
    ]
  },
  {
    id: 'iba-karachi',
    name: 'IBA Karachi (Institute of Business Administration)',
    shortName: 'IBA Karachi',
    city: 'Karachi',
    category: 'business',
    effectiveYear: '2024-2025',
    degreeType: 'BBA / BS CS / BS Economics',
    formulaDescription: '60% IBA Aptitude Test / SAT + 40% Academic Profile (HSSC + SSC)',
    components: [
      { id: 'matric', name: 'Matric / O-Levels', defaultWeight: 15, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / A-Levels', defaultWeight: 25, maxMarksDefault: 1100 },
      { id: 'iba_test', name: 'IBA Aptitude Test / SAT Score', defaultWeight: 60, maxMarksDefault: 100 }
    ]
  },
  {
    id: 'lums-undergrad',
    name: 'LUMS (Lahore University of Management Sciences)',
    shortName: 'LUMS Undergraduate',
    city: 'Lahore',
    category: 'general',
    effectiveYear: '2024-2025',
    degreeType: 'BSc (Hons) / BS / SDSB / SBASSE / MGSHSS / SAHSOL',
    formulaDescription: 'Holistic Admission: ~50% SAT / LCAT + ~50% Academic Record (O/A-Levels, FSc, Matric)',
    components: [
      { id: 'matric', name: 'Matric / O-Levels Profile', defaultWeight: 20, maxMarksDefault: 1100 },
      { id: 'fsc', name: 'FSc / A-Levels Profile', defaultWeight: 30, maxMarksDefault: 1100 },
      { id: 'lcat_sat', name: 'LCAT / SAT-I Score', defaultWeight: 50, maxMarksDefault: 1600 }
    ],
    notes: [
      'LUMS uses a holistic review process considering SAT/LCAT, academic grades, personal statement, and co-curriculars.'
    ]
  }
];

export function getUniversityConfig(id: string): UniversityAdmissionConfig | undefined {
  return UNIVERSITY_CONFIGS.find(u => u.id === id);
}
