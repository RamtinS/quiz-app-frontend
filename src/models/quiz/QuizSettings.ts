import type {TagDTO} from "@/models/quiz/TagDTO";

export type QuizSettings = {
  title: string;
  description: string;
  open: boolean;
  tags: TagDTO[];
}