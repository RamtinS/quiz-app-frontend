import type { QuizQuestionDTO } from "@/models/quiz/QuizQuestionDTO";
import type { TagDTO } from "@/models/quiz/TagDTO";

/**
 * DTO for a quiz creation request
 */
export type QuizCreationRequestDTO = {
  title: string;
  description: string;
  categoryDescription: string;
  questions: QuizQuestionDTO[];
  tags: TagDTO[];
  open: boolean;
};
