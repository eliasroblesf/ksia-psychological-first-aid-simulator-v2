import React, { useState } from 'react';
import { Language, Scenario, UserAnswer } from '../types/pfa';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
  Info,
  Clock,
  Eye
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface SimulationScreenProps {
  language: Language;
  scenario: Scenario;
  currentIndex: number;
  totalScenarios: number;
  userAnswer?: UserAnswer;
  onSelectOption: (optionId: string, isCorrect: boolean) => void;
  onNextScenario: () => void;
  soundEnabled: boolean;
}

export const SimulationScreen: React.FC<SimulationScreenProps> = ({
  language,
  scenario,
  currentIndex,
  totalScenarios,
  userAnswer,
  onSelectOption,
  onNextScenario,
  soundEnabled,
}) => {
  const isAr = language === 'ar';
  const hasAnswered = !!userAnswer;
  const isPhase1 = scenario.phaseId === 'phase1';

  // Handle user picking an option
  const handleOptionClick = (optionId: string, correct: boolean) => {
    if (hasAnswered) return; // Prevent changing answer

    if (soundEnabled) {
      if (correct) {
        sfx.playSuccess();
      } else {
        sfx.playIncorrect();
      }
    }

    onSelectOption(optionId, correct);

    // CRITICAL REQUIREMENT: Smooth Scroll to Top immediately after submitting an answer
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceed = () => {
    if (soundEnabled) sfx.playClick();
    onNextScenario();
    // CRITICAL REQUIREMENT: Smooth Scroll to Top on every screen transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-3xl px-3.5 py-4 sm:px-4 sm:py-8">
      {/* Top Phase Header & Progress Bar */}
      <div className="mb-4 sm:mb-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-3.5 sm:p-5 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] sm:text-xs font-bold border ${
                  isPhase1
                    ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                    : 'bg-cyan-400/10 text-cyan-400 border-cyan-400/30'
                }`}
              >
                {isPhase1 ? <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                <span>
                  {isPhase1
                    ? isAr
                      ? 'المرحلة 1: التدخل الميداني'
                      : 'PHASE 1: On-Scene Help'
                    : isAr
                    ? 'المرحلة 2: الرعاية الذاتية'
                    : 'PHASE 2: Post-Crisis Support'}
                </span>
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                {scenario.category ? (isAr ? scenario.category.ar : scenario.category.en) : ''}
              </span>
            </div>

            <h2 className="mt-1.5 text-base sm:text-xl font-bold text-white leading-snug">
              {isAr ? scenario.title.ar : scenario.title.en}
            </h2>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span>{isAr ? 'تأمل حر' : 'Untimed'}</span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-300">
              <Award className="h-3 w-3 text-amber-400" />
              <span>
                {currentIndex + 1} / {totalScenarios}
              </span>
            </div>
          </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
            <span>
              {isAr ? `الحالة ${currentIndex + 1} من ${totalScenarios}` : `Case ${currentIndex + 1} of ${totalScenarios}`}
            </span>
            <span>
              {Math.round(((currentIndex + (hasAnswered ? 1 : 0.4)) / totalScenarios) * 100)}%
            </span>
          </div>
          <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-slate-800 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{
                width: `${((currentIndex + (hasAnswered ? 1 : 0.4)) / totalScenarios) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Scenario Illustration & Situation Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Scenario Scene Illustration */}
        {scenario.imageUrl && (
          <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
            <div className="relative aspect-video w-full overflow-hidden group">
              <img
                src={scenario.imageUrl}
                alt={isAr ? scenario.title.ar : scenario.title.en}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 pointer-events-none" />

              {/* Scene Badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-400/30 shadow-lg">
                  <Eye className="h-3 w-3 text-amber-400" />
                  <span>{isAr ? 'المشهد الميداني' : 'INCIDENT SCENE'}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Info className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
                {isAr ? 'الموقف الميداني الحرج' : 'CRITICAL INCIDENT BRIEFING'}
              </span>
              <p className="mt-1 text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
                {isAr ? scenario.description.ar : scenario.description.en}
              </p>
            </div>
          </div>

          {/* Instructions banner: customized per user request */}
          <div className="mt-3.5 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300 flex items-center justify-between gap-2">
            <span className="leading-relaxed">
              {isAr
                ? 'حدد كيف ستتعامل مع هذا الموقف. بعد اختيارك، سيتم توضيح وتقييم الإجراء الأمثل فوراً.'
                : 'Choose how you would approach this situation. Next, we will evaluate your response and explain the optimal action.'}
            </span>
            {!hasAnswered && (
              <span className="font-mono text-amber-400 font-bold shrink-0 text-[11px]">
                {isAr ? 'اختر' : 'Select'}
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="mt-4 sm:mt-5 space-y-3">
          {scenario.options.map((option) => {
            const isSelected = userAnswer?.selectedOptionId === option.id;
            const isOptionCorrect = option.correct;

            // Styling states
            let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-950/70 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

            if (hasAnswered) {
              if (isSelected && isOptionCorrect) {
                borderStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-100 ring-2 ring-emerald-500/30';
                badgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
              } else if (isSelected && !isOptionCorrect) {
                borderStyle = 'border-red-500 bg-red-950/40 text-red-100 ring-2 ring-red-500/30';
                badgeStyle = 'bg-red-500 text-white font-bold';
              } else if (isOptionCorrect) {
                borderStyle = 'border-emerald-600/70 bg-emerald-950/20 text-emerald-200/90';
                badgeStyle = 'bg-emerald-600/50 text-emerald-100';
              } else {
                borderStyle = 'border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id, option.correct)}
                disabled={hasAnswered}
                className={`w-full text-left rounded-xl border p-4 sm:p-5 transition-all flex items-start gap-4 cursor-pointer disabled:cursor-default ${borderStyle}`}
              >
                {/* Option Identifier Badge */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-extrabold ${badgeStyle}`}
                >
                  {hasAnswered && isSelected ? (
                    isOptionCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )
                  ) : hasAnswered && isOptionCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    option.id
                  )}
                </div>

                {/* Option Text */}
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-medium leading-relaxed">
                    {isAr ? option.text.ar : option.text.en}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* IMMEDIATE PEDAGOGICAL FEEDBACK (Revealed on selection) */}
      {hasAnswered && (
        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          {/* Main Contextual Explanation Card */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-xl ${
              userAnswer.isCorrect
                ? 'border-emerald-500/40 bg-emerald-950/30'
                : 'border-amber-500/40 bg-amber-950/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  userAnswer.isCorrect
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-amber-500 text-slate-950'
                }`}
              >
                {userAnswer.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 font-black" />
                ) : (
                  <AlertCircle className="h-6 w-6 font-black" />
                )}
              </div>

              <div>
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    userAnswer.isCorrect ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {userAnswer.isCorrect
                    ? isAr
                      ? 'إجابة نموذجية مطابقة للمعايير'
                      : 'STANDARDS-COMPLIANT RESPONSE (EXCELLENT)'
                    : isAr
                    ? 'توجيه تصحيحي مهم للمعايير'
                    : 'PEDAGOGICAL CORRECTION & PROTOCOL REINFORCEMENT'}
                </span>
                <p className="mt-1.5 text-sm sm:text-base text-slate-200 leading-relaxed font-semibold">
                  {isAr ? scenario.explanation.ar : scenario.explanation.en}
                </p>
              </div>
            </div>
          </div>

          {/* Deep Deep Context: What to Say vs What NOT to Say */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* WHAT TO SAY */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-5 shadow-lg">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2.5">
                <MessageSquare className="h-4 w-4" />
                <span>
                  {isAr
                    ? 'النص الحرفي النموذجي (ما يجب قوله)'
                    : 'WORD-FOR-WORD SCRIPT (WHAT TO SAY)'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-3.5 italic leading-relaxed">
                {isAr ? scenario.whatToSay.ar : scenario.whatToSay.en}
              </p>
            </div>

            {/* WHAT NOT TO SAY */}
            <div className="rounded-2xl border border-red-500/30 bg-slate-900/90 p-5 shadow-lg">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider mb-2.5">
                <XCircle className="h-4 w-4" />
                <span>
                  {isAr
                    ? 'ما يُحظر قوله (لتجنب الصدمة الثانوية)'
                    : 'CONTRAINDICATED STATEMENTS (WHAT NOT TO SAY)'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 bg-red-950/30 border border-red-500/20 rounded-xl p-3.5 italic leading-relaxed">
                {isAr ? scenario.whatNotToSay.ar : scenario.whatNotToSay.en}
              </p>
            </div>
          </div>

          {/* Cultural & Psychological Safety Rationale */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/95 p-5 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldAlert className="h-4 w-4" />
              <span>
                {isAr
                  ? 'الحيثيات النفسية والثقافية في بيئة العمل السعودية'
                  : 'CULTURAL & PSYCHOLOGICAL SAFETY RATIONALE (SAUDI WORKPLACE)'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr ? scenario.culturalRationale.ar : scenario.culturalRationale.en}
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-2">
            <button
              onClick={handleProceed}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 px-6 font-extrabold text-slate-950 shadow-xl shadow-amber-400/20 hover:bg-amber-300 transition-all cursor-pointer text-base"
            >
              <span>
                {currentIndex + 1 < totalScenarios
                  ? isAr
                    ? 'الانتقال للسيناريو التالي'
                    : 'PROCEED TO NEXT SCENARIO'
                  : isAr
                  ? 'عرض تقرير التدقيق النهائي'
                  : 'VIEW OFFICIAL AUDIT REPORT'}
              </span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
