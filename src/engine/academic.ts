import { CalculationResult, GradingScale } from '../types';
import { getGradingScale, getGradePointFromLetter } from './gradingScales';

export interface CourseInput {
  id: string;
  name: string;
  creditHours: number;
  grade: string; // letter or direct grade point
  gradePoint?: number;
}

export interface SemesterInput {
  id: string;
  name: string;
  courses: CourseInput[];
}

/**
 * Calculate GPA for a single list of courses
 */
export function calculateSemesterGPA(
  courses: CourseInput[],
  scaleId: string = 'standard-4.0'
): CalculationResult {
  const scale = getGradingScale(scaleId);

  // Filter valid courses (credit hours > 0)
  const validCourses = courses.filter(c => c.creditHours > 0);

  if (validCourses.length === 0) {
    return {
      primaryValue: '0.00',
      primaryLabel: 'Semester GPA',
      statusType: 'neutral',
      statusMessage: 'Add courses with credit hours to calculate GPA.',
      stats: [
        { label: 'Total Credits', value: 0, unit: 'hrs' },
        { label: 'Total Quality Points', value: '0.00' },
        { label: 'Courses Count', value: 0 }
      ],
      breakdown: [],
      explanation: [
        'Formula: GPA = Total Quality Points / Total Credit Hours',
        'Quality Points for each course = Credit Hours × Grade Points'
      ]
    };
  }

  let totalCredits = 0;
  let totalQualityPoints = 0;

  const breakdownRows = validCourses.map(course => {
    // Resolve grade point via universal resolver
    const gp = course.gradePoint !== undefined && !isNaN(course.gradePoint)
      ? course.gradePoint
      : getGradePointFromLetter(scale, course.grade);

    const qp = course.creditHours * gp;
    totalCredits += course.creditHours;
    totalQualityPoints += qp;

    return {
      step: course.name || 'Course',
      description: `${course.creditHours} Credits × ${gp.toFixed(2)} GP (${course.grade})`,
      formula: `${course.creditHours} × ${gp.toFixed(2)}`,
      value: qp.toFixed(2),
      details: `Quality Points: ${qp.toFixed(2)}`
    };
  });

  const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
  const roundedGpa = Math.min(scale.maxGpa, Math.max(0, gpa));

  let statusType: CalculationResult['statusType'] = 'neutral';
  let statusMessage = '';
  if (roundedGpa >= 3.7) {
    statusType = 'success';
    statusMessage = 'Outstanding performance! Dean\'s Honor Roll standing.';
  } else if (roundedGpa >= 3.0) {
    statusType = 'success';
    statusMessage = 'Great academic standing.';
  } else if (roundedGpa >= 2.0) {
    statusType = 'warning';
    statusMessage = 'Satisfactory standing. Above minimum passing requirements.';
  } else {
    statusType = 'error';
    statusMessage = 'Below academic probation threshold in most universities.';
  }

  return {
    primaryValue: roundedGpa.toFixed(2),
    primaryLabel: 'Semester GPA',
    primaryUnit: `/ ${scale.maxGpa.toFixed(1)}`,
    statusType,
    statusMessage,
    stats: [
      { label: 'Total Credits', value: totalCredits, unit: 'hrs', subtext: 'Earned' },
      { label: 'Quality Points', value: totalQualityPoints.toFixed(2), subtext: 'Total earned' },
      { label: 'Course Count', value: validCourses.length, subtext: 'Enrolled' },
      { label: 'Grading Scale', value: scale.name, subtext: scale.institution || 'Standard' }
    ],
    breakdown: breakdownRows,
    explanation: [
      'Formula: Semester GPA = Total Quality Points ÷ Total Credit Hours',
      `Calculation: ${totalQualityPoints.toFixed(2)} QP ÷ ${totalCredits} Credit Hours = ${roundedGpa.toFixed(2)} GPA`
    ],
    notes: [
      `Grading scale used: ${scale.name} (Max GPA: ${scale.maxGpa.toFixed(1)})`,
      'Courses with 0 credit hours (non-credit / audited) are excluded from the GPA calculation.'
    ]
  };
}

/**
 * Calculate multi-semester Cumulative CGPA
 */
