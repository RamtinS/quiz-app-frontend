import type {QuizDTO} from "@/models/quiz/QuizDTO";
import type {AxiosResponse} from 'axios';
import axios from 'axios';
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";

/**
 * Service class for interacting with quizzes.
 */
export class QuizService {
  private static readonly api_url = "http://localhost:8080/api/v1/quiz-management"

  /**
   * Retrieves quiz previews for a specified user.
   *
   * @param username The username of the user whose quizzes are to be retrieved.
   * @param page The page number of the paginated result.
   * @param pageSize The number of items per page.
   * @returns A Promise that resolves to an array of QuizPreviewDTO.
   */
  public static async getQuizPreviewsSpecifiedUser(username: string, page: number, pageSize: number): Promise<QuizPreviewDTO[]> {
    try {
      const url = this.api_url + "/users/" + username + "/previews" + `?pageSize=${pageSize}&page=${page}`;
      const result: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
      return result.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves a quiz by its ID.
   *
   * @param quizId The ID of the quiz to retrieve.
   * @returns A Promise that resolves to a QuizDTO.
   */
  public static async getQuizById(quizId: number): Promise<QuizDTO> {
    try {
      const url = this.api_url + "/quizzes/" + quizId;
      const result: AxiosResponse<QuizDTO> = await axios.get(url);
      return result.data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Retrieves quizzes based on specified criteria.
   *
   * @param pageSize The number of items per page.
   * @param page The page number of the paginated result.
   * @param title The title to search for.
   * @param searchInCategory Whether to search in category.
   * @param searchInTags Whether to search in tags.
   * @returns A Promise that resolves to an array of QuizPreviewDTO.
   */
  public static async getQuizBySpecifiedCriteria(pageSize: number, page: number, title: string, searchInCategory: boolean, searchInTags: boolean): Promise<QuizPreviewDTO[]> {
    try {
      const url = this.api_url + "/browser/search" + `?pageSize=${pageSize}&page=${page}&title=${title}&searchInCategory=${searchInCategory}&searchInTags=${searchInTags}`;
      const result: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
      return result.data;
    } catch (err) {
      throw err;
    }
  }
}