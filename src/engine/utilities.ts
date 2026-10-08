import { CalculationResult } from '../types';

/**
 * Age and Academic Cutoff Eligibility Calculator
 */
export function calculateAge(params: {
  birthDate: string; // YYYY-MM-DD
  cutoffDate?: string; // YYYY-MM-DD (e.g. admission cutoff date)
  minAgeRequired?: number; // e.g., 17
  maxAgeAllowed?: number; // e.g., 25
}): CalculationResult {
  const { birthDate, cutoffDate, minAgeRequired = 17, maxAgeAllowed = 25 } = params;

  if (!birthDate) {
    return {
      primaryValue: '0 years',
      primaryLabel: 'Calculated Age',
      statusType: 'error',
      statusMessage: 'Please select a valid date of birth.'
    };
  }

  const birth = new Date(birthDate);
  const target = cutoffDate ? new Date(cutoffDate) : new Date();

  if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
    return {
      primaryValue: '0 years',
      primaryLabel: 'Calculated Age',
      statusType: 'error',
      statusMessage: 'Invalid date input format.'
    };
  }

  if (birth > target) {
    return {
      primaryValue: '0 years',
      primaryLabel: 'Calculated Age',
      statusType: 'error',
      statusMessage: 'Date of birth cannot be in the future relative to the cutoff date.'
    };
  }

  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    // Days in previous month of target
    const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const exactDecimalAge = years + months / 12 + days / 365.25;
  const isEligible = exactDecimalAge >= minAgeRequired && exactDecimalAge <= maxAgeAllowed;

  let statusType: CalculationResult['statusType'] = 'info';
  let statusMessage = '';

  if (isEligible) {
    statusType = 'success';
    statusMessage = `✅ Age meets standard admission criteria (${minAgeRequired} to ${maxAgeAllowed} years bracket).`;
  } else if (exactDecimalAge < minAgeRequired) {
    statusType = 'warning';
    statusMessage = `Underage: Candidate is below minimum admission age of ${minAgeRequired} years by ${(minAgeRequired - exactDecimalAge).toFixed(1)} years.`;
  } else {
    statusType = 'warning';
    statusMessage = `Overage: Candidate exceeds maximum cutoff age of ${maxAgeAllowed} years. Age relaxation may be required.`;
  }

  // Calculate total days, weeks, months lived
  const diffTime = Math.abs(target.getTime() - birth.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  return {
    primaryValue: `${years} Yrs, ${months} Mos`,
    primaryLabel: 'Exact Age',
    primaryUnit: `${days} Days`,
    statusType,
    statusMessage,
    stats: [
      { label: 'Years, Months, Days', value: `${years}y ${months}m ${days}d`, subtext: 'Exact breakdown' },
      { label: 'Total Days Lived', value: totalDays.toLocaleString(), subtext: `${totalWeeks.toLocaleString()} weeks` },
      { label: 'Target Reference Date', value: target.toLocaleDateString('en-GB'), subtext: 'Admission cutoff' },
      { label: 'Admission Status', value: isEligible ? 'Eligible' : 'Check Age Policy', subtext: `${minAgeRequired}-${maxAgeAllowed} yrs bracket` }
    ],
    breakdown: [
      {
        step: 'Years Component',
        description: 'Complete calendar years elapsed',
        value: `${years} years`
      },
      {
        step: 'Months Component',
        description: 'Remaining whole calendar months',
        value: `${months} months`
      },
      {
        step: 'Days Component',
        description: 'Remaining calendar days',
        value: `${days} days`
      }
    ],
    notes: [
      'For medical (PMDC) and armed forces (PMA, PAF, Navy) admissions, age cutoff dates are strictly determined on the closing date of registration.',
      'Government job tests (FPSC / PPSC / CSS) frequently require precise age calculations on January 1st or cutoff dates.'
    ]
  };
}

/**
 * Date Difference & Semester Week Countdown
 */
