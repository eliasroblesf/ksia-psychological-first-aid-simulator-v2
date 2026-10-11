import React, { useEffect, useState } from 'react';
import { Language, PfaAuditReport } from '../types/pfa';
import { PFA_SCENARIOS, SAUDI_EMERGENCY_RESOURCES } from '../data/pfaDataset';
import { generatePfaCertificatePdf } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';
import {
  ArrowDown,
  Award,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  PhoneCall,
  FileCheck
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface AuditScreenProps {
  language: Language;
  report: PfaAuditReport;
  onRetake: () => void;
  soundEnabled: boolean;
}

export const AuditScreen: React.FC<AuditScreenProps> = ({
  language,
  report,
  onRetake,
  soundEnabled,
}) => {
  const isAr = language === 'ar';
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Trigger celebration on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (soundEnabled) {
      sfx.playFanfare();
    }
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#facc15', '#10b981', '#38bdf8', '#fbbf24']
      });
    } catch {
      // Ignored if confetti fails
    }
  }, [soundEnabled]);

  const handleDownloadPdf = () => {
    try {
      setDownloading(true);
      if (soundEnabled) sfx.playSuccess();

      // Generates KSIA_PFA_HumanSupport_Report_[EmployeeID].pdf
      generatePfaCertificatePdf(report);

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloading(false);
      }, 1000);
    } catch (err) {
      console.error('PDF generation error:', err);
      setDownloading(false);
    }
  };

  const isDistinction = report.score === report.totalQuestions;
  const isPassed = report.score >= 5;

  return (
    <div className="mx-auto max-w-3xl px-3.5 py-4 sm:px-4 sm:py-8">
      {/* Top Completion Header Card */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-4 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3.5">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20">
              <Award className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-400/30 uppercase tracking-wider">
                {isAr ? 'تقرير التدقيق الميداني' : 'OFFICIAL AUDIT REPORT'}
              </span>
              <h1 className="mt-1 text-lg sm:text-2xl font-extrabold text-white leading-tight">
                {isDistinction
                  ? isAr
                    ? 'أخصائي الاستجابة والدعم النفسي الأولي (مرتبة الشرف)'
                    : 'PFA Tactical Specialist (Distinction)'
                  : isPassed
                  ? isAr
                    ? 'ممارس الاستجابة والدعم النفسي الأولي (مؤهل)'
                    : 'PFA Tactical Responder (Proficient)'
                  : isAr
                  ? 'مكتمل - يتطلب مراجعة بروتوكولات العمليات'
                  : 'Completed - Operational Protocol Review'}
              </h1>
            </div>
          </div>

          {/* Score Badge */}
          <div className="rounded-xl border border-slate-700 bg-slate-800/90 p-3 text-center shrink-0 min-w-[120px]">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {report.score} / {report.totalQuestions}
            </div>
            <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              {report.percentage}% {isAr ? 'الدرجة' : 'SCORE'}
            </div>
            <div className="mt-0.5 text-[11px] text-emerald-400 font-semibold">
              {isPassed ? (isAr ? 'مؤهل' : 'QUALIFIED') : (isAr ? 'مراجعة' : 'REVIEW')}
            </div>
          </div>
        </div>

        {/* Participant Data Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4 text-xs">
          <div>
            <span className="block text-slate-400 text-[11px] font-medium">
              {isAr ? 'اسم المستجيب' : 'Responder Name'}
            </span>
            <span className="font-bold text-slate-100 block truncate">
              {report.participant.fullName}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 text-[11px] font-medium">
              {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
            </span>
            <span className="font-bold font-mono text-amber-400 block">
              #{report.participant.employeeId}
            </span>
          </div>
          <div>
            <span className="block text-slate-400 text-[11px] font-medium">
              {isAr ? 'تاريخ التقييم' : 'Assessment Date'}
            </span>
            <span className="font-semibold text-slate-200 block">
              {report.participant.assessmentDate}
            </span>
          </div>
        </div>

        {/* DOWNLOAD BUTTON SECTION */}
        <div className="mt-6 border-t border-slate-800 pt-5">
          <div className="mb-3 rounded-xl border border-amber-400/40 bg-amber-400/10 p-2.5 text-center">
            <p className="text-xs font-bold text-amber-300">
              {isAr
                ? 'تذكير: قم بتحميل تقرير التدقيق بصيغة PDF لسجلاتك الخاصة.'
                : 'Remember to download your official PDF audit report for your records.'}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="bleeping-yellow-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm sm:text-base font-black tracking-wide text-slate-950 transition-all cursor-pointer shadow-xl uppercase active:scale-[0.99]"
            >
              <ArrowDown className="h-5 w-5 text-slate-950 stroke-[3]" />
              <span>
                {downloading
                  ? isAr
                    ? 'جاري تجهيز التقرير...'
                    : 'GENERATING REPORT...'
                  : isAr
                  ? 'تحميل التقرير'
                  : 'DOWNLOAD REPORT'}
              </span>
            </button>
          </div>

          {downloadSuccess && (
            <p className="mt-2.5 text-center text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>
                {isAr
                  ? `تم تحميل الملف بنجاح باسم: KSIA_PFA_HumanSupport_Report_${report.participant.employeeId}.pdf`
                  : `Successfully downloaded: KSIA_PFA_HumanSupport_Report_${report.participant.employeeId}.pdf`}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Modular Scenario Review Table */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 shadow-xl">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3.5">
          <FileCheck className="h-4.5 w-4.5 text-amber-400" />
          <span>
            {isAr
              ? 'ملخص نتائج الحالات الميدانية'
              : 'Scenario Audit Breakdown'}
          </span>
        </h3>

        <div className="space-y-3">
          {PFA_SCENARIOS.map((scenario) => {
            const ans = report.answers.find((a) => a.scenarioId === scenario.id);
            const isCorrect = ans ? ans.isCorrect : false;

            return (
              <div
                key={scenario.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 sm:p-4 transition-all hover:border-slate-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    {scenario.imageUrl && (
                      <img
                        src={scenario.imageUrl}
                        alt={isAr ? scenario.title.ar : scenario.title.en}
                        referrerPolicy="no-referrer"
                        className="h-10 w-16 sm:h-12 sm:w-20 rounded-lg object-cover border border-slate-700/60 shrink-0 shadow-sm"
                      />
                    )}
                    <div className="flex items-start sm:items-center gap-2">
                      <div
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold mt-0.5 sm:mt-0 ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-slate-400">
                          [{scenario.id}]
                        </span>{' '}
                        <span className="text-xs sm:text-sm font-bold text-slate-100">
                          {isAr ? scenario.title.ar : scenario.title.en}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold self-start sm:self-auto shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isCorrect ? (isAr ? 'مطابق' : 'COMPLIANT') : (isAr ? 'مراجعة' : 'REVIEWED')}
                  </span>
                </div>

                <p className="mt-2 text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-400">
                    {isAr ? 'الإجراء الأمثل: ' : 'Optimal Action: '}
                  </span>
                  {isAr ? scenario.explanation.ar : scenario.explanation.en}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saudi Institutional Emergency Referral Pathways */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <PhoneCall className="h-4 w-4 text-emerald-400" />
          <h3 className="text-xs sm:text-sm font-bold text-white">
            {isAr
              ? 'شبكات الإحالة والدعم المعتمدة بالمملكة'
              : 'Accredited Saudi Referral Pathways'}
          </h3>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          {isAr
            ? 'خطوط مساندة واستشارات هاتفية وتطبيقية سرية 100%:'
            : 'Confidential 24/7 channels available across Saudi Arabia:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAUDI_EMERGENCY_RESOURCES.map((res, i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-400 border border-emerald-500/20">
                    {res.badge}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-400">
                    {res.code}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-100">
                  {isAr ? res.name.ar : res.name.en}
                </h4>
                <p className="mt-1 text-[10px] text-slate-400 leading-relaxed">
                  {isAr ? res.description.ar : res.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retake Drill / Reset */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onRetake();
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-300 hover:border-slate-600 hover:text-white transition-all cursor-pointer active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{isAr ? 'إعادة تشغيل المحاكي' : 'Retake Drill'}</span>
        </button>
      </div>
    </div>
  );
};
