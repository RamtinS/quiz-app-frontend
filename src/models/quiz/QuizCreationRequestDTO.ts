import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {TagDTO} from "@/models/quiz/TagDTO";

export type QuizCreationRequestDTO = {
    type: string;
    title: string;
    description: string;
    categoryDescription: string;
    questions: QuizQuestionDTO[];
    tags: TagDTO[];
    open: boolean;
}