import React, { useState } from 'react';
import { Language, ParticipantData } from '../types/pfa';
import {
  ShieldAlert,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  UserCheck,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { sfx } from '../utils/audio';

interface RegistrationScreenProps {
  language: Language;
  onStartSimulation: (data: ParticipantData) => void;
  soundEnabled: boolean;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  language,
  onStartSimulation,
  soundEnabled,
}) => {
  const isAr = language === 'ar';
  const todayStr = new Date().toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(todayStr);
  const [errors, setErrors] = useState<{ fullName?: string; employeeId?: string }>({});

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { fullName?: string; employeeId?: string } = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = isAr
        ? 'يرجى إدخال الاسم الثلاثي بالكامل (3 أحرف على الأقل)'
        : 'Please enter your full name (at least 3 characters)';
    }

    if (!employeeId.trim()) {
      newErrors.employeeId = isAr
        ? 'يرجى إدخال الرقم الوظيفي الرسمي'
        : 'Please enter your official employee ID number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (soundEnabled) sfx.playIncorrect();
      return;
    }

    setErrors({});
    if (soundEnabled) sfx.playSuccess();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    onStartSimulation({
      fullName: fullName.trim(),
      employeeId: employeeId.trim(),
      assessmentDate,
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:py-8">
      {/* Top Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col items-start gap-3 border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-400/30">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>
              {isAr
                ? 'مجمع إدارة مطار الملك سلمان الدولي'
                : 'King Salman International Airport (KSIA)'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {isAr
              ? 'محاكي الدعم النفسي الأولي والرعاية الذاتية لما بعد الأزمات'
              : 'Psychological First Aid & Post-Crisis Human Support Simulator'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'تدريب تفاعلي وتطبيقي وفق معايير منظمة الصحة العالمية (WHO PFA) واللجنة الدائمة المشتركة (IASC MHPSS) وتوجيهات وزارة الصحة السعودية.'
              : 'Interactive operational simulation adhering to WHO PFA, IASC MHPSS standards, and Saudi Ministry of Health protocols.'}
          </p>
        </div>

        {/* Untimed Notice Banner */}
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 sm:p-4 text-emerald-200">
          <div className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold text-emerald-300">
              {isAr ? 'بدون مؤقت زمني — وتيرة مريحة وتأمل هادئ' : 'Untimed Simulation — Reflective Pace'}
            </h2>
          </div>
          <p className="mt-1 text-[11px] sm:text-xs text-emerald-200/90 leading-relaxed">
            {isAr
              ? 'خذ وقتك لقراءة كل موقف والصورة الواقعية المصاحبة بعناية واختيار الاستجابة المناسبة.'
              : 'Take your time to examine each realistic scene and select your response with complete focus.'}
          </p>
        </div>

        {/* REGISTRATION FORM */}
        <form onSubmit={validateAndSubmit} className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-amber-400" />
              <span>
                {isAr ? 'بيانات المستجيب / الموظف' : 'Responder Identification'}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isAr
                ? 'ستظهر هذه البيانات في تقرير التدقيق النهائي بصيغة PDF.'
                : 'These details will appear on your official PDF audit report.'}
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isAr ? 'مثال: محمد بن سعد القحطاني' : 'e.g. Sarah Al-Harbi'}
                className={`w-full rounded-xl border bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400/30'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isAr ? 'الرقم الوظيفي *' : 'Employee ID Number *'}
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder={isAr ? 'مثال: 88420' : 'e.g. 90412'}
                className={`w-full rounded-xl border bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.employeeId
                    ? 'border-red-500 focus:ring-red-500/50'
                    : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400/30'
                }`}
              />
              {errors.employeeId && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span>{errors.employeeId}</span>
                </p>
              )}
            </div>

            {/* Assessment Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>{isAr ? 'تاريخ التقييم' : 'Assessment Date'}</span>
              </label>
              <input
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-3 text-sm text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 px-6 font-extrabold text-slate-950 shadow-lg shadow-amber-400/20 hover:bg-amber-300 active:scale-[0.99] transition-all cursor-pointer text-sm sm:text-base"
            >
              <span>{isAr ? 'بدء المحاكي الآن' : 'START SIMULATOR'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Guidelines Reference Footnote */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-2.5">
          <BookOpen className="mx-auto h-3.5 w-3.5 text-amber-400 mb-1" />
          <div className="text-[11px] font-bold text-slate-300">WHO PFA</div>
          <div className="text-[10px] text-slate-400">Look, Listen, Link</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-2.5">
          <ShieldAlert className="mx-auto h-3.5 w-3.5 text-emerald-400 mb-1" />
          <div className="text-[11px] font-bold text-slate-300">IASC MHPSS</div>
          <div className="text-[10px] text-slate-400">Inter-Agency Standards</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-2.5">
          <Sparkles className="mx-auto h-3.5 w-3.5 text-cyan-400 mb-1" />
          <div className="text-[11px] font-bold text-slate-300">Saudi MOH 937</div>
          <div className="text-[10px] text-slate-400">24/7 Psychological Care</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-2.5">
          <HeartHandshake className="mx-auto h-3.5 w-3.5 text-purple-400 mb-1" />
          <div className="text-[11px] font-bold text-slate-300">NCMHP Qareebon</div>
          <div className="text-[10px] text-slate-400">National Mental Health</div>
        </div>
      </div>
    </div>
  );
};