export function calculateCumulativeCGPA(
  semesters: SemesterInput[],
  scaleId: string = 'standard-4.0'
): CalculationResult & { semesterResults: { semesterName: string; gpa: number; credits: number; qualityPoints: number }[] } {
  const scale = getGradingScale(scaleId);

  let cumulativeCredits = 0;
  let cumulativeQualityPoints = 0;
  let totalCoursesCount = 0;

  const semesterResults: { semesterName: string; gpa: number; credits: number; qualityPoints: number }[] = [];
  const breakdown: CalculationResult['breakdown'] = [];

  semesters.forEach((sem, index) => {
    let semCredits = 0;
    let semQualityPoints = 0;

    const validCourses = sem.courses.filter(c => c.creditHours > 0);
    totalCoursesCount += validCourses.length;

    validCourses.forEach(c => {
      const gp = c.gradePoint !== undefined && !isNaN(c.gradePoint)
        ? c.gradePoint
        : getGradePointFromLetter(scale, c.grade);

      const qp = c.creditHours * gp;
      semCredits += c.creditHours;
      semQualityPoints += qp;
    });

    const semGpa = semCredits > 0 ? semQualityPoints / semCredits : 0;
    cumulativeCredits += semCredits;
    cumulativeQualityPoints += semQualityPoints;

    semesterResults.push({
      semesterName: sem.name || `Semester ${index + 1}`,
      gpa: semGpa,
      credits: semCredits,
      qualityPoints: semQualityPoints
    });

    if (semCredits > 0) {
      breakdown.push({
        step: sem.name || `Semester ${index + 1}`,
        description: `${semCredits} Credits, ${semQualityPoints.toFixed(2)} Quality Points`,
        formula: `${semQualityPoints.toFixed(2)} ÷ ${semCredits}`,
        value: `GPA: ${semGpa.toFixed(2)}`,
        details: `${validCourses.length} courses included`
      });
    }
  });

  const cgpa = cumulativeCredits > 0 ? cumulativeQualityPoints / cumulativeCredits : 0;
  const roundedCgpa = Math.min(scale.maxGpa, Math.max(0, cgpa));

  let statusType: CalculationResult['statusType'] = 'neutral';
  let statusMessage = '';
  if (roundedCgpa >= 3.7) {
    statusType = 'success';
    statusMessage = 'Summa Cum Laude / High Distinction academic trajectory!';
  } else if (roundedCgpa >= 3.0) {
    statusType = 'success';
    statusMessage = 'Solid academic standing. Strong profile for scholarships and jobs.';
  } else if (roundedCgpa >= 2.0) {
    statusType = 'warning';
    statusMessage = 'Passing standing. Maintain or boost course performance.';
  } else {
    statusType = 'error';
    statusMessage = 'CGPA below 2.0. In most universities, minimum 2.0 is required for graduation.';
  }

  return {
    primaryValue: roundedCgpa.toFixed(2),
    primaryLabel: 'Overall CGPA',
    primaryUnit: `/ ${scale.maxGpa.toFixed(1)}`,
    statusType,
    statusMessage,
    stats: [
      { label: 'Cumulative Credits', value: cumulativeCredits, unit: 'hrs', subtext: 'Total earned' },
      { label: 'Cumulative Quality Points', value: cumulativeQualityPoints.toFixed(2), subtext: 'Total QP' },
      { label: 'Semesters', value: semesters.length, subtext: 'Calculated' },
      { label: 'Total Courses', value: totalCoursesCount, subtext: 'Enrolled' }
    ],
    breakdown,
    explanation: [
      'Formula: Cumulative CGPA = Sum of all Semester Quality Points ÷ Sum of all Semester Credit Hours',
      `Calculation: ${cumulativeQualityPoints.toFixed(2)} Total QP ÷ ${cumulativeCredits} Total Credits = ${roundedCgpa.toFixed(2)} CGPA`
    ],
    notes: [
      `Grading scale: ${scale.name}`,
      'CGPA is weighted by credit hours across all semesters.'
    ],
    semesterResults
  };
}

/**
 * Bi-directional Percentage and Marks Calculator
 */
