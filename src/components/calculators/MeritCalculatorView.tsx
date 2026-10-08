import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Sliders, Building } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { calculateUniversityMerit, AdmissionComponentInput } from '../../engine/admissions';
import { UNIVERSITY_CONFIGS, getUniversityConfig } from '../../engine/universityRegistry';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface MeritCalculatorViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

const DEFAULT_NUST_COMPONENTS: AdmissionComponentInput[] = [
  { id: '1', name: 'NUST Entry Test (NET)', obtainedMarks: 154, totalMarks: 200, weightPercentage: 75 },
  { id: '2', name: 'FSc (HSSC Part 1 or Total)', obtainedMarks: 495, totalMarks: 550, weightPercentage: 15 },
  { id: '3', name: 'Matric / SSC / O-Levels', obtainedMarks: 1040, totalMarks: 1100, weightPercentage: 10 }
];

export const MeritCalculatorView: React.FC<MeritCalculatorViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(
    initialSnapshot?.selectedUniversityId || 'nust-net-engineering'
  );
  const [components, setComponents] = useState<AdmissionComponentInput[]>(
    initialSnapshot?.components || DEFAULT_NUST_COMPONENTS
  );

  const { addHistoryItem } = useHistory();

  // Handle university config preset change
  const handleUniversityChange = (id: string) => {
    setSelectedUniversityId(id);
    if (id === 'custom') return;

    const uni = getUniversityConfig(id);
    if (uni) {
      const newComps: AdmissionComponentInput[] = uni.components.map((c, i) => {
        let obtained = 0;
        const total = c.maxMarksDefault || 1100;
        // Provide smart default estimates
        if (c.id.includes('matric')) obtained = Math.round(total * 0.9);
        else if (c.id.includes('fsc')) obtained = Math.round(total * 0.88);
        else obtained = Math.round(total * 0.75);

        return {
          id: `${Date.now()}-${i}`,
          name: c.name,
          obtainedMarks: obtained,
          totalMarks: total,
          weightPercentage: c.defaultWeight
        };
      });
      setComponents(newComps);
    }
  };

  const result = calculateUniversityMerit({
    components,
    universityConfigId: selectedUniversityId === 'custom' ? undefined : selectedUniversityId
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const uni = getUniversityConfig(selectedUniversityId);
      const totalComps = components.length;
      if (totalComps > 0 && Number(result.primaryValue.toString().replace('%', '')) > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: uni ? `${uni.shortName} (${uni.effectiveYear})` : `${totalComps} Components Custom Merit`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: { selectedUniversityId, components }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [components, selectedUniversityId, result.primaryValue]);

  const handleReset = () => {
    setSelectedUniversityId('custom');
    setComponents([
      { id: '1', name: 'Entry Test Score', obtainedMarks: 0, totalMarks: 100, weightPercentage: 50 },
      { id: '2', name: 'FSc / HSSC Marks', obtainedMarks: 0, totalMarks: 1100, weightPercentage: 40 },
      { id: '3', name: 'Matric / SSC Marks', obtainedMarks: 0, totalMarks: 1100, weightPercentage: 10 }
    ]);
  };

  const handleLoadSample = () => {
    handleUniversityChange('nust-net-engineering');
  };

  const addComponent = () => {
    setComponents([
      ...components,
      {
        id: `${Date.now()}`,
        name: `Component ${components.length + 1}`,
        obtainedMarks: 80,
        totalMarks: 100,
        weightPercentage: 10
      }
    ]);
  };

  const removeComponent = (id: string) => {
    if (components.length <= 1) return;
    setComponents(components.filter(c => c.id !== id));
  };

  const updateComponent = (id: string, updates: Partial<AdmissionComponentInput>) => {
    setComponents(components.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const uniOptions = [
    { value: 'custom', label: 'Custom Multi-Component Merit', subtext: 'Build your own custom weight formula' },
    ...UNIVERSITY_CONFIGS.map(u => ({
      value: u.id,
      label: `${u.shortName} (${u.degreeType})`,
      subtext: u.formulaDescription,
      group: u.category.toUpperCase()
    }))
  ];

  const totalWeight = components.reduce((sum, c) => sum + c.weightPercentage, 0);

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      {/* University Preset Picker */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <SelectField
          label="Target University / Program Preset"
          sublabel="Pakistan Top Universities"
          options={uniOptions}
          value={selectedUniversityId}
          onChange={e => handleUniversityChange(e.target.value)}
        />

        {selectedUniversityId !== 'custom' && (
          <div className="flex items-center justify-between text-xs pt-1 text-slate-500 dark:text-slate-400">
            <span>{getUniversityConfig(selectedUniversityId)?.formulaDescription}</span>
            <span className="font-semibold text-brand-600 dark:text-brand-400">
              {getUniversityConfig(selectedUniversityId)?.city}
            </span>
          </div>
        )}
      </div>

      {/* Components List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
            Admission Components & Weightages
          </h4>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
            totalWeight === 100
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
          }`}>
            Total Weight: {totalWeight}% {totalWeight === 100 ? '✓' : '(Target: 100%)'}
          </span>
        </div>

        <div className="space-y-3">
          {components.map((comp, idx) => (
            <div
              key={comp.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <input
                  type="text"
                  value={comp.name}
                  onChange={e => updateComponent(comp.id, { name: e.target.value })}
                  placeholder={`Component ${idx + 1}`}
                  className="font-bold text-xs text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-brand-500 focus:outline-none px-1"
                />

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
                    {comp.weightPercentage}% wt
                  </span>
                  {components.length > 1 && (
                    <button
                      onClick={() => removeComponent(comp.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                      title="Remove Component"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <InputField
                  label="Obtained Marks"
                  type="number"
                  min="0"
                  max={comp.totalMarks}
                  value={comp.obtainedMarks || ''}
                  onChange={e => updateComponent(comp.id, { obtainedMarks: Number(e.target.value) })}
                  suffix="Marks"
                />

                <InputField
                  label="Total Maximum"
                  type="number"
                  min="1"
                  value={comp.totalMarks || ''}
                  onChange={e => updateComponent(comp.id, { totalMarks: Number(e.target.value) })}
                  suffix="Marks"
                />

                <InputField
                  label="Weightage (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={comp.weightPercentage || ''}
                  onChange={e => updateComponent(comp.id, { weightPercentage: Number(e.target.value) })}
                  suffix="%"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Add Component CTA */}
        <div>
          <button
            onClick={addComponent}
            className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 bg-white dark:bg-slate-900 text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Component (Interview / Test / Bonus)</span>
          </button>
        </div>

      </div>

    </CalculatorLayout>
  );
};
