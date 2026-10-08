import React from 'react';
import { BookOpen, CheckCircle2, Building2, GraduationCap } from 'lucide-react';
import { GRADING_SCALES } from '../engine/gradingScales';
import { UNIVERSITY_CONFIGS } from '../engine/universityRegistry';

export const MethodologyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 animate-fade-in">
      
      {/* Title */}
      <div className="space-y-3 border-b border-slate-200/80 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Academic Reference Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Formulas & Calculation Methodology
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Transparent mathematical specifications for all academic, admission, attendance, and grading calculations on Calculax.
        </p>
      </div>

      {/* 1. GPA & CGPA Formulas */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-brand-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            1. GPA & Cumulative CGPA Mathematical Model
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Grade Point Average (GPA) is a credit-weighted arithmetic mean of course grade points earned in an academic term.
          </p>
          
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-brand-600 dark:text-brand-400 space-y-1">
            <div>Quality Points (Course i) = Credit Hours(i) × Grade Point(i)</div>
            <div>Semester GPA = ∑(Quality Points) ÷ ∑(Credit Hours)</div>
            <div>Cumulative CGPA = ∑(All Quality Points across Semesters) ÷ ∑(All Credit Hours)</div>
          </div>

          <p className="text-slate-500 dark:text-slate-400">
            Note: Audited, non-credit, or withdrawal courses (W) with 0 credit hours do not affect total quality points or denominator hours.
          </p>
        </div>
      </div>

      {/* 2. MDCAT Aggregate Formula */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Pakistan PM&DC / Medical Admission Aggregate
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Medical and Dental admission in public and private colleges across Pakistan is governed by the PM&DC uniform weighting framework:
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-xs text-emerald-600 dark:text-emerald-400 space-y-1">
            <div>Aggregate (%) = (Matric% × 0.10) + (FSc% × 0.40) + (MDCAT% × 0.50)</div>
            <div>Where Component% = (Marks Obtained ÷ Maximum Marks) × 100</div>
          </div>

          <p className="text-slate-500 dark:text-slate-400">
            Eligibility Thresholds: Minimum 55% in MDCAT and 60% in FSc (Pre-Medical) for MBBS admission; minimum 50% in MDCAT for BDS.
          </p>
        </div>
      </div>

      {/* 3. Top Pakistan University Presets Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Pakistan University Admission Presets Repository
        </h2>

        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-semibold">
                <tr>
                  <th className="p-3">University</th>
                  <th className="p-3">Degree Track</th>
                  <th className="p-3">Official Formula Weightage</th>
                  <th className="p-3">Cycle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {UNIVERSITY_CONFIGS.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">{u.name}</td>
                    <td className="p-3 text-slate-500">{u.degreeType}</td>
                    <td className="p-3 font-mono text-brand-600 dark:text-brand-400">{u.formulaDescription}</td>
                    <td className="p-3 text-slate-400">{u.effectiveYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Attendance Bunk & Recovery Formulas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Attendance & Bunk Algebraic Equations
        </h2>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <p>
            Given total conducted classes <code className="font-mono text-brand-600">C_total</code>, attended classes <code className="font-mono text-brand-600">C_attended</code>, and required threshold <code className="font-mono text-brand-600">T%</code>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">A. Consecutive Classes to Recover:</div>
              <div className="font-mono text-brand-600 dark:text-brand-400">
                x = ⌈ (T × C_total - 100 × C_attended) / (100 - T) ⌉
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">B. Safe Bunks / Absences Allowed:</div>
              <div className="font-mono text-brand-600 dark:text-brand-400">
                y = ⌊ (100 × C_attended - T × C_total) / T ⌋
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
