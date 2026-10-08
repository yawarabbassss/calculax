import React, { useState } from 'react';
import { getCalculatorMeta } from '../data/calculatorRegistry';
import { ExportModal } from '../components/common/ExportModal';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { CALCULATOR_REGISTRY } from '../data/calculatorRegistry';
import { ArrowRight, ChevronRight, HelpCircle } from 'lucide-react';

// Views
import { CGPACalculatorView } from '../components/calculators/CGPACalculatorView';
import { GPACalculatorView } from '../components/calculators/GPACalculatorView';
import { PercentageCalculatorView } from '../components/calculators/PercentageCalculatorView';
import { MDCATAggregateView } from '../components/calculators/MDCATAggregateView';
import { MeritCalculatorView } from '../components/calculators/MeritCalculatorView';
import { AttendanceCalculatorView } from '../components/calculators/AttendanceCalculatorView';
import { RequiredMarksView } from '../components/calculators/RequiredMarksView';
import { CGPAToPercentageView } from '../components/calculators/CGPAToPercentageView';
import { WeightedGradeView } from '../components/calculators/WeightedGradeView';
import { StudyTimePlannerView } from '../components/calculators/StudyTimePlannerView';
import { ScholarshipCalculatorView } from '../components/calculators/ScholarshipCalculatorView';
import { AgeCalculatorView } from '../components/calculators/AgeCalculatorView';
import { DateDifferenceView } from '../components/calculators/DateDifferenceView';
import { AcademicScaleConverterView } from '../components/calculators/AcademicScaleConverterView';

interface CalculatorDetailPageProps {
  calculatorId: string;
  onNavigate: (route: string) => void;
  snapshot?: any;
}

export const CalculatorDetailPage: React.FC<CalculatorDetailPageProps> = ({
  calculatorId,
  onNavigate,
  snapshot
}) => {
  const meta = getCalculatorMeta(calculatorId) || getCalculatorMeta('cgpa-calculator')!;
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Related calculators in same category
  const relatedCalculators = CALCULATOR_REGISTRY.filter(
    c => c.category === meta.category && c.id !== meta.id
  ).slice(0, 3);

  const renderCalculatorView = () => {
    switch (meta.id) {
      case 'cgpa-calculator':
        return <CGPACalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'gpa-calculator':
        return <GPACalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'percentage-calculator':
        return <PercentageCalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'mdcat-aggregate':
        return <MDCATAggregateView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'merit-calculator':
        return <MeritCalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'attendance-calculator':
        return <AttendanceCalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'required-marks':
        return <RequiredMarksView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'cgpa-to-percentage':
        return <CGPAToPercentageView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'weighted-grade':
        return <WeightedGradeView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'study-time-planner':
        return <StudyTimePlannerView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'scholarship-calculator':
        return <ScholarshipCalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'age-calculator':
        return <AgeCalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'date-difference':
        return <DateDifferenceView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      case 'academic-scale-converter':
        return <AcademicScaleConverterView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
      default:
        return <CGPACalculatorView meta={meta} onOpenExport={() => setExportModalOpen(true)} onNavigate={onNavigate} initialSnapshot={snapshot} />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Active Calculator View */}
      {renderCalculatorView()}

      {/* Related Calculators & SEO FAQ Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Related Calculators */}
        {relatedCalculators.length > 0 && (
          <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-10">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
              Related {meta.category.replace('-', ' ')} Calculators
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCalculators.map(c => (
                <button
                  key={c.id}
                  onClick={() => onNavigate(`/calculators/${c.id}`)}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 text-left transition-all hover:shadow-subtle group flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <DynamicIcon name={c.icon} className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                      {c.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {c.tagline}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                    <span>Calculate</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Informational Guidance Block */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Understanding {meta.name} Results
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Calculax evaluates your entries using standardized academic algorithms. Formula summary applied: <code className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400">{meta.formulaSummary}</code>. For scholarship or admission submissions, verify institutional eligibility standards.
          </p>
        </div>

      </div>

      {/* Export Report Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        calculatorName={meta.name}
        result={{
          primaryValue: 'Calculated Output',
          primaryLabel: meta.name,
          breakdown: []
        }}
      />
    </div>
  );
};