export function calculatePercentage(
  mode: 'marks_to_percentage' | 'percentage_to_marks',
  params: {
    obtainedMarks?: number;
    totalMarks?: number;
    percentage?: number;
    gradingScale?: GradingScale;
  }
): CalculationResult {
  const { obtainedMarks = 0, totalMarks = 0, percentage = 0, gradingScale } = params;

  if (mode === 'marks_to_percentage') {
    if (totalMarks <= 0 || isNaN(totalMarks)) {
      return {
        primaryValue: '0.00%',
        primaryLabel: 'Percentage',
        statusType: 'error',
        statusMessage: 'Total marks must be greater than zero.',
        stats: [],
        breakdown: []
      };
    }

    if (obtainedMarks < 0 || isNaN(obtainedMarks)) {
      return {
        primaryValue: '0.00%',
        primaryLabel: 'Percentage',
        statusType: 'error',
        statusMessage: 'Obtained marks cannot be negative.',
        stats: [],
        breakdown: []
      };
    }

    if (obtainedMarks > totalMarks) {
      return {
        primaryValue: `${((obtainedMarks / totalMarks) * 100).toFixed(2)}%`,
        primaryLabel: 'Calculated Percentage',
        statusType: 'warning',
        statusMessage: 'Note: Obtained marks exceed total maximum marks.',
        stats: [
          { label: 'Obtained Marks', value: obtainedMarks },
          { label: 'Total Marks', value: totalMarks }
        ],
        breakdown: []
      };
    }

    const calculatedPercentage = (obtainedMarks / totalMarks) * 100;
    const roundedPercent = Number(calculatedPercentage.toFixed(2));
    const lostMarks = totalMarks - obtainedMarks;

    // Determine letter grade if scale provided or standard scale
    const scale = gradingScale || getGradingScale('hec-pakistan');
    const matchedGrade = scale.grades.find(g => (g.minPercentage ?? 0) <= roundedPercent) || scale.grades[scale.grades.length - 1];

    let statusType: CalculationResult['statusType'] = 'neutral';
    if (roundedPercent >= 80) statusType = 'success';
    else if (roundedPercent >= 60) statusType = 'info';
    else if (roundedPercent >= 50) statusType = 'warning';
    else statusType = 'error';

    return {
      primaryValue: `${roundedPercent.toFixed(2)}%`,
      primaryLabel: 'Calculated Percentage',
      statusType,
      statusMessage: roundedPercent >= 50 ? `Passed with Grade ${matchedGrade.letter}` : 'Below standard passing percentage (50%)',
      stats: [
        { label: 'Obtained Marks', value: obtainedMarks },
        { label: 'Total Marks', value: totalMarks },
        { label: 'Equivalent Grade', value: matchedGrade.letter, subtext: matchedGrade.description },
        { label: 'Lost Marks', value: Math.max(0, lostMarks), subtext: `${((lostMarks / totalMarks) * 100).toFixed(1)}%` }
      ],
      breakdown: [
        {
          step: 'Divide Obtained by Total',
          description: 'Calculate fractional score',
          formula: `${obtainedMarks} / ${totalMarks}`,
          value: (obtainedMarks / totalMarks).toFixed(4)
        },
        {
          step: 'Multiply by 100',
          description: 'Convert fraction to percentage',
          formula: `${(obtainedMarks / totalMarks).toFixed(4)} × 100`,
          value: `${roundedPercent.toFixed(2)}%`
        }
      ],
      explanation: [
        'Formula: Percentage = (Obtained Marks ÷ Total Marks) × 100',
        `Calculation: (${obtainedMarks} ÷ ${totalMarks}) × 100 = ${roundedPercent.toFixed(2)}%`
      ]
    };
  } else {
    // percentage_to_marks
    if (totalMarks <= 0 || isNaN(totalMarks)) {
      return {
        primaryValue: '0',
        primaryLabel: 'Required Marks',
        statusType: 'error',
        statusMessage: 'Total marks must be greater than zero.',
        stats: [],
        breakdown: []
      };
    }

    if (percentage < 0 || percentage > 100 || isNaN(percentage)) {
      return {
        primaryValue: '0',
        primaryLabel: 'Required Marks',
        statusType: 'error',
        statusMessage: 'Percentage must be between 0% and 100%.',
        stats: [],
        breakdown: []
      };
    }

    const marks = (percentage / 100) * totalMarks;
    const roundedMarks = Number(marks.toFixed(2));

    return {
      primaryValue: roundedMarks.toString(),
      primaryLabel: 'Required Marks',
      primaryUnit: `/ ${totalMarks}`,
      statusType: 'success',
      statusMessage: `To achieve ${percentage}%, you need ${roundedMarks} out of ${totalMarks} marks.`,
      stats: [
        { label: 'Target Percentage', value: `${percentage}%` },
        { label: 'Total Marks', value: totalMarks },
        { label: 'Allowed Margin to Lose', value: (totalMarks - roundedMarks).toFixed(1), unit: 'marks' }
      ],
      breakdown: [
        {
          step: 'Convert Percentage to Decimal',
          description: 'Divide percentage by 100',
          formula: `${percentage} / 100`,
          value: (percentage / 100).toFixed(4)
        },
        {
          step: 'Multiply by Total Marks',
          description: 'Scale decimal fraction to max marks',
          formula: `${(percentage / 100).toFixed(4)} × ${totalMarks}`,
          value: roundedMarks.toFixed(2)
        }
      ],
      explanation: [
        'Formula: Required Marks = (Target Percentage ÷ 100) × Total Marks',
        `Calculation: (${percentage} ÷ 100) × ${totalMarks} = ${roundedMarks}`
      ]
    };
  }
}

