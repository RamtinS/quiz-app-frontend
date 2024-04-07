import type { QuizQuestionDTO } from "@/models/quiz/QuizQuestionDTO";
import type { AnswerDTO } from "@/models/quiz/AnswerDTO";

/**
 * DTO for a multiple choice question
 */
export interface MultipleChoiceQuestionDTO extends QuizQuestionDTO {
  answers: AnswerDTO[];
}
