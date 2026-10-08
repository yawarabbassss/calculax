import { CalculationResult } from '../types';
import { UNIVERSITY_CONFIGS, getUniversityConfig } from './universityRegistry';

export interface AdmissionComponentInput {
  id: string;
  name: string;
  obtainedMarks: number;
  totalMarks: number;
  weightPercentage: number;
}

/**
 * Calculate Pakistan MDCAT Aggregate
 */
export function calculateMDCATAggregate(params: {
  matricObtained: number;
  matricTotal: number;
  matricWeight: number; // e.g., 10
  fscObtained: number;
  fscTotal: number;
  fscWeight: number; // e.g., 40
  mdcatObtained: number;
  mdcatTotal: number;
  mdcatWeight: number; // e.g., 50
  universityPresetId?: string;
  hafizQuranBonus?: boolean; // +20 marks in FSc
}): CalculationResult {
  const {
    matricObtained,
    matricTotal = 1100,
    matricWeight = 10,
    fscObtained,
    fscTotal = 1100,
    fscWeight = 40,
    mdcatObtained,
    mdcatTotal = 200,
    mdcatWeight = 50,
    universityPresetId,
    hafizQuranBonus = false
  } = params;

  // Validation
  if (matricTotal <= 0 || fscTotal <= 0 || mdcatTotal <= 0) {
    return {
      primaryValue: '0.0000%',
      primaryLabel: 'MDCAT Aggregate',
      statusType: 'error',
      statusMessage: 'Total marks for all sections must be greater than zero.'
    };
  }

  const effectiveFscObtained = hafizQuranBonus ? Math.min(fscTotal, fscObtained + 20) : fscObtained;

  const matricPercent = (matricObtained / matricTotal) * 100;
  const fscPercent = (effectiveFscObtained / fscTotal) * 100;
  const mdcatPercent = (mdcatObtained / mdcatTotal) * 100;

  const matricWeighted = (matricPercent * matricWeight) / 100;
  const fscWeighted = (fscPercent * fscWeight) / 100;
  const mdcatWeighted = (mdcatPercent * mdcatWeight) / 100;

  const totalWeight = matricWeight + fscWeight + mdcatWeight;
  const finalAggregate = matricWeighted + fscWeighted + mdcatWeighted;

  // Medical eligibility criteria checks
  const isEligibleMbbs = mdcatPercent >= 55 && fscPercent >= 60;
  const isEligibleBds = mdcatPercent >= 50 && fscPercent >= 60;

  let statusType: CalculationResult['statusType'] = 'info';
  let statusMessage = '';

  if (finalAggregate >= 90.0) {
    statusType = 'success';
    statusMessage = '🌟 Outstanding aggregate! Highly competitive for top public medical colleges (e.g., KEMU, AIMC, AMC, DMC).';
  } else if (finalAggregate >= 85.0) {
    statusType = 'success';
    statusMessage = 'Strong aggregate. Solid chances in public medical & dental colleges.';
  } else if (finalAggregate >= 75.0) {
    statusType = 'info';
    statusMessage = 'Good standing for private medical colleges and allied health sciences programs.';
  } else if (isEligibleMbbs) {
    statusType = 'warning';
    statusMessage = 'Meets minimum PM&DC criteria for MBBS application.';
  } else {
    statusType = 'error';
    statusMessage = 'Does not meet minimum PM&DC threshold (55% MDCAT & 60% FSc required for MBBS).';
  }

  const preset = universityPresetId ? getUniversityConfig(universityPresetId) : undefined;

  return {
    primaryValue: `${finalAggregate.toFixed(4)}%`,
    primaryLabel: 'Final MDCAT Aggregate',
    statusType,
    statusMessage,
    stats: [
      { label: 'Matric Contribution', value: `${matricWeighted.toFixed(3)}%`, subtext: `${matricPercent.toFixed(2)}% score (${matricWeight}% wt)` },
      { label: 'FSc Contribution', value: `${fscWeighted.toFixed(3)}%`, subtext: `${fscPercent.toFixed(2)}% score (${fscWeight}% wt)` },
      { label: 'MDCAT Contribution', value: `${mdcatWeighted.toFixed(3)}%`, subtext: `${mdcatPercent.toFixed(2)}% score (${mdcatWeight}% wt)` },
      { label: 'MBBS Eligibility', value: isEligibleMbbs ? 'Eligible' : 'Ineligible', subtext: 'PM&DC 55% min test' }
    ],
    breakdown: [
      {
        step: 'Matric / SSC Component',
        description: `(${matricObtained} / ${matricTotal}) × ${matricWeight}%`,
        formula: `(${matricPercent.toFixed(2)}% × ${matricWeight}) / 100`,
        value: `${matricWeighted.toFixed(4)}%`,
        details: `${matricObtained} marks out of ${matricTotal}`
      },
      {
        step: 'FSc (Pre-Medical) Component',
        description: hafizQuranBonus ? `(${effectiveFscObtained} [incl. +20 Hafiz bonus] / ${fscTotal}) × ${fscWeight}%` : `(${effectiveFscObtained} / ${fscTotal}) × ${fscWeight}%`,
        formula: `(${fscPercent.toFixed(2)}% × ${fscWeight}) / 100`,
        value: `${fscWeighted.toFixed(4)}%`,
        details: `${effectiveFscObtained} marks out of ${fscTotal}`
      },
      {
        step: 'MDCAT Test Component',
        description: `(${mdcatObtained} / ${mdcatTotal}) × ${mdcatWeight}%`,
        formula: `(${mdcatPercent.toFixed(2)}% × ${mdcatWeight}) / 100`,
        value: `${mdcatWeighted.toFixed(4)}%`,
        details: `${mdcatObtained} marks out of ${mdcatTotal}`
      },
      {
        step: 'Sum Total Aggregate',
        description: `${matricWeighted.toFixed(4)}% + ${fscWeighted.toFixed(4)}% + ${mdcatWeighted.toFixed(4)}%`,
        formula: `Matric + FSc + MDCAT`,
        value: `${finalAggregate.toFixed(4)}%`
      }
    ],
    explanation: [
      `Matric contribution: (${matricObtained} ÷ ${matricTotal}) × ${matricWeight}% = ${matricWeighted.toFixed(4)}%`,
      `FSc contribution: (${effectiveFscObtained} ÷ ${fscTotal}) × ${fscWeight}% = ${fscWeighted.toFixed(4)}%`,
      `MDCAT contribution: (${mdcatObtained} ÷ ${mdcatTotal}) × ${mdcatWeight}% = ${mdcatWeighted.toFixed(4)}%`,
      `Final Aggregate = ${matricWeighted.toFixed(4)}% + ${fscWeighted.toFixed(4)}% + ${mdcatWeighted.toFixed(4)}% = ${finalAggregate.toFixed(4)}%`
    ],
    notes: [
      preset ? `Configured for: ${preset.name} (${preset.effectiveYear})` : 'Standard PM&DC 50-40-10 formula applied.',
      totalWeight !== 100 ? `Warning: Total weightages equal ${totalWeight}%, not 100%.` : 'Weightages sum to exactly 100%.',
      'Admission cut-off merit varies each year according to official provincial lists.'
    ],
    disclaimer: 'Calculax provides calculation tools for informational purposes. University admission criteria, grading policies, and aggregate weightages can change. Always verify the latest official criteria with the relevant institution.'
  };
}