/**
 * Required Final Exam Marks Calculator
 */
export function calculateRequiredFinalMarks(params: {
  currentMarksObtained: number;
  currentMarksTotal: number;
  finalExamTotalMarks: number;
  targetPercentage: number;
}): CalculationResult {
  const { currentMarksObtained, currentMarksTotal, finalExamTotalMarks, targetPercentage } = params;

  const totalCourseMarks = currentMarksTotal + finalExamTotalMarks;
  if (totalCourseMarks <= 0 || isNaN(totalCourseMarks) || finalExamTotalMarks <= 0) {
    return {
      primaryValue: '0',
      primaryLabel: 'Required Marks',
      statusType: 'error',
      statusMessage: 'Please enter valid positive total marks for assessments and final exam.'
    };
  }

  const totalMarksNeeded = (targetPercentage / 100) * totalCourseMarks;
  const marksNeededInFinal = totalMarksNeeded - currentMarksObtained;
  const percentageNeededInFinal = (marksNeededInFinal / finalExamTotalMarks) * 100;

  const currentPercentSoFar = currentMarksTotal > 0 ? (currentMarksObtained / currentMarksTotal) * 100 : 0;

  if (marksNeededInFinal <= 0) {
    return {
      primaryValue: '0',
      primaryLabel: 'Marks Needed in Final',
      primaryUnit: `/ ${finalExamTotalMarks}`,
      statusType: 'success',
      statusMessage: `🎉 Congratulations! You have already secured enough marks (${currentMarksObtained}) to achieve your target of ${targetPercentage}%.`,
      stats: [
        { label: 'Current Marks', value: `${currentMarksObtained} / ${currentMarksTotal}`, subtext: `${currentPercentSoFar.toFixed(1)}%` },
        { label: 'Total Course Marks', value: totalCourseMarks },
        { label: 'Final Exam Total', value: finalExamTotalMarks },
        { label: 'Target Overall %', value: `${targetPercentage}%` }
      ],
      explanation: [
        `Target total marks needed: (${targetPercentage}% of ${totalCourseMarks}) = ${totalMarksNeeded.toFixed(1)} marks`,
        `Current marks scored: ${currentMarksObtained}. You already exceed the requirement.`
      ]
    };
  }

  if (marksNeededInFinal > finalExamTotalMarks) {
    const maxPossibleMarks = currentMarksObtained + finalExamTotalMarks;
    const maxPossiblePercentage = (maxPossibleMarks / totalCourseMarks) * 100;

    return {
      primaryValue: `${marksNeededInFinal.toFixed(1)}`,
      primaryLabel: 'Marks Needed (Impossible)',
      primaryUnit: `/ ${finalExamTotalMarks}`,
      statusType: 'error',
      statusMessage: `Target unreachable. Maximum possible overall percentage is ${maxPossiblePercentage.toFixed(1)}% (if you score 100% on the final).`,
      stats: [
        { label: 'Marks Needed', value: marksNeededInFinal.toFixed(1), subtext: `Exceeds max (${finalExamTotalMarks})` },
        { label: 'Max Possible Score', value: `${maxPossibleMarks} / ${totalCourseMarks}`, subtext: `${maxPossiblePercentage.toFixed(1)}% max` },
        { label: 'Current Score', value: `${currentMarksObtained} / ${currentMarksTotal}`, subtext: `${currentPercentSoFar.toFixed(1)}%` }
      ],
      explanation: [
        `To reach ${targetPercentage}% on a ${totalCourseMarks} marks course, you need a grand total of ${totalMarksNeeded.toFixed(1)} marks.`,
        `With ${currentMarksObtained} already obtained, you would need ${marksNeededInFinal.toFixed(1)} marks in the final exam, which has only ${finalExamTotalMarks} total marks.`
      ]
    };
  }

  let statusType: CalculationResult['statusType'] = 'info';
  if (percentageNeededInFinal <= 60) statusType = 'success';
  else if (percentageNeededInFinal <= 80) statusType = 'warning';
  else statusType = 'error';

  return {
    primaryValue: marksNeededInFinal.toFixed(1),
    primaryLabel: 'Marks Needed in Final',
    primaryUnit: `/ ${finalExamTotalMarks}`,
    statusType,
    statusMessage: `You need ${marksNeededInFinal.toFixed(1)} marks (${percentageNeededInFinal.toFixed(1)}%) in your final exam to reach ${targetPercentage}% overall.`,
    stats: [
      { label: 'Target Final %', value: `${percentageNeededInFinal.toFixed(1)}%`, subtext: 'In final exam' },
      { label: 'Current Performance', value: `${currentPercentSoFar.toFixed(1)}%`, subtext: `${currentMarksObtained}/${currentMarksTotal}` },
      { label: 'Total Course Marks', value: totalCourseMarks },
      { label: 'Allowed Margin to Lose', value: (finalExamTotalMarks - marksNeededInFinal).toFixed(1), unit: 'marks' }
    ],
    breakdown: [
      {
        step: 'Calculate Total Marks Needed',
        description: 'Target overall score across entire semester',
        formula: `(${targetPercentage} / 100) × ${totalCourseMarks}`,
        value: `${totalMarksNeeded.toFixed(1)} marks`
      },
      {
        step: 'Subtract Current Obtained Marks',
        description: 'Remaining marks required from final exam',
        formula: `${totalMarksNeeded.toFixed(1)} - ${currentMarksObtained}`,
        value: `${marksNeededInFinal.toFixed(1)} marks`
      },
      {
        step: 'Calculate Required Exam %',
        description: 'Percentage required on final exam paper',
        formula: `(${marksNeededInFinal.toFixed(1)} / ${finalExamTotalMarks}) × 100`,
        value: `${percentageNeededInFinal.toFixed(1)}%`
      }
    ],
    explanation: [
      `Course Total: ${currentMarksTotal} (Assessments) + ${finalExamTotalMarks} (Final) = ${totalCourseMarks} marks.`,
      `To get ${targetPercentage}% overall, you must finish with ${totalMarksNeeded.toFixed(1)} out of ${totalCourseMarks} total marks.`,
      `Scoring ${marksNeededInFinal.toFixed(1)} / ${finalExamTotalMarks} (${percentageNeededInFinal.toFixed(1)}%) achieves this goal.`
    ]
  };
}

