import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, Layers } from 'lucide-react';
import { CalculatorMeta, CalculationResult } from '../../types';
import { calculateCumulativeCGPA, SemesterInput } from '../../engine/academic';
import { GRADING_SCALES, getGradingScale } from '../../engine/gradingScales';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface CGPACalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

const DEFAULT_SEMESTERS: SemesterInput[] = [
  {
    id: 'sem-1',
    name: 'Semester 1',
    courses: [
      { id: 'c-1', name: 'Programming Fundamentals', creditHours: 4, grade: 'A' },
      { id: 'c-2', name: 'Calculus & Analytical Geometry', creditHours: 3, grade: 'A-' },
      { id: 'c-3', name: 'Applied Physics', creditHours: 3, grade: 'B+' },
      { id: 'c-4', name: 'English Composition', creditHours: 3, grade: 'A' },
      { id: 'c-5', name: 'Islamic Studies', creditHours: 2, grade: 'A' }
    ]
  },
  {
    id: 'sem-2',
    name: 'Semester 2',
    courses: [
      { id: 'c-6', name: 'Object Oriented Programming', creditHours: 4, grade: 'A' },
      { id: 'c-7', name: 'Discrete Structures', creditHours: 3, grade: 'B+' },
      { id: 'c-8', name: 'Digital Logic Design', creditHours: 4, grade: 'A-' },
      { id: 'c-9', name: 'Linear Algebra', creditHours: 3, grade: 'A' },
      { id: 'c-10', name: 'Communication Skills', creditHours: 3, grade: 'B+' }
    ]
  }
];

