export interface Topic {
  id: string;
  name: string;
  theoryCompleted: boolean;
  notes?: string;
}

export interface Discipline {
  id: number | string;
  name: string;
  colorHex: string;
  studiedTopics: number;
  totalTopics: number;
  questionsDone: number;
  topics: Topic[];
}

export type GoalType = 'THEORY' | 'REVISION' | 'QUESTIONS';

export interface DailyGoal {
  id: string;
  subject: string;
  topicName: string;
  type: GoalType;
  durationMinutes: number;
  completed: boolean;
  revisionTag?: string;
  tecUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
}

export interface StudySessionRecord {
  id: string;
  disciplineId: number | string;
  disciplineName: string;
  topicName: string;
  durationMinutes: number;
  questionsSolved: number;
  questionsCorrect: number;
  date: string;
}

export interface WeeklyKpi {
  studiedHours: number;
  targetHours: number;
  questionsDone: number;
  targetQuestions: number;
  editalProgressPercent: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
}
