import React from 'react';
import { Language, ParticipantData } from '../types/pfa';
import { Shield, Globe, User, Award, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  participant: ParticipantData | null;
  currentStep: number;
  totalSteps: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  participant,
  currentStep,
  totalSteps,
  soundEnabled,
  onToggleSound,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20">
            <Shield className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-slate-100 text-base sm:text-lg">
                {isAr ? 'مطار الملك سلمان الدولي' : 'KSIA RIYADH'}
              </span>
              <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-400/30">
                {isAr ? 'فريق PFA' : 'PFA SIMULATOR'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {isAr
                ? 'الدعم النفسي الأولي والرعاية الذاتية لما بعد الأزمات'
                : 'Psychological First Aid & Human Post-Crisis Care'}
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Participant Tag */}
          {participant && (
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 border border-slate-700/60">
              <User className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-semibold text-slate-200 truncate max-w-[120px]">
                {participant.fullName}
              </span>
              <span className="font-mono text-slate-400 text-[10px]">
                #{participant.employeeId}
              </span>
            </div>
          )}

          {/* Step Progress pill if in scenario */}
          {totalSteps > 0 && currentStep > 0 && currentStep <= totalSteps && (
            <div className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 border border-slate-700">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {currentStep}/{totalSteps}
              </span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:text-white transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-amber-400" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-500" />
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center rounded-lg border border-slate-700 bg-slate-800 p-0.5">
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="h-3 w-3" />
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                language === 'ar'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              عربي
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
