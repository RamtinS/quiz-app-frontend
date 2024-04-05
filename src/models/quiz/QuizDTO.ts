import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

export type QuizDTO = {
    quizId: number;
    name: string;
    date: Date;
    creator: string;
    description: string;
    questions: QuizQuestionDTO[];
    open: boolean;
}

