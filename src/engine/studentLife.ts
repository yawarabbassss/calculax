import { CalculationResult } from '../types';

/**
 * Attendance Calculator & Bunk Planner
 */
export function calculateAttendance(params: {
  totalClasses: number;
  attendedClasses: number;
  targetPercentage?: number; // e.g. 75
}): CalculationResult & {
  currentPercentage: number;
  classesNeeded: number;
  classesCanMiss: number;
  isMeetingTarget: boolean;
} {
  const { totalClasses, attendedClasses, targetPercentage = 75 } = params;

  if (totalClasses <= 0 || isNaN(totalClasses)) {
    return {
      primaryValue: '0.00%',
      primaryLabel: 'Current Attendance',
      statusType: 'error',
      statusMessage: 'Total classes conducted must be greater than zero.',
      currentPercentage: 0,
      classesNeeded: 0,
      classesCanMiss: 0,
      isMeetingTarget: false
    };
  }

  if (attendedClasses < 0 || isNaN(attendedClasses)) {
    return {
      primaryValue: '0.00%',
      primaryLabel: 'Current Attendance',
      statusType: 'error',
      statusMessage: 'Attended classes cannot be negative.',
      currentPercentage: 0,
      classesNeeded: 0,
      classesCanMiss: 0,
      isMeetingTarget: false
    };
  }

  if (attendedClasses > totalClasses) {
    return {
      primaryValue: '100.00%',
      primaryLabel: 'Current Attendance',
      statusType: 'error',
      statusMessage: 'Attended classes cannot exceed total classes conducted.',
      currentPercentage: 100,
      classesNeeded: 0,
      classesCanMiss: 0,
      isMeetingTarget: true
    };
  }

  const currentPercentage = (attendedClasses / totalClasses) * 100;
  const missedClasses = totalClasses - attendedClasses;
  const target = Math.min(100, Math.max(1, targetPercentage));
  const isMeetingTarget = currentPercentage >= target;

  let classesNeeded = 0;
  let classesCanMiss = 0;

  if (!isMeetingTarget) {
    // Formula: x = ceil((target * total - 100 * attended) / (100 - target))
    if (target < 100) {
      const numerator = target * totalClasses - 100 * attendedClasses;
      const denominator = 100 - target;
      classesNeeded = Math.ceil(numerator / denominator);
      if (classesNeeded < 0) classesNeeded = 0;
    } else {
      // Target 100% is impossible if even 1 class missed
      classesNeeded = Infinity;
    }
  } else {
    // Formula: y = floor((100 * attended - target * total) / target)
    const numerator = 100 * attendedClasses - target * totalClasses;
    classesCanMiss = Math.floor(numerator / target);
    if (classesCanMiss < 0) classesCanMiss = 0;
  }

  let statusType: CalculationResult['statusType'] = 'info';
  let statusMessage = '';

  if (isMeetingTarget) {
    statusType = 'success';
    if (classesCanMiss > 0) {
      statusMessage = `✅ You are safe! You can miss up to next ${classesCanMiss} ${classesCanMiss === 1 ? 'class' : 'classes'} and still maintain above ${target}%.`;
    } else {
      statusMessage = `⚠️ You are currently on the line at ${currentPercentage.toFixed(1)}%. Do not miss any upcoming classes.`;
    }
  } else {
    statusType = currentPercentage >= 60 ? 'warning' : 'error';
    if (classesNeeded === Infinity) {
      statusMessage = `❌ Because you missed ${missedClasses} classes, reaching 100% attendance is mathematically impossible.`;
    } else {
      statusMessage = `🚨 Attendance is low (${currentPercentage.toFixed(1)}%). You must attend the next ${classesNeeded} consecutive ${classesNeeded === 1 ? 'class' : 'classes'} without absence to reach ${target}%.`;
    }
  }

  return {
    primaryValue: `${currentPercentage.toFixed(2)}%`,
    primaryLabel: 'Attendance Status',
    statusType,
    statusMessage,
    stats: [
      { label: 'Attended Classes', value: `${attendedClasses} / ${totalClasses}`, subtext: `${missedClasses} missed` },
      { label: 'Target Requirement', value: `${target}%`, subtext: 'Institutional standard' },
      {
        label: isMeetingTarget ? 'Safe Absences Allowed' : 'Required Classes',
        value: isMeetingTarget ? `${classesCanMiss} classes` : (classesNeeded === Infinity ? 'Impossible' : `${classesNeeded} classes`),
        subtext: isMeetingTarget ? `Can skip without dropping below ${target}%` : `Consecutive attendance needed`
      },
      { label: 'Status', value: isMeetingTarget ? 'Eligible' : 'At Risk', subtext: isMeetingTarget ? 'Exam clearance granted' : 'Fine/Detention risk' }
    ],
    breakdown: [
      {
        step: 'Current Attendance Percentage',
        description: 'Attended divided by total held classes',
        formula: `(${attendedClasses} / ${totalClasses}) × 100`,
        value: `${currentPercentage.toFixed(2)}%`
      },
      isMeetingTarget ? {
        step: 'Bunk Buffer Calculation',
        description: `Max future absences allowed while staying ≥ ${target}%`,
        formula: `⌊(100 × ${attendedClasses} - ${target} × ${totalClasses}) ÷ ${target}⌋`,
        value: `${classesCanMiss} classes`
      } : {
        step: 'Attendance Recovery Calculation',
        description: `Consecutive classes to attend to reach ≥ ${target}%`,
        formula: target < 100 ? `⌈(${target} × ${totalClasses} - 100 × ${attendedClasses}) ÷ (100 - ${target})⌉` : 'Impossible (missed classes exist)',
        value: classesNeeded === Infinity ? 'N/A' : `${classesNeeded} classes`
      }
    ],
    explanation: [
      `Classes attended: ${attendedClasses} out of ${totalClasses} conducted (${missedClasses} missed).`,
      isMeetingTarget
        ? `With ${currentPercentage.toFixed(2)}% attendance, you have a cushion of ${classesCanMiss} ${classesCanMiss === 1 ? 'class' : 'classes'} before reaching the ${target}% threshold.`
        : `To recover from ${currentPercentage.toFixed(2)}% to ${target}%, attending ${classesNeeded} additional consecutive lectures increases your record to ${attendedClasses + classesNeeded}/${totalClasses + classesNeeded} (${(((attendedClasses + classesNeeded) / (totalClasses + classesNeeded)) * 100).toFixed(1)}%).`
    ],
    notes: [
      'Most universities in Pakistan (HEC/PEC/PM&DC) mandate a strict minimum 75% or 80% attendance to sit in final exams.',
      'Check if medical leave or sports duty exemptions apply at your institution.'
    ],
    currentPercentage,
    classesNeeded,
    classesCanMiss,
    isMeetingTarget
  };
}

