export type Language = 'en' | 'ar';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ScenarioOption {
  id: string;
  text: LocalizedText;
  correct: boolean;
  scriptToSay?: LocalizedText;
  scriptNotToSay?: LocalizedText;
}

export interface Scenario {
  id: string;
  phaseId: 'phase1' | 'phase2';
  title: LocalizedText;
  category?: LocalizedText;
  description: LocalizedText;
  imageUrl?: string;
  options: ScenarioOption[];
  explanation: LocalizedText;
  whatToSay: LocalizedText;
  whatNotToSay: LocalizedText;
  culturalRationale: LocalizedText;
}

export interface Phase {
  id: 'phase1' | 'phase2';
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
}

export interface UserAnswer {
  scenarioId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timestamp: string;
}

export interface ParticipantData {
  fullName: string;
  employeeId: string;
  assessmentDate: string;
}

export interface PfaAuditReport {
  participant: ParticipantData;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers: UserAnswer[];
  completionTime: string;
  auditHash: string;
}