/**
 * CGPA to Percentage Conversion (HEC Official Equivalence, Standard Multiplier, AICTE)
 */
export function convertCgpaToPercentage(params: {
  cgpa: number;
  maxGpa: number;
  method: 'hec_pakistan' | 'hec_sliding' | 'linear' | 'aicte';
}): CalculationResult {
  const { cgpa, maxGpa = 4.0, method } = params;

  if (cgpa < 0 || cgpa > maxGpa || isNaN(cgpa)) {
    return {
      primaryValue: '0.00%',
      primaryLabel: 'Equivalent Percentage',
      statusType: 'error',
      statusMessage: `CGPA must be between 0.00 and ${maxGpa.toFixed(2)}.`
    };
  }

  let percentage = 0;
  let formulaStr = '';
  let noteStr = '';

  if (method === 'hec_sliding') {
    // Official HEC Implementation Guidelines Sliding Interpolation
    if (cgpa >= 4.0) {
      percentage = 85.0 + ((cgpa - 4.0) * 15.0); // 85% to 100%
      percentage = Math.min(100, Math.max(85, percentage));
    } else if (cgpa >= 3.66) {
      percentage = 80.0 + ((cgpa - 3.66) / (4.0 - 3.66)) * 4.9;
    } else if (cgpa >= 3.33) {
      percentage = 75.0 + ((cgpa - 3.33) / (3.66 - 3.33)) * 4.9;
    } else if (cgpa >= 3.00) {
      percentage = 71.0 + ((cgpa - 3.00) / (3.33 - 3.00)) * 3.9;
    } else if (cgpa >= 2.66) {
      percentage = 68.0 + ((cgpa - 2.66) / (3.00 - 2.66)) * 2.9;
    } else if (cgpa >= 2.33) {
      percentage = 64.0 + ((cgpa - 2.33) / (2.66 - 2.33)) * 3.9;
    } else if (cgpa >= 2.00) {
      percentage = 60.0 + ((cgpa - 2.00) / (2.33 - 2.00)) * 3.9;
    } else if (cgpa >= 1.66) {
      percentage = 57.0 + ((cgpa - 1.66) / (2.00 - 1.66)) * 2.9;
    } else if (cgpa >= 1.33) {
      percentage = 54.0 + ((cgpa - 1.33) / (1.66 - 1.33)) * 2.9;
    } else if (cgpa >= 1.00) {
      percentage = 50.0 + ((cgpa - 1.00) / (1.33 - 1.00)) * 3.9;
    } else {
      percentage = (cgpa / 1.0) * 49.0;
    }
    formulaStr = `HEC Sliding Scale Table Interpolation (CGPA ${cgpa})`;
    noteStr = 'HEC official implementation guidelines for uniform semester system grading table.';
  } else if (method === 'hec_pakistan') {
    // HEC standard proportional equivalence
    percentage = (cgpa / maxGpa) * 100;
    formulaStr = `(${cgpa} ÷ ${maxGpa}) × 100`;
    noteStr = 'HEC standard proportion formula for official equivalence conversion.';
  } else if (method === 'aicte') {
    // AICTE formula: (CGPA - 0.75) * 10
    percentage = (cgpa - 0.75) * 10;
    if (percentage < 0) percentage = 0;
    formulaStr = `(${cgpa} - 0.75) × 10`;
    noteStr = 'AICTE standard conversion equation.';
  } else {
    // Linear
    percentage = (cgpa / maxGpa) * 100;
    formulaStr = `(${cgpa} ÷ ${maxGpa}) × 100`;
    noteStr = 'Standard proportional percentage formula.';
  }

  return {
    primaryValue: `${percentage.toFixed(2)}%`,
    primaryLabel: 'Equivalent Percentage',
    statusType: percentage >= 70 ? 'success' : percentage >= 50 ? 'info' : 'warning',
    statusMessage: `CGPA ${cgpa.toFixed(2)} on a ${maxGpa.toFixed(1)} scale converts to ${percentage.toFixed(2)}%.`,
    stats: [
      { label: 'Input CGPA', value: cgpa.toFixed(2), unit: `/ ${maxGpa}` },
      { label: 'Equivalent %', value: `${percentage.toFixed(2)}%` },
      { label: 'Conversion Model', value: method === 'hec_sliding' ? 'HEC Policy Table' : method === 'hec_pakistan' ? 'HEC Proportional' : method === 'aicte' ? 'AICTE' : 'Standard' }
    ],
    breakdown: [
      {
        step: 'Formula Applied',
        description: noteStr,
        formula: formulaStr,
        value: `${percentage.toFixed(2)}%`
      }
    ],
    notes: [
      'Different universities and scholarship boards may apply their own specific institutional conversion charts.',
      'Check with your university registrar for official transcripts with percentage conversions.'
    ]
  };
}