export function calculateDateDifference(params: {
  startDate: string;
  endDate: string;
  excludeWeekends?: boolean;
}): CalculationResult {
  const { startDate, endDate, excludeWeekends = false } = params;

  if (!startDate || !endDate) {
    return {
      primaryValue: '0 days',
      primaryLabel: 'Date Difference',
      statusType: 'error',
      statusMessage: 'Please select both start and end dates.'
    };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return {
      primaryValue: '0 days',
      primaryLabel: 'Date Difference',
      statusType: 'error',
      statusMessage: 'Invalid date values provided.'
    };
  }

  const isPast = end < start;
  const tStart = isPast ? end : start;
  const tEnd = isPast ? start : end;

  const diffMs = tEnd.getTime() - tStart.getTime();
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  // Calculate working days (excluding Saturday & Sunday)
  let workingDays = 0;
  const cur = new Date(tStart);
  while (cur < tEnd) {
    const dayOfWeek = cur.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workingDays++;
    }
    cur.setDate(cur.getDate() + 1);
  }

  const semesterWeeks = (totalDays / 7).toFixed(1);

  return {
    primaryValue: `${totalDays} Days`,
    primaryLabel: isPast ? 'Days Elapsed' : 'Countdown Duration',
    primaryUnit: `(${weeks} wks, ${remainingDays} d)`,
    statusType: 'info',
    statusMessage: isPast ? 'The target date has already passed.' : `${totalDays} calendar days remaining until target date.`,
    stats: [
      { label: 'Calendar Weeks', value: `${weeks} Weeks`, subtext: `${remainingDays} days remaining` },
      { label: 'Working / Study Days', value: `${workingDays} Days`, subtext: 'Excludes Sat & Sun' },
      { label: 'Semester Progress', value: `~${semesterWeeks} Wks`, subtext: 'Standard semester is 16-18 wks' },
      { label: 'Total Hours', value: (totalDays * 24).toLocaleString(), unit: 'hours' }
    ],
    breakdown: [
      {
        step: 'Total Calendar Days',
        description: 'Exact day count between dates',
        value: `${totalDays} days`
      },
      {
        step: 'Weeks & Days Breakdown',
        description: 'Standard 7-day academic cycles',
        formula: `${weeks} × 7 + ${remainingDays}`,
        value: `${weeks} weeks, ${remainingDays} days`
      },
      {
        step: 'Working Days (Mon-Fri)',
        description: 'Study/University operational days',
        value: `${workingDays} working days`
      }
    ]
  };
}

/**
 * Academic Scale / Ratio Converter
 * Converts marks/scores across different maximum scales (e.g. 850 scale to 1100, 4.0 GPA to 5.0 or 10.0 scale)
 */
export function convertAcademicScale(params: {
  inputScore: number;
  inputMax: number;
  targetMax: number;
}): CalculationResult {
  const { inputScore, inputMax, targetMax } = params;

  if (inputMax <= 0 || targetMax <= 0 || isNaN(inputMax) || isNaN(targetMax)) {
    return {
      primaryValue: '0.00',
      primaryLabel: 'Scaled Score',
      statusType: 'error',
      statusMessage: 'Maximum scale values must be positive.'
    };
  }

  if (inputScore < 0 || isNaN(inputScore)) {
    return {
      primaryValue: '0.00',
      primaryLabel: 'Scaled Score',
      statusType: 'error',
      statusMessage: 'Score cannot be negative.'
    };
  }

  const fraction = inputScore / inputMax;
  const scaledScore = fraction * targetMax;
  const percentage = fraction * 100;

  return {
    primaryValue: scaledScore.toFixed(2),
    primaryLabel: 'Scaled Score',
    primaryUnit: `/ ${targetMax}`,
    statusType: 'success',
    statusMessage: `${inputScore} out of ${inputMax} (${percentage.toFixed(2)}%) equals ${scaledScore.toFixed(2)} out of ${targetMax}.`,
    stats: [
      { label: 'Original Score', value: `${inputScore} / ${inputMax}` },
      { label: 'Scaled Equivalent', value: `${scaledScore.toFixed(2)} / ${targetMax}` },
      { label: 'Percentage', value: `${percentage.toFixed(2)}%` },
      { label: 'Scale Multiplier', value: (targetMax / inputMax).toFixed(4), unit: '×' }
    ],
    breakdown: [
      {
        step: 'Calculate Percentage Ratio',
        description: 'Divide score by original scale maximum',
        formula: `(${inputScore} / ${inputMax})`,
        value: fraction.toFixed(4)
      },
      {
        step: 'Multiply by Target Scale',
        description: 'Scale fraction to target maximum',
        formula: `${fraction.toFixed(4)} × ${targetMax}`,
        value: scaledScore.toFixed(2)
      }
    ],
    explanation: [
      `Formula: Scaled Score = (Input Score ÷ Input Maximum) × Target Maximum`,
      `Calculation: (${inputScore} ÷ ${inputMax}) × ${targetMax} = ${scaledScore.toFixed(2)}`
    ]
  };
}