/**
 * Study Time & Exam Preparation Planner
 */
export function calculateStudyTime(params: {
  totalTopics: number;
  averageHoursPerTopic: number;
  daysRemaining: number;
  dailyAvailableHours: number;
  reviewBufferDays?: number;
}): CalculationResult {
  const {
    totalTopics,
    averageHoursPerTopic = 2.5,
    daysRemaining,
    dailyAvailableHours,
    reviewBufferDays = 2
  } = params;

  if (totalTopics <= 0 || daysRemaining <= 0 || dailyAvailableHours <= 0) {
    return {
      primaryValue: '0 hrs/day',
      primaryLabel: 'Required Study Time',
      statusType: 'error',
      statusMessage: 'Please enter positive values for topics, days, and available hours.'
    };
  }

  const totalStudyHoursNeeded = totalTopics * averageHoursPerTopic;
  const effectiveStudyDays = Math.max(1, daysRemaining - reviewBufferDays);
  const requiredHoursPerDay = totalStudyHoursNeeded / effectiveStudyDays;
  const totalCapacityHours = daysRemaining * dailyAvailableHours;
  const studyDeficit = totalStudyHoursNeeded - totalCapacityHours;

  const isFeasible = requiredHoursPerDay <= dailyAvailableHours;

  let statusType: CalculationResult['statusType'] = 'info';
  let statusMessage = '';

  if (requiredHoursPerDay <= dailyAvailableHours * 0.7) {
    statusType = 'success';
    statusMessage = `✨ Very manageable schedule! You only need ~${requiredHoursPerDay.toFixed(1)} hrs/day to cover all topics with ${reviewBufferDays} review days to spare.`;
  } else if (isFeasible) {
    statusType = 'warning';
    statusMessage = `⚡ Intensive but doable: Study ${requiredHoursPerDay.toFixed(1)} hrs/day to complete syllabus on time.`;
  } else {
    statusType = 'error';
    statusMessage = `🚨 Time crunch! You need ${requiredHoursPerDay.toFixed(1)} hrs/day, which exceeds your planned ${dailyAvailableHours} hrs daily availability by ${studyDeficit.toFixed(1)} total hours.`;
  }

  return {
    primaryValue: `${requiredHoursPerDay.toFixed(1)} hrs`,
    primaryLabel: 'Required Daily Study Time',
    primaryUnit: `/ day`,
    statusType,
    statusMessage,
    stats: [
      { label: 'Total Study Needed', value: `${totalStudyHoursNeeded.toFixed(1)} hrs`, subtext: `${totalTopics} topics × ${averageHoursPerTopic}h` },
      { label: 'Active Study Days', value: effectiveStudyDays, unit: 'days', subtext: `${reviewBufferDays} days reserved for review` },
      { label: 'Topics Per Day', value: (totalTopics / effectiveStudyDays).toFixed(1), subtext: 'Daily target' },
      { label: 'Schedule Feasibility', value: isFeasible ? 'Achievable' : 'Overloaded', subtext: `${(totalStudyHoursNeeded / totalCapacityHours * 100).toFixed(0)}% capacity used` }
    ],
    breakdown: [
      {
        step: 'Total Study Hours Required',
        description: 'Topics multiplied by estimated study hours per topic',
        formula: `${totalTopics} × ${averageHoursPerTopic} hrs`,
        value: `${totalStudyHoursNeeded.toFixed(1)} hrs`
      },
      {
        step: 'Active Study Days',
        description: 'Days left minus revision buffer',
        formula: `${daysRemaining} days - ${reviewBufferDays} buffer`,
        value: `${effectiveStudyDays} days`
      },
      {
        step: 'Daily Target',
        description: 'Hours divided by active days',
        formula: `${totalStudyHoursNeeded.toFixed(1)} hrs ÷ ${effectiveStudyDays} days`,
        value: `${requiredHoursPerDay.toFixed(1)} hrs/day`
      }
    ],
    explanation: [
      `To cover all ${totalTopics} topics thoroughly (${totalStudyHoursNeeded.toFixed(1)} total hours) in ${effectiveStudyDays} days, aim for ${requiredHoursPerDay.toFixed(1)} hours of focused study every day.`,
      `Save the final ${reviewBufferDays} days before the exam exclusively for past papers, formula sheets, and flashcards.`
    ]
  };
}

