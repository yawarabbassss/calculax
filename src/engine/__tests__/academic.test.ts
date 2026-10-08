import { describe, it, expect } from 'vitest';
import {
  calculateSemesterGPA,
  calculateCumulativeCGPA,
  calculatePercentage,
  calculateRequiredFinalMarks,
  convertCgpaToPercentage,
  calculateWeightedGrade
} from '../academic';

describe('Academic Calculation Engine', () => {
  it('calculates semester GPA accurately on standard 4.0 scale', () => {
    const courses = [
      { id: '1', name: 'Math', creditHours: 3, grade: 'A' }, // 3 * 4.0 = 12
      { id: '2', name: 'Physics', creditHours: 4, grade: 'B' }, // 4 * 3.0 = 12
      { id: '3', name: 'English', creditHours: 3, grade: 'A-' } // 3 * 3.7 = 11.1
    ];
    // Total Credits = 10, Total QP = 35.1 => GPA = 3.51
    const result = calculateSemesterGPA(courses, 'standard-4.0');
    expect(result.primaryValue).toBe('3.51');
    expect(result.statusType).toBe('success');
  });

  it('handles zero credit courses and empty inputs safely without NaN', () => {
    const emptyResult = calculateSemesterGPA([], 'standard-4.0');
    expect(emptyResult.primaryValue).toBe('0.00');

    const zeroCreditCourses = [
      { id: '1', name: 'Seminar', creditHours: 0, grade: 'A' }
    ];
    const zeroResult = calculateSemesterGPA(zeroCreditCourses, 'standard-4.0');
    expect(zeroResult.primaryValue).toBe('0.00');
  });

  it('calculates multi-semester cumulative CGPA correctly', () => {
    const semesters = [
      {
        id: 's1',
        name: 'Semester 1',
        courses: [
          { id: 'c1', name: 'Course 1', creditHours: 3, grade: 'A' }, // 12
          { id: 'c2', name: 'Course 2', creditHours: 3, grade: 'B' } // 9
        ] // Sem 1: 6 credits, 21 QP => GPA 3.5
      },
      {
        id: 's2',
        name: 'Semester 2',
        courses: [
          { id: 'c3', name: 'Course 3', creditHours: 4, grade: 'A' }, // 16
          { id: 'c4', name: 'Course 4', creditHours: 4, grade: 'A' } // 16
        ] // Sem 2: 8 credits, 32 QP => GPA 4.0
      }
    ];
    // Cumulative: (21 + 32) / (6 + 8) = 53 / 14 = 3.7857... => 3.79
    const result = calculateCumulativeCGPA(semesters, 'standard-4.0');
    expect(result.primaryValue).toBe('3.79');
  });

  it('calculates marks to percentage with exact rounding and grades', () => {
    const res = calculatePercentage('marks_to_percentage', {
      obtainedMarks: 945,
      totalMarks: 1100
    });
    // 945 / 1100 * 100 = 85.9090... => 85.91%
    expect(res.primaryValue).toBe('85.91%');
    expect(res.statusType).toBe('success');
  });

  it('calculates percentage to marks correctly', () => {
    const res = calculatePercentage('percentage_to_marks', {
      percentage: 85,
      totalMarks: 1100
    });
    // 0.85 * 1100 = 935
    expect(res.primaryValue).toBe('935');
  });

  it('calculates required final marks correctly', () => {
    // Current: 40/50, Target: 80% on 100 max (requires 80 total => 40 needed on final 50)
    const res = calculateRequiredFinalMarks({
      currentMarksObtained: 40,
      currentMarksTotal: 50,
      finalExamTotalMarks: 50,
      targetPercentage: 80
    });
    expect(res.primaryValue).toBe('40.0');
  });

  it('detects impossible required final marks gracefully', () => {
    // Current: 10/50, Target: 90% on 100 total (requires 90 total => 80 needed on final 50 -> impossible)
    const res = calculateRequiredFinalMarks({
      currentMarksObtained: 10,
      currentMarksTotal: 50,
      finalExamTotalMarks: 50,
      targetPercentage: 90
    });
    expect(res.statusType).toBe('error');
    expect(res.statusMessage).toContain('unreachable');
  });

  it('calculates weighted grade correctly', () => {
    const items = [
      { id: '1', name: 'Quizzes', weight: 20, score: 90, isCompleted: true }, // 18
      { id: '2', name: 'Midterm', weight: 30, score: 80, isCompleted: true }, // 24
      { id: '3', name: 'Final', weight: 50, score: 0, isCompleted: false }
    ];
    // Earned so far = 18 + 24 = 42 out of 50 completed weight
    const res = calculateWeightedGrade(items, 85);
    expect(res.primaryValue).toBe('42.00%');
  });
});
