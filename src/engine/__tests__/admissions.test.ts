import { describe, it, expect } from 'vitest';
import { calculateMDCATAggregate, calculateUniversityMerit } from '../admissions';

describe('Admissions Calculation Engine', () => {
  it('calculates Pakistan MDCAT aggregate according to PM&DC 50-40-10 formula', () => {
    // Matric: 1040/1100 = 94.5454% * 10% = 9.4545%
    // FSc: 1020/1100 = 92.7272% * 40% = 37.0909%
    // MDCAT: 180/200 = 90.0000% * 50% = 45.0000%
    // Total = 9.4545 + 37.0909 + 45.0000 = 91.5454%
    const res = calculateMDCATAggregate({
      matricObtained: 1040,
      matricTotal: 1100,
      matricWeight: 10,
      fscObtained: 1020,
      fscTotal: 1100,
      fscWeight: 40,
      mdcatObtained: 180,
      mdcatTotal: 200,
      mdcatWeight: 50
    });

    expect(res.primaryValue).toBe('91.5455%');
    expect(res.statusType).toBe('success');
  });

  it('correctly applies Hafiz-e-Quran bonus (+20 marks in FSc)', () => {
    const withoutBonus = calculateMDCATAggregate({
      matricObtained: 1000,
      matricTotal: 1100,
      matricWeight: 10,
      fscObtained: 1000,
      fscTotal: 1100,
      fscWeight: 40,
      mdcatObtained: 170,
      mdcatTotal: 200,
      mdcatWeight: 50,
      hafizQuranBonus: false
    });

    const withBonus = calculateMDCATAggregate({
      matricObtained: 1000,
      matricTotal: 1100,
      matricWeight: 10,
      fscObtained: 1000,
      fscTotal: 1100,
      fscWeight: 40,
      mdcatObtained: 170,
      mdcatTotal: 200,
      mdcatWeight: 50,
      hafizQuranBonus: true
    });

    const numWithout = parseFloat(String(withoutBonus.primaryValue));
    const numWith = parseFloat(String(withBonus.primaryValue));
    expect(numWith).toBeGreaterThan(numWithout);
  });

  it('calculates university merit components correctly', () => {
    // NUST NET: Test (160/200 = 80% * 75% = 60%), FSc (480/550 = 87.27% * 15% = 13.09%), Matric (1000/1100 = 90.9% * 10% = 9.09%)
    const components = [
      { id: '1', name: 'NET', obtainedMarks: 160, totalMarks: 200, weightPercentage: 75 },
      { id: '2', name: 'FSc', obtainedMarks: 480, totalMarks: 550, weightPercentage: 15 },
      { id: '3', name: 'Matric', obtainedMarks: 1000, totalMarks: 1100, weightPercentage: 10 }
    ];

    const res = calculateUniversityMerit({ components });
    expect(res.statusType).toBe('success');
    expect(parseFloat(String(res.primaryValue))).toBeCloseTo(82.18, 1);
  });
});