/**
 * Merit Scholarship & Tuition Fee Waiver Calculator
 */
export function calculateScholarshipEligibility(params: {
  cgpaOrAggregate: number;
  metricType: 'cgpa' | 'percentage';
  semesterTuitionFee: number;
}): CalculationResult {
  const { cgpaOrAggregate, metricType, semesterTuitionFee } = params;

  let waiverPercent = 0;
  let tierName = 'No Scholarship';

  if (metricType === 'cgpa') {
    if (cgpaOrAggregate >= 3.90) {
      waiverPercent = 100;
      tierName = 'Presidential / 100% Full Tuition Merit Waiver';
    } else if (cgpaOrAggregate >= 3.75) {
      waiverPercent = 75;
      tierName = 'Dean’s Honor Roll / 75% Tuition Waiver';
    } else if (cgpaOrAggregate >= 3.50) {
      waiverPercent = 50;
      tierName = 'Merit Tier-2 / 50% Tuition Waiver';
    } else if (cgpaOrAggregate >= 3.25) {
      waiverPercent = 25;
      tierName = 'Merit Tier-3 / 25% Tuition Waiver';
    }
  } else {
    // Percentage / Entry Test aggregate
    if (cgpaOrAggregate >= 90.0) {
      waiverPercent = 100;
      tierName = '100% Top Position Merit Scholarship';
    } else if (cgpaOrAggregate >= 85.0) {
      waiverPercent = 75;
      tierName = '75% High Distinction Scholarship';
    } else if (cgpaOrAggregate >= 80.0) {
      waiverPercent = 50;
      tierName = '50% Merit Scholarship';
    } else if (cgpaOrAggregate >= 75.0) {
      waiverPercent = 25;
      tierName = '25% Academic Incentive';
    }
  }

  const feeSaved = (waiverPercent / 100) * semesterTuitionFee;
  const netPayable = Math.max(0, semesterTuitionFee - feeSaved);

  return {
    primaryValue: `${waiverPercent}% Waiver`,
    primaryLabel: 'Estimated Scholarship',
    statusType: waiverPercent > 0 ? 'success' : 'neutral',
    statusMessage: waiverPercent > 0 ? `Qualified for ${tierName}!` : 'Below typical 3.25 CGPA / 75% merit scholarship cutoffs.',
    stats: [
      { label: 'Scholarship Bracket', value: `${waiverPercent}%`, subtext: tierName },
      { label: 'Tuition Savings', value: `Rs. ${feeSaved.toLocaleString()}`, subtext: 'Per semester' },
      { label: 'Net Payable Fee', value: `Rs. ${netPayable.toLocaleString()}`, subtext: 'After waiver' },
      { label: 'Retention Requirement', value: metricType === 'cgpa' ? '3.50 CGPA' : '80% Marks', subtext: 'To renew each semester' }
    ],
    breakdown: [
      {
        step: 'Tuition Fee Discount',
        description: `${waiverPercent}% applied to semester fee`,
        formula: `(${waiverPercent}% × Rs. ${semesterTuitionFee.toLocaleString()})`,
        value: `Rs. ${feeSaved.toLocaleString()}`
      },
      {
        step: 'Net Balance Remaining',
        description: 'Semester tuition minus scholarship reward',
        formula: `Rs. ${semesterTuitionFee.toLocaleString()} - Rs. ${feeSaved.toLocaleString()}`,
        value: `Rs. ${netPayable.toLocaleString()}`
      }
    ],
    notes: [
      'Scholarship policies vary across universities (NUST, FAST, LUMS, COMSATS, GIKI, IBA, etc.). Check your university financial aid office for specific terms.',
      'Need-based scholarships (such as HEC Ehsaas, PEEF, USAID) have separate criteria from merit waivers.'
    ]
  };
}
