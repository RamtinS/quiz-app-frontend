import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

export interface MultipleChoiceQuestionDTO extends QuizQuestionDTO {
  answers: AnswerDTO[];
}