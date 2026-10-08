import { describe, it, expect } from 'vitest';
import { calculateAttendance, calculateStudyTime, calculateScholarshipEligibility } from '../studentLife';

describe('Student Life Calculation Engine', () => {
  it('calculates safe bunk buffer when above target attendance', () => {
    // 40 attended out of 40 held => 100%. Target: 75%
    // Can miss y = floor((100 * 40 - 75 * 40) / 75) = floor(1000 / 75) = 13 classes
    const res = calculateAttendance({
      totalClasses: 40,
      attendedClasses: 40,
      targetPercentage: 75
    });

    expect(res.currentPercentage).toBe(100);
    expect(res.isMeetingTarget).toBe(true);
    expect(res.classesCanMiss).toBe(13);
  });

  it('calculates required consecutive recovery classes when below target', () => {
    // 20 attended out of 40 held => 50%. Target: 75%
    // Need x = ceil((75 * 40 - 100 * 20) / (100 - 75)) = ceil((3000 - 2000) / 25) = 40 classes
    const res = calculateAttendance({
      totalClasses: 40,
      attendedClasses: 20,
      targetPercentage: 75
    });

    expect(res.currentPercentage).toBe(50);
    expect(res.isMeetingTarget).toBe(false);
    expect(res.classesNeeded).toBe(40);
  });

  it('calculates study time plan correctly', () => {
    // 20 topics * 2 hours = 40 hours total
    // 12 days - 2 buffer = 10 active days => 4 hrs/day
    const res = calculateStudyTime({
      totalTopics: 20,
      averageHoursPerTopic: 2,
      daysRemaining: 12,
      dailyAvailableHours: 4,
      reviewBufferDays: 2
    });

    expect(res.primaryValue).toBe('4.0 hrs');
    expect(res.statusType).toBe('warning'); // exactly capacity
  });

  it('calculates scholarship fee waiver accurately', () => {
    const res = calculateScholarshipEligibility({
      cgpaOrAggregate: 3.95,
      metricType: 'cgpa',
      semesterTuitionFee: 200000
    });

    expect(res.primaryValue).toBe('100% Waiver');
    expect(res.statusType).toBe('success');
  });
});
