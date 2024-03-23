import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

export type QuizDTO = {
    quizId: number;
    title: string;
    date: Date;
    creator: string;
    description: string;
    questions: QuizQuestionDTO[];
}

//TODO add image