/**
 * Universal Multi-Track Admission Merit Calculator
 */
export function calculateUniversityMerit(params: {
  components: AdmissionComponentInput[];
  universityConfigId?: string;
  bonusMarks?: number;
}): CalculationResult {
  const { components, universityConfigId, bonusMarks = 0 } = params;

  if (components.length === 0) {
    return {
      primaryValue: '0.0000%',
      primaryLabel: 'Admission Aggregate',
      statusType: 'neutral',
      statusMessage: 'Add admission components or choose a university preset to calculate merit.'
    };
  }

  let totalAggregate = 0;
  let totalWeightage = 0;

  const breakdown: CalculationResult['breakdown'] = [];
  const stats: CalculationResult['stats'] = [];

  components.forEach(comp => {
    if (comp.totalMarks <= 0 || isNaN(comp.totalMarks)) return;

    const obtained = Math.max(0, comp.obtainedMarks);
    const percent = (obtained / comp.totalMarks) * 100;
    const weighted = (percent * comp.weightPercentage) / 100;

    totalAggregate += weighted;
    totalWeightage += comp.weightPercentage;

    stats.push({
      label: comp.name,
      value: `${weighted.toFixed(3)}%`,
      subtext: `${obtained}/${comp.totalMarks} (${percent.toFixed(1)}%) @ ${comp.weightPercentage}% wt`
    });

    breakdown.push({
      step: comp.name,
      description: `${obtained} / ${comp.totalMarks} (${percent.toFixed(2)}%) × ${comp.weightPercentage}% weight`,
      formula: `(${percent.toFixed(2)}% × ${comp.weightPercentage}) / 100`,
      value: `${weighted.toFixed(4)}%`,
      details: `${obtained} marks out of ${comp.totalMarks}`
    });
  });

  const university = universityConfigId ? getUniversityConfig(universityConfigId) : undefined;

  let statusType: CalculationResult['statusType'] = 'info';
  if (totalAggregate >= 80.0) statusType = 'success';
  else if (totalAggregate >= 65.0) statusType = 'info';
  else if (totalAggregate >= 50.0) statusType = 'warning';
  else statusType = 'error';

  return {
    primaryValue: `${totalAggregate.toFixed(4)}%`,
    primaryLabel: university ? `${university.shortName} Aggregate` : 'Total Merit Aggregate',
    statusType,
    statusMessage: university ? `Calculated based on ${university.name} official admission formula.` : `Total weighted aggregate across ${components.length} components.`,
    stats,
    breakdown,
    explanation: [
      `Overall Aggregate = Sum of (Component Percentage × Weightage %)`,
      `Final Calculated Score: ${totalAggregate.toFixed(4)}% out of ${totalWeightage}% total weight`
    ],
    notes: [
      university ? `Degree track: ${university.degreeType} (${university.effectiveYear})` : 'Custom merit breakdown calculated.',
      totalWeightage !== 100 ? `Note: Configured weights total ${totalWeightage}% (recommended 100%).` : 'Weightages sum to 100%.'
    ],
    disclaimer: 'Admission cutoffs and merit criteria change annually. Please refer to official university prospectuses for binding criteria.'
  };
}