export const CGPACalculatorView: React.FC<CGPACalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [scaleId, setScaleId] = useState<string>(initialSnapshot?.scaleId || 'standard-4.0');
  const [semesters, setSemesters] = useState<SemesterInput[]>(initialSnapshot?.semesters || DEFAULT_SEMESTERS);
  const { addHistoryItem } = useHistory();

  const scale = getGradingScale(scaleId);
  const result = calculateCumulativeCGPA(semesters, scaleId);

  // Auto-save result to history with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Number(result.primaryValue) > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${semesters.length} Semesters • ${result.stats?.[0]?.value || 0} Total Credits`,
          primaryResult: `${result.primaryValue} / ${scale.maxGpa.toFixed(1)}`,
          primaryLabel: result.primaryLabel,
          inputSnapshot: { scaleId, semesters }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [result.primaryValue, scaleId, semesters]);

  const handleReset = () => {
    setScaleId('standard-4.0');
    setSemesters([
      {
        id: 'sem-1',
        name: 'Semester 1',
        courses: [
          { id: 'c-1', name: 'Course 1', creditHours: 3, grade: 'A' },
          { id: 'c-2', name: 'Course 2', creditHours: 3, grade: 'B+' },
          { id: 'c-3', name: 'Course 3', creditHours: 3, grade: 'B' }
        ]
      }
    ]);
  };

  const handleLoadSample = () => {
    setScaleId('hec-pakistan');
    setSemesters(DEFAULT_SEMESTERS);
  };

  const addSemester = () => {
    const semNum = semesters.length + 1;
    const newSem: SemesterInput = {
      id: `sem-${Date.now()}`,
      name: `Semester ${semNum}`,
      courses: [
        { id: `c-${Date.now()}-1`, name: 'Course 1', creditHours: 3, grade: 'A' },
        { id: `c-${Date.now()}-2`, name: 'Course 2', creditHours: 3, grade: 'B+' },
        { id: `c-${Date.now()}-3`, name: 'Course 3', creditHours: 3, grade: 'B' }
      ]
    };
    setSemesters([...semesters, newSem]);
  };

  const removeSemester = (semId: string) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter(s => s.id !== semId));
  };

  const addCourse = (semId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        return {
          ...sem,
          courses: [
            ...sem.courses,
            { id: `c-${Date.now()}`, name: `Course ${sem.courses.length + 1}`, creditHours: 3, grade: 'A' }
          ]
        };
      }
      return sem;
    }));
  };

  const removeCourse = (semId: string, courseId: string) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        if (sem.courses.length <= 1) return sem;
        return {
          ...sem,
          courses: sem.courses.filter(c => c.id !== courseId)
        };
      }
      return sem;
    }));
  };

  const updateCourse = (semId: string, courseId: string, updates: Partial<{ name: string; creditHours: number; grade: string }>) => {
    setSemesters(semesters.map(sem => {
      if (sem.id === semId) {
        return {
          ...sem,
          courses: sem.courses.map(c => {
            if (c.id === courseId) {
              return { ...c, ...updates };
            }
            return c;
          })
        };
      }
      return sem;
    }));
  };

  const updateSemesterName = (semId: string, name: string) => {
    setSemesters(semesters.map(sem => sem.id === semId ? { ...sem, name } : sem));
  };

  const gradeOptions = scale.grades.map(g => ({
    value: g.letter,
    label: `${g.letter} (${g.gradePoint.toFixed(2)} GP)`,
    subtext: g.description
  }));

  const scaleOptions = GRADING_SCALES.map(s => ({
    value: s.id,
    label: s.name,
    subtext: s.institution
  }));

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      {/* University / Grading Scale Selector */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <SelectField
          label="Grading Scale / University System"
          sublabel={`Max GPA: ${scale.maxGpa.toFixed(1)}`}
          options={scaleOptions}
          value={scaleId}
          onChange={e => setScaleId(e.target.value)}
        />
        {scale.notes && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {scale.notes}
          </p>
        )}
      </div>

      {/* Semesters List */}
      <div className="space-y-6">
        {semesters.map((sem, semIdx) => {
          const semResult = result.semesterResults?.find(r => r.semesterName === sem.name) || { gpa: 0, credits: 0, qualityPoints: 0 };
          return (
            <div
              key={sem.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-4"
            >
              {/* Semester Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center text-xs font-bold">
                    S{semIdx + 1}
                  </div>
                  <input
                    type="text"
                    value={sem.name}
                    onChange={e => updateSemesterName(sem.id, e.target.value)}
                    className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-brand-500 focus:outline-none px-1"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Term GPA: </span>
                    <span className="font-mono font-bold text-sm text-brand-600 dark:text-brand-400">
                      {semResult.gpa.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">({semResult.credits} cr)</span>
                  </div>

                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(sem.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove Semester"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Courses Grid / Table */}
              <div className="space-y-2.5">
                <div className="hidden sm:grid grid-cols-12 gap-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  <div className="col-span-6">Course / Subject Name</div>
                  <div className="col-span-3 text-center">Credit Hours</div>
                  <div className="col-span-3 text-right pr-6">Letter Grade</div>
                </div>

                {sem.courses.map((course, cIdx) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-2.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50"
                  >
                    {/* Course Title */}
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        value={course.name}
                        onChange={e => updateCourse(sem.id, course.id, { name: e.target.value })}
                        placeholder={`Subject ${cIdx + 1}`}
                        className="w-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                      />
                    </div>

                    {/* Credit Hours Selector */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-center gap-2">
                      <span className="text-xs text-slate-400 sm:hidden">Credits:</span>
                      <select
                        value={course.creditHours}
                        onChange={e => updateCourse(sem.id, course.id, { creditHours: Number(e.target.value) })}
                        className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map(cr => (
                          <option key={cr} value={cr}>{cr} Credit {cr === 1 ? 'Hour' : 'Hours'}</option>
                        ))}
                      </select>
                    </div>

                    {/* Grade Selector & Delete Course */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-2">
                      <span className="text-xs text-slate-400 sm:hidden">Grade:</span>
                      <select
                        value={course.grade}
                        onChange={e => updateCourse(sem.id, course.id, { grade: e.target.value })}
                        className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
                      >
                        {gradeOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeCourse(sem.id, course.id)}
                        disabled={sem.courses.length <= 1}
                        className="p-1.5 text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Remove Course"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Course Button */}
              <div className="pt-1">
                <button
                  onClick={() => addCourse(sem.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-950/40 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subject / Course</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Semester Button */}
      <div className="pt-2">
        <button
          onClick={addSemester}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-400 dark:border-slate-800 dark:hover:border-brand-600 bg-slate-50/50 hover:bg-brand-50/30 dark:bg-slate-900/30 dark:hover:bg-brand-950/20 text-xs font-bold text-slate-700 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400 transition-all flex items-center justify-center gap-2"
        >
          <Layers className="w-4 h-4" />
          <span>Add Another Semester (+ Semester {semesters.length + 1})</span>
        </button>
      </div>

    </CalculatorLayout>
  );
};
