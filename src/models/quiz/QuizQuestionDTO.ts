import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

export type QuizQuestionDTO = {
    question: string;
    answers: AnswerDTO[];
    explanation: string | null;
}