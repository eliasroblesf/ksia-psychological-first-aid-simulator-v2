import React from 'react';
import { Language } from '../types/pfa';
import { Sparkles, ArrowRight, HeartPulse, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sfx } from '../utils/audio';

interface PhaseTransitionModalProps {
  language: Language;
  onContinue: () => void;
  soundEnabled: boolean;
}

export const PhaseTransitionModal: React.FC<PhaseTransitionModalProps> = ({
  language,
  onContinue,
  soundEnabled,
}) => {
  const isAr = language === 'ar';

  const handleStartPhase2 = () => {
    if (soundEnabled) sfx.playSuccess();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onContinue();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl">
        {/* Glow backdrop */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 mb-4">
            <HeartPulse className="h-9 w-9" />
          </div>

          <span className="inline-block rounded-full bg-cyan-400/10 px-3.5 py-1 text-xs font-bold text-cyan-400 border border-cyan-400/30 uppercase tracking-wider">
            {isAr ? 'اكتمال المرحلة الأولى بنجاح' : 'PHASE 1 COMPLETE • ENTERING PHASE 2'}
          </span>

          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
            {isAr
              ? 'المرحلة 2: الرعاية الذاتية لما بعد الأزمة والدعم الإنساني للمستجيبين'
              : 'PHASE 2: Post-Crisis Self-Care, Processing & Human Support'}
            </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'تنتقل الآن من إدارة الميدان الحرج إلى رعاية الإنسان الذي استجاب للحدث. سنعالج مشاعر الذنب للمسعفين، كيفية فصل المراجعات التشغيلية (AAR) عن الدعم العاطفي، وشبكات الدعم السرية بالمملكة.'
              : 'Shifting from acute incident stabilization to caring for the caregivers. Learn how to navigate responder survivor guilt, maintain psychological boundaries during Operational After-Action Reviews (AAR), and mobilize Saudi MOH 937 / NCMHP confidential networks.'}
          </p>
        </div>

        {/* Core Competencies in Phase 2 */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                {isAr
                  ? 'معالجة مشاعر الذنب والإنعاش القلبي غير الناجح'
                  : 'Normalizing Stress & Guilt Post-Unsuccessful CPR'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'الاعتراف بأن الصدمة والأسى ردة فعل إنسانية طبيعية لحدث غير طبيعي.'
                  : 'Reassurance that moral distress is a standard acute reaction, not a professional failure.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                {isAr
                  ? 'فصل مراجعة العمليات AAR عن التفريغ النفسي'
                  : 'Strict Separation of Technical AAR from Clinical Debriefing'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'منع الصدمات الثانوية وحماية خصوصية المستجيب من الإفصاح الإجباري أمام الإدارة.'
                  : 'Ensuring AAR evaluates operational logistics without forcing public emotional disclosure.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-slate-100">
                {isAr
                  ? 'الربط بشبكات الدعم والسرية بالمملكة (وزارة الصحة 937 والمركز الوطني)'
                  : 'Confidential Saudi Referral Pathways (MOH 937 & NCMHP)'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'إزالة الوصمة وتأكيد الخصوصية القانونية المطلقة بموجب الأنظمة الصحية السعودية.'
                  : 'Bridging to external confidential support lines free from workplace administrative stigma.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleStartPhase2}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-8 py-3.5 text-base font-extrabold text-slate-950 shadow-xl shadow-cyan-400/20 hover:bg-cyan-300 transition-all cursor-pointer"
          >
            <span>{isAr ? 'بدء المرحلة الثانية' : 'START PHASE 2 SIMULATION'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
