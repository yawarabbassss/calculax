import React, { useState, useEffect } from 'react';
import { Sparkles, Building2, CheckSquare, Square } from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { calculateMDCATAggregate } from '../../engine/admissions';
import { UNIVERSITY_CONFIGS } from '../../engine/universityRegistry';
import { CalculatorLayout } from '../calculator/CalculatorLayout';
import { InputField } from '../calculator/InputField';
import { SelectField } from '../calculator/SelectField';
import { useHistory } from '../../context/HistoryContext';

interface MDCATAggregateViewProps {
  meta: CalculatorMeta;
  onOpenExport?: () => void;
  onNavigate?: (route: string) => void;
  initialSnapshot?: any;
}

export const MDCATAggregateView: React.FC<MDCATAggregateViewProps> = ({
  meta,
  onOpenExport,
  onNavigate,
  initialSnapshot
}) => {
  const [presetId, setPresetId] = useState<string>(initialSnapshot?.presetId || 'pmdc-mdcat-standard');
  const [matricObtained, setMatricObtained] = useState<number>(initialSnapshot?.matricObtained ?? 1020);
  const [matricTotal, setMatricTotal] = useState<number>(initialSnapshot?.matricTotal ?? 1100);
  const [matricWeight, setMatricWeight] = useState<number>(initialSnapshot?.matricWeight ?? 10);

  const [fscObtained, setFscObtained] = useState<number>(initialSnapshot?.fscObtained ?? 1010);
  const [fscTotal, setFscTotal] = useState<number>(initialSnapshot?.fscTotal ?? 1100);
  const [fscWeight, setFscWeight] = useState<number>(initialSnapshot?.fscWeight ?? 40);

  const [mdcatObtained, setMdcatObtained] = useState<number>(initialSnapshot?.mdcatObtained ?? 178);
  const [mdcatTotal, setMdcatTotal] = useState<number>(initialSnapshot?.mdcatTotal ?? 200);
  const [mdcatWeight, setMdcatWeight] = useState<number>(initialSnapshot?.mdcatWeight ?? 50);

  const [hafizQuranBonus, setHafizQuranBonus] = useState<boolean>(initialSnapshot?.hafizQuranBonus ?? false);
  const [showCustomWeights, setShowCustomWeights] = useState<boolean>(false);

  const { addHistoryItem } = useHistory();

  // Apply preset changes
  const handlePresetChange = (id: string) => {
    setPresetId(id);
    if (id === 'custom') {
      setShowCustomWeights(true);
      return;
    }
    const preset = UNIVERSITY_CONFIGS.find(u => u.id === id);
    if (preset) {
      const m = preset.components.find(c => c.id === 'matric');
      const f = preset.components.find(c => c.id === 'fsc');
      const md = preset.components.find(c => c.id === 'mdcat' || c.id === 'nums_test');
      if (m) {
        setMatricWeight(m.defaultWeight);
        if (m.maxMarksDefault) setMatricTotal(m.maxMarksDefault);
      }
      if (f) {
        setFscWeight(f.defaultWeight);
        if (f.maxMarksDefault) setFscTotal(f.maxMarksDefault);
      }
      if (md) {
        setMdcatWeight(md.defaultWeight);
        if (md.maxMarksDefault) setMdcatTotal(md.maxMarksDefault);
      }
    }
  };

  const result = calculateMDCATAggregate({
    matricObtained,
    matricTotal,
    matricWeight,
    fscObtained,
    fscTotal,
    fscWeight,
    mdcatObtained,
    mdcatTotal,
    mdcatWeight,
    universityPresetId: presetId === 'custom' ? undefined : presetId,
    hafizQuranBonus
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (matricObtained > 0 && fscObtained > 0 && mdcatObtained > 0) {
        addHistoryItem({
          calculatorId: meta.id,
          calculatorName: meta.name,
          category: meta.category,
          summary: `Matric: ${matricObtained}/${matricTotal} • FSc: ${fscObtained}/${fscTotal} • MDCAT: ${mdcatObtained}/${mdcatTotal}`,
          primaryResult: String(result.primaryValue),
          primaryLabel: result.primaryLabel,
          inputSnapshot: {
            presetId,
            matricObtained,
            matricTotal,
            matricWeight,
            fscObtained,
            fscTotal,
            fscWeight,
            mdcatObtained,
            mdcatTotal,
            mdcatWeight,
            hafizQuranBonus
          }
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [matricObtained, fscObtained, mdcatObtained, result.primaryValue, hafizQuranBonus, presetId]);

  const handleReset = () => {
    setMatricObtained(0);
    setFscObtained(0);
    setMdcatObtained(0);
    setHafizQuranBonus(false);
  };

  const handleLoadSample = () => {
    setPresetId('pmdc-mdcat-standard');
    setMatricObtained(1035);
    setMatricTotal(1100);
    setMatricWeight(10);
    setFscObtained(1025);
    setFscTotal(1100);
    setFscWeight(40);
    setMdcatObtained(182);
    setMdcatTotal(200);
    setMdcatWeight(50);
    setHafizQuranBonus(false);
  };

  const medicalPresets = UNIVERSITY_CONFIGS.filter(u => u.category === 'medical').map(u => ({
    value: u.id,
    label: u.name,
    subtext: u.formulaDescription
  }));

  const presetOptions = [
    ...medicalPresets,
    { value: 'custom', label: 'Custom Weightages', subtext: 'Adjust your own % ratios' }
  ];

  return (
    <CalculatorLayout
      meta={meta}
      result={result}
      onReset={handleReset}
      onLoadSample={handleLoadSample}
      onOpenExport={onOpenExport}
      onNavigate={onNavigate}
    >
      {/* University / Province Preset Selection */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
        <SelectField
          label="Provincial / University Admission Policy"
          sublabel="Official PM&DC Formulas"
          options={presetOptions}
          value={presetId}
          onChange={e => handlePresetChange(e.target.value)}
        />
        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-500 dark:text-slate-400">
            Formula: {matricWeight}% Matric + {fscWeight}% FSc + {mdcatWeight}% MDCAT
          </span>
          <button
            type="button"
            onClick={() => setShowCustomWeights(!showCustomWeights)}
            className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
          >
            {showCustomWeights ? 'Hide Custom Weights' : 'Customize Weightages'}
          </button>
        </div>
      </div>

      {/* Inputs Breakdown */}
      <div className="space-y-5">
        
        {/* Matric Section */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              1. Matric / SSC / O-Level
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
              {matricWeight}% Weight
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="Matric Marks Obtained"
              type="number"
              min="0"
              max={matricTotal}
              value={matricObtained || ''}
              onChange={e => setMatricObtained(Number(e.target.value))}
              placeholder="e.g. 1020"
              suffix="Marks"
            />
            <InputField
              label="Total Matric Marks"
              type="number"
              min="1"
              value={matricTotal || ''}
              onChange={e => setMatricTotal(Number(e.target.value))}
              placeholder="e.g. 1100"
              suffix="Marks"
            />
          </div>

          {showCustomWeights && (
            <InputField
              label="Matric Weightage %"
              type="number"
              min="0"
              max="100"
              value={matricWeight}
              onChange={e => setMatricWeight(Number(e.target.value))}
              suffix="%"
            />
          )}
        </div>

        {/* FSc Section */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              2. FSc (Pre-Medical) / HSSC
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
              {fscWeight}% Weight
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="FSc Marks Obtained"
              type="number"
              min="0"
              max={fscTotal}
              value={fscObtained || ''}
              onChange={e => setFscObtained(Number(e.target.value))}
              placeholder="e.g. 1010"
              suffix="Marks"
            />
            <InputField
              label="Total FSc Marks"
              type="number"
              min="1"
              value={fscTotal || ''}
              onChange={e => setFscTotal(Number(e.target.value))}
              placeholder="e.g. 1100"
              suffix="Marks"
            />
          </div>

          {showCustomWeights && (
            <InputField
              label="FSc Weightage %"
              type="number"
              min="0"
              max="100"
              value={fscWeight}
              onChange={e => setFscWeight(Number(e.target.value))}
              suffix="%"
            />
          )}
        </div>

        {/* MDCAT Section */}
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              3. MDCAT Entrance Test
            </h4>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300">
              {mdcatWeight}% Weight
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField
              label="MDCAT Score"
              type="number"
              min="0"
              max={mdcatTotal}
              value={mdcatObtained || ''}
              onChange={e => setMdcatObtained(Number(e.target.value))}
              placeholder="e.g. 178"
              suffix="/ 200"
            />
            <InputField
              label="Total MDCAT Marks"
              type="number"
              min="1"
              value={mdcatTotal || ''}
              onChange={e => setMdcatTotal(Number(e.target.value))}
              placeholder="e.g. 200"
              suffix="Marks"
            />
          </div>

          {showCustomWeights && (
            <InputField
              label="MDCAT Weightage %"
              type="number"
              min="0"
              max="100"
              value={mdcatWeight}
              onChange={e => setMdcatWeight(Number(e.target.value))}
              suffix="%"
            />
          )}
        </div>

        {/* Hafiz-e-Quran Bonus Checkbox */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              Hafiz-e-Quran Bonus
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Adds +20 marks to FSc total according to PM&DC / Board regulations (upon verification test).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHafizQuranBonus(!hafizQuranBonus)}
            className="p-1 text-brand-600 dark:text-brand-400 focus:outline-none"
          >
            {hafizQuranBonus ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6 text-slate-400" />}
          </button>
        </div>

      </div>

    </CalculatorLayout>
  );
};
