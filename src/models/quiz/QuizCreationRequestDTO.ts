import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

export type QuizCreationRequestDTO = {
    title: string;
    description: string;
    questions: QuizQuestionDTO[];
    open: boolean;
}