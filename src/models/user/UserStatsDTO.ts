export type UserStatsDTO = {
  quizAttemptsLastSevenDays: Map<string, number>;
  totalQuizAttempts: number;
  totalScore: number;
}