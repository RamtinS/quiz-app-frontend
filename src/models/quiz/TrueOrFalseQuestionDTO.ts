import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

export interface TrueOrFalseQuestionDTO extends QuizQuestionDTO {
  questionIsCorrect: boolean;
}