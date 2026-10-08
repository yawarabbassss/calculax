import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { calculateSemesterGPA, CourseInput } from '../../engine/academic';
import { GRADING_SCALES, getGradingScale } from '../../engine/gradingScales';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface GPACalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

const DEFAULT_COURSES: CourseInput[] = [
  { id: '1', name: 'Data Structures & Algorithms', creditHours: 4, grade: 'A' },
  { id: '2', name: 'Probability & Statistics', creditHours: 3, grade: 'A-' },
  { id: '3', name: 'Computer Architecture', creditHours: 3, grade: 'B+' },
  { id: '4', name: 'Technical Writing', creditHours: 3, grade: 'A' },
  { id: '5', name: 'Pakistan Studies', creditHours: 2, grade: 'B+' }
];

export const GPACalculatorView: React.FC<GPACalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [scaleId, setScaleId] = useState<string>(initialSnapshot?.scaleId || 'standard-4.0');
  const [courses, setCourses] = useState<CourseInput[]>(initialSnapshot?.courses || DEFAULT_COURSES);
  const { addHistoryItem } = useHistory();

  const scale = getGradingScale(scaleId);
  const result = calculateSemesterGPA(courses, scaleId);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Number(result.primaryValue) > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${courses.length} Courses • ${result.stats?.[0]?.value || 0} Credits`,
          primaryResult: `${result.primaryValue} / ${scale.maxGpa.toFixed(1)}`,
          primaryLabel: result.primaryLabel,
          inputSnapshot: { scaleId, courses }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [result.primaryValue, scaleId, courses]);

  const handleReset = () => {
    setScaleId('standard-4.0');
    setCourses([
      { id: '1', name: 'Course 1', creditHours: 3, grade: 'A' },
      { id: '2', name: 'Course 2', creditHours: 3, grade: 'B+' },
      { id: '3', name: 'Course 3', creditHours: 3, grade: 'B' }
    ]);
  };

  const handleLoadSample = () => {
    setScaleId('hec-pakistan');
    setCourses(DEFAULT_COURSES);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: `${Date.now()}`, name: `Course ${courses.length + 1}`, creditHours: 3, grade: 'A' }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, updates: Partial<CourseInput>) => {
    setCourses(courses.map(c => c.id === id ? { ...c, ...updates } : c));
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
      {/* University Scale Picker */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <SelectField
          label="Grading Scale System"
          sublabel={`Max GPA: ${scale.maxGpa.toFixed(1)}`}
          options={scaleOptions}
          value={scaleId}
          onChange={e => setScaleId(e.target.value)}
        />
      </div>

      {/* Courses List */}
      <div className="space-y-3">
        <div className="hidden sm:grid grid-cols-12 gap-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
          <div className="col-span-6">Course / Subject Name</div>
          <div className="col-span-3 text-center">Credit Hours</div>
          <div className="col-span-3 text-right pr-6">Letter Grade</div>
        </div>

        {courses.map((course, idx) => (
          <div
            key={course.id}
            className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-850/40 border border-slate-200/80 dark:border-slate-800"
          >
            {/* Title */}
            <div className="sm:col-span-6">
              <input
                type="text"
                value={course.name}
                onChange={e => updateCourse(course.id, { name: e.target.value })}
                placeholder={`Subject ${idx + 1}`}
                className="w-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>

            {/* Credit Hours */}
            <div className="sm:col-span-3 flex items-center justify-between sm:justify-center gap-2">
              <span className="text-xs text-slate-400 sm:hidden">Credits:</span>
              <select
                value={course.creditHours}
                onChange={e => updateCourse(course.id, { creditHours: Number(e.target.value) })}
                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map(cr => (
                  <option key={cr} value={cr}>{cr} Credit {cr === 1 ? 'Hour' : 'Hours'}</option>
                ))}
              </select>
            </div>

            {/* Grade Selection */}
            <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-2">
              <span className="text-xs text-slate-400 sm:hidden">Grade:</span>
              <select
                value={course.grade}
                onChange={e => updateCourse(course.id, { grade: e.target.value })}
                className="text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                {gradeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeCourse(course.id)}
                disabled={courses.length <= 1}
                className="p-2 text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded-lg"
                title="Remove course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course CTA */}
      <div>
        <button
          onClick={addCourse}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-900 text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Course</span>
        </button>
      </div>

    </CalculatorLayout>
  );
};
