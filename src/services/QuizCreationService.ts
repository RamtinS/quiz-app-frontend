import type { QuizCreationRequestDTO } from "@/models/quiz/QuizCreationRequestDTO";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { QuizCreationResponseDTO } from "@/models/quiz/QuizCreationResponseDTO";

/**
 * Service for quiz creation and editing
 */
export class QuizCreationService {
  private static readonly api_url =
    "http://localhost:8080/api/v1/quiz-management";

  /**
   * Get a quiz by its id
   * @param quiz id of the quiz
   * @throws error if the quiz could not be retrieved
   */
  public static async postQuizForLoggedInnUser(
    quiz: QuizCreationRequestDTO,
  ): Promise<QuizCreationResponseDTO> {
    try {
      const result: AxiosResponse<QuizCreationResponseDTO> = await axios.post(
        this.api_url + "/quizzes",
        quiz,
      );
      return result.data;
    } catch (err) {
      console.error("error in quiz service: ", err);
      throw err;
    }
  }

  /**
   * Update a quiz
   * @param quizCreationRequestDTO the quiz to be updated
   * @param quizId id of the quiz
   * @throws error if the quiz could not be updated
   */
  public static async updateQuizForLoggedInUser(
    quizCreationRequestDTO: QuizCreationRequestDTO,
    quizId: number,
  ): Promise<QuizCreationResponseDTO> {
    try {
      const result: AxiosResponse<QuizCreationResponseDTO> = await axios.put(
        this.api_url + "/editor/" + quizId,
        quizCreationRequestDTO,
      );
      return result.data;
    } catch (err) {
      console.error("error in quiz service: ", err);
      throw err;
    }
  }

  /**
   * Delete a quiz
   * @param quizId id of the quiz
   * @throws error if it the quiz could not be deleted
   */
  public static async deleteQuiz(quizId: number): Promise<void> {
    try {
      console.log("deleting quiz with id: ", quizId);
      await axios.delete(this.api_url + "/editor/" + quizId);
    } catch (err) {
      console.error("error in quiz service: ", err);
      throw err;
    }
  }
}
