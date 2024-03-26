import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

export type QuizQuestionDTO = {
    questionText: string;
    answers: AnswerDTO[];
}