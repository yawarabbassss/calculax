import { describe, it, expect } from 'vitest';
import { calculateAge, calculateDateDifference, convertAcademicScale } from '../utilities';

describe('Utilities Calculation Engine', () => {
  it('calculates exact age for admission cutoff', () => {
    const res = calculateAge({
      birthDate: '2005-01-01',
      cutoffDate: '2025-01-01',
      minAgeRequired: 17,
      maxAgeAllowed: 25
    });

    expect(res.primaryValue).toContain('20 Yrs');
    expect(res.statusType).toBe('success');
  });

  it('calculates academic date difference and duration', () => {
    const res = calculateDateDifference({
      startDate: '2025-01-01',
      endDate: '2025-01-15'
    });

    expect(res.primaryValue).toBe('14 Days');
  });

  it('converts academic marks scale (e.g. 850 to 1100)', () => {
    // 680 / 850 = 0.8 * 1100 = 880
    const res = convertAcademicScale({
      inputScore: 680,
      inputMax: 850,
      targetMax: 1100
    });

    expect(res.primaryValue).toBe('880.00');
  });
});
