import type {QuizDTO} from "@/models/quiz/QuizDTO";
import type {AxiosResponse} from 'axios';
import axios from 'axios';
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";

export class QuizService {
  private static readonly api_url = "http://localhost:8080/api/v1/quiz-management"

  public static async getQuizPreviewsPublic(page: number, pageSize: number): Promise<QuizPreviewDTO[]> {
    try {
      const url = this.api_url + "/browser/previews" + `?pageSize=${pageSize}&page=${page}`;
      console.log("url: " + url);
      const result: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
      return result.data;

    } catch (err) {
      console.log('error: ' + err);
      throw err;
    }
  }

  public static async getQuizPreviewsSpecifiedUser(username: string, page: number, pageSize: number): Promise<QuizPreviewDTO[]> {
    try {
      const url = this.api_url + "/users/" + username + "/previews" + `?pageSize=${pageSize}&page=${page}`;
      console.log("url: " + url);
      const result: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
      return result.data;

    } catch (err) {
      console.log('error: ' + err);
      throw err;
    }
  }

  public static async getQuizById(quizId: number): Promise<QuizDTO> {
    try {
      const url = this.api_url + "/quizzes/" + quizId;
      console.log("fetching quiz with id: " + quizId + " from url: " + url);
      const result: AxiosResponse<QuizDTO> = await axios.get(url);
      return result.data;


    } catch (err) {
      console.log('error in quiz service: ' + err);
      throw err;
    }
  }

  public static async getQuizBySpecifiedCriteria( pageSize: number, page: number, title: string, searchInCategory: boolean, searchInTags: boolean): Promise<QuizPreviewDTO[]> {
    try {
      const url = this.api_url + "/browser/search" + `?pageSize=${pageSize}&page=${page}&title=${title}&searchInCategory=${searchInCategory}&searchInTags=${searchInTags}`;
      console.log("url: " + url);
      const result: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
      return result.data;

    } catch (err) {
      console.log('error: ' + err);
      throw err;
    }

  }












}