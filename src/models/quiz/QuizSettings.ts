import type { TagDTO } from "@/models/quiz/TagDTO";

/**
 * Type class for quiz settings
 */
export type QuizSettings = {
  title: string;
  description: string;
  open: boolean;
  categoryDescription: string;
  tags: TagDTO[];
};