/**
 * Weighted Grade / Assessment Calculator
 */
export interface AssessmentWeightItem {
  id: string;
  name: string;
  weight: number; // percentage, e.g. 20 for 20%
  score: number; // percentage scored or marks scored
  maxMarks?: number; // if marks based
  isCompleted: boolean;
}

export function calculateWeightedGrade(
  items: AssessmentWeightItem[],
  targetPercentage: number = 85
): CalculationResult {
  const validItems = items.filter(it => it.weight > 0);
  const totalConfiguredWeight = validItems.reduce((sum, it) => sum + it.weight, 0);

  const completedItems = validItems.filter(it => it.isCompleted);
  const completedWeight = completedItems.reduce((sum, it) => sum + it.weight, 0);
  const remainingWeight = Math.max(0, 100 - completedWeight);

  let earnedWeightedPoints = 0;

  const breakdownRows = completedItems.map(it => {
    let scorePercent = it.score;
    if (it.maxMarks && it.maxMarks > 0) {
      scorePercent = (it.score / it.maxMarks) * 100;
    }
    scorePercent = Math.min(100, Math.max(0, scorePercent));
    const contribution = (scorePercent * it.weight) / 100;
    earnedWeightedPoints += contribution;

    return {
      step: it.name || 'Assessment',
      description: `${scorePercent.toFixed(1)}% scored × ${it.weight}% weight`,
      formula: `(${scorePercent.toFixed(1)} × ${it.weight}) / 100`,
      value: `${contribution.toFixed(2)}%`,
      details: `Weighted contribution: ${contribution.toFixed(2)}% out of total course`
    };
  });

  const currentGradePercentage = completedWeight > 0 ? (earnedWeightedPoints / completedWeight) * 100 : 0;

  // Calculate required score on remaining weight to reach target
  const pointsNeeded = targetPercentage - earnedWeightedPoints;
  let requiredAverageOnRemaining = 0;
  let reachable = true;

  if (remainingWeight > 0) {
    requiredAverageOnRemaining = (pointsNeeded / remainingWeight) * 100;
    if (requiredAverageOnRemaining > 100) {
      reachable = false;
    }
  } else {
    reachable = earnedWeightedPoints >= targetPercentage;
  }

  let statusType: CalculationResult['statusType'] = 'info';
  let statusMessage = '';

  if (remainingWeight === 0) {
    statusType = earnedWeightedPoints >= targetPercentage ? 'success' : 'warning';
    statusMessage = `Course complete. Final calculated grade is ${earnedWeightedPoints.toFixed(2)}%.`;
  } else if (!reachable) {
    statusType = 'error';
    const maxPossible = earnedWeightedPoints + remainingWeight;
    statusMessage = `Target of ${targetPercentage}% unreachable. Maximum possible final score is ${maxPossible.toFixed(2)}%.`;
  } else if (pointsNeeded <= 0) {
    statusType = 'success';
    statusMessage = `🎉 Target already reached! You have secured ${earnedWeightedPoints.toFixed(2)}% with remaining assignments left.`;
  } else {
    statusType = requiredAverageOnRemaining <= 75 ? 'success' : 'warning';
    statusMessage = `You need an average of ${requiredAverageOnRemaining.toFixed(1)}% on remaining assessments (${remainingWeight}% weight) to reach ${targetPercentage}%.`;
  }

  return {
    primaryValue: `${earnedWeightedPoints.toFixed(2)}%`,
    primaryLabel: 'Current Earned Total',
    primaryUnit: `/ 100%`,
    statusType,
    statusMessage,
    stats: [
      { label: 'Current Average', value: `${currentGradePercentage.toFixed(1)}%`, subtext: `On completed (${completedWeight}%)` },
      { label: 'Remaining Weight', value: `${remainingWeight.toFixed(0)}%`, subtext: 'Upcoming' },
      { label: 'Required on Remaining', value: remainingWeight > 0 ? (reachable ? `${Math.max(0, requiredAverageOnRemaining).toFixed(1)}%` : 'Impossible') : 'N/A' },
      { label: 'Total Weight Set', value: `${totalConfiguredWeight}%`, subtext: totalConfiguredWeight === 100 ? 'Balanced' : 'Warning: ≠ 100%' }
    ],
    breakdown: breakdownRows,
    explanation: [
      `Earned so far: ${earnedWeightedPoints.toFixed(2)} points from completed ${completedWeight}% weight.`,
      `Target overall: ${targetPercentage}%. Points still needed: ${Math.max(0, pointsNeeded).toFixed(2)} points from remaining ${remainingWeight}% weight.`
    ],
    notes: [
      totalConfiguredWeight !== 100 ? `Note: Your total weights sum to ${totalConfiguredWeight}%, recommended total is 100%.` : 'All assessment weights balance to 100%.'
    ]
  };
}
