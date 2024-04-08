/**
 * Dto for receiving user stats
 */
export type UserStatsDTO = {
  quizAttemptsLastSevenDays: Map<string, number>;
  totalQuizAttempts: number;
  totalScore: number;
};
