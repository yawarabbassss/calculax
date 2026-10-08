import React, { useState, useEffect } from 'react';
import { CalculatorMeta } from '../../types';
import { calculateStudyTime } from '../../engine/studentLife';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { useHistory } from '../../context/HistoryContext';

interface StudyTimePlannerViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const StudyTimePlannerView: React.FC<StudyTimePlannerViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [totalTopics, setTotalTopics] = useState<number>(initialSnapshot?.totalTopics ?? 18);
  const [averageHoursPerTopic, setAverageHoursPerTopic] = useState<number>(
    initialSnapshot?.averageHoursPerTopic ?? 2.5
  );
  const [daysRemaining, setDaysRemaining] = useState<number>(initialSnapshot?.daysRemaining ?? 14);
  const [dailyAvailableHours, setDailyAvailableHours] = useState<number>(
    initialSnapshot?.dailyAvailableHours ?? 4
  );
  const [reviewBufferDays, setReviewBufferDays] = useState<number>(
    initialSnapshot?.reviewBufferDays ?? 2
  );

  const { addHistoryItem } = useHistory();

  const result = calculateStudyTime({
    totalTopics,
    averageHoursPerTopic,
    daysRemaining,
    dailyAvailableHours,
    reviewBufferDays
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (totalTopics > 0 && daysRemaining > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `${totalTopics} Topics • ${daysRemaining} Days Left`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { totalTopics, averageHoursPerTopic, daysRemaining, dailyAvailableHours, reviewBufferDays }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [totalTopics, averageHoursPerTopic, daysRemaining, dailyAvailableHours, reviewBufferDays, result.primaryValue]);

  const handleReset = () => {
    setTotalTopics(10);
    setAverageHoursPerTopic(2);
    setDaysRemaining(10);
    setDailyAvailableHours(3);
    setReviewBufferDays(1);
  };

  const handleLoadSample = () => {
    setTotalTopics(24);
    setAverageHoursPerTopic(2.0);
    setDaysRemaining(16);
    setDailyAvailableHours(5);
    setReviewBufferDays(3);
  };

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Total Topics / Chapters to Cover"
            type="number"
            min="1"
            value={totalTopics || ''}
            onChange={e => setTotalTopics(Number(e.target.value))}
            placeholder="e.g. 18"
            suffix="Topics"
          />

          <InputField
            label="Avg. Study Hours per Topic"
            type="number"
            min="0.5"
            step="0.5"
            value={averageHoursPerTopic || ''}
            onChange={e => setAverageHoursPerTopic(Number(e.target.value))}
            placeholder="e.g. 2.5"
            suffix="Hours"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InputField
            label="Days Until Exam"
            type="number"
            min="1"
            value={daysRemaining || ''}
            onChange={e => setDaysRemaining(Number(e.target.value))}
            placeholder="e.g. 14"
            suffix="Days"
          />

          <InputField
            label="Available Study Time Daily"
            type="number"
            min="1"
            max="24"
            step="0.5"
            value={dailyAvailableHours || ''}
            onChange={e => setDailyAvailableHours(Number(e.target.value))}
            placeholder="e.g. 4"
            suffix="Hrs/Day"
          />

          <InputField
            label="Revision Buffer Days"
            type="number"
            min="0"
            max={daysRemaining - 1}
            value={reviewBufferDays || ''}
            onChange={e => setReviewBufferDays(Number(e.target.value))}
            placeholder="e.g. 2"
            suffix="Days"
          />
        </div>
      </div>
    </CalculatorLayout>
  );
};
