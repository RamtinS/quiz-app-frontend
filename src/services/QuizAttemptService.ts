import axios from "axios";
import type { QuizAttemptDTO } from "@/models/quiz/QuizAttemptDTO";

export class QuizAttemptService {

  private static readonly api_url = "http://localhost:8080/api/v1/quiz-attempt"

  public static async sendQuizAttempt(quizAttemptDTO: QuizAttemptDTO): Promise<void> {
    try {
      await axios.post(this.api_url, quizAttemptDTO);
    } catch (err) {
      throw err;
    }
  }
}