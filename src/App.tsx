import React, { useState, useEffect } from 'react';
import { Language, ParticipantData, UserAnswer, PfaAuditReport } from './types/pfa';
import { PFA_SCENARIOS } from './data/pfaDataset';
import { Navbar } from './components/Navbar';
import { RegistrationScreen } from './components/RegistrationScreen';
import { SimulationScreen } from './components/SimulationScreen';
import { PhaseTransitionModal } from './components/PhaseTransitionModal';
import { AuditScreen } from './components/AuditScreen';

type AppScreen = 'registration' | 'simulation' | 'phase_transition' | 'audit';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('registration');
  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [finalReport, setFinalReport] = useState<PfaAuditReport | null>(null);

  // Sync HTML dir attribute whenever language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Handle language switch
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  // Start Simulation from Registration
  const handleStartSimulation = (data: ParticipantData) => {
    setParticipant(data);
    setAnswers({});
    setCurrentScenarioIndex(0);
    setCurrentScreen('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Answer selected in a scenario
  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    const scenario = PFA_SCENARIOS[currentScenarioIndex];
    if (!scenario) return;

    setAnswers((prev) => ({
      ...prev,
      [scenario.id]: {
        scenarioId: scenario.id,
        selectedOptionId: optionId,
        isCorrect,
        timestamp: new Date().toISOString()
      }
    }));
  };

  // Moving to next scenario or phase transition
  const handleNextScenario = () => {
    // If just finished Scenario 103 (index 2), show Phase 2 Transition Modal!
    if (currentScenarioIndex === 2) {
      setCurrentScreen('phase_transition');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If still have scenarios
    if (currentScenarioIndex + 1 < PFA_SCENARIOS.length) {
      setCurrentScenarioIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 6 scenarios -> Calculate audit report
      compileAuditReport();
    }
  };

  // User confirmed Phase 2 transition modal
  const handleContinueToPhase2 = () => {
    setCurrentScenarioIndex(3); // Start Scenario 201 (index 3)
    setCurrentScreen('simulation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compile final audit
  const compileAuditReport = () => {
    if (!participant) return;

    const answerList: UserAnswer[] = Object.values(answers);
    const score = answerList.filter((a) => a.isCorrect).length;
    const totalQuestions = PFA_SCENARIOS.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = score >= 5;

    // Generate deterministic verification code
    const randPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const auditHash = `KSIA-PFA-${participant.employeeId}-${Date.now().toString().slice(-4)}-${randPart}`;

    const report: PfaAuditReport = {
      participant,
      score,
      totalQuestions,
      percentage,
      passed,
      answers: answerList,
      completionTime: new Date().toISOString(),
      auditHash
    };

    setFinalReport(report);
    setCurrentScreen('audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restart simulation
  const handleRetake = () => {
    setAnswers({});
    setCurrentScenarioIndex(0);
    setFinalReport(null);
    setCurrentScreen('registration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentScenario = PFA_SCENARIOS[currentScenarioIndex];
  const currentScenarioAnswer = currentScenario ? answers[currentScenario.id] : undefined;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Dynamic Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        participant={participant}
        currentStep={currentScreen === 'simulation' ? currentScenarioIndex + 1 : 0}
        totalSteps={PFA_SCENARIOS.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentScreen === 'registration' && (
          <RegistrationScreen
            language={language}
            onStartSimulation={handleStartSimulation}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'simulation' && currentScenario && (
          <SimulationScreen
            language={language}
            scenario={currentScenario}
            currentIndex={currentScenarioIndex}
            totalScenarios={PFA_SCENARIOS.length}
            userAnswer={currentScenarioAnswer}
            onSelectOption={handleSelectOption}
            onNextScenario={handleNextScenario}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'phase_transition' && (
          <PhaseTransitionModal
            language={language}
            onContinue={handleContinueToPhase2}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'audit' && finalReport && (
          <AuditScreen
            language={language}
            report={finalReport}
            onRetake={handleRetake}
            soundEnabled={soundEnabled}
          />
        )}
      </main>
    </div>
  );
}
