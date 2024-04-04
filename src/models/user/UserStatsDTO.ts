export type UserStatsDTO = {
  quizAttemptsPerDay: Map<string, number>;
  totalQuizAttempts: number;
  totalScore: number;
}