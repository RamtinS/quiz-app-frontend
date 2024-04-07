import type { QuizQuestionDTO } from "@/models/quiz/QuizQuestionDTO";

/**
 * DTO for a true or false question
 */
export interface TrueOrFalseQuestionDTO extends QuizQuestionDTO {
  questionIsCorrect: boolean;
}
