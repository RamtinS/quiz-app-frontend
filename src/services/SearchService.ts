import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import axios from "axios";
import type {AxiosResponse} from 'axios';
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import type {SearchResultDTO} from "@/models/search/SearchResult";


export class SearchService {

    private static readonly quiz_api_url = "http://localhost:8080/api/v1/quiz-management"
    private static readonly user_api_url = "http://localhost:8080/api/v1/users"

    public static async searchQuizzesByName(name: string, page: number,
                                             pageSize: number): Promise<QuizPreviewDTO[]> {

        const url = this.quiz_api_url + "?" + "search=" + name + "&page=" + page + "&size=" + pageSize;
        console.log("url: " + url);
        try {
            const response: AxiosResponse<QuizPreviewDTO[]> = await axios.get(url);
            return response.data;
        } catch (err) {
            console.log('error in search service: ' + err);
            throw err;
        }
    }

    public static async searchUserByUsername(username: string, page: number,
                                             pageSize: number): Promise<PublicUserInformationDTO[]> {

        const url = this.user_api_url + "?" + "search=" + username + "&page=" + page + "&size=" + pageSize;
        console.log("url: " + url);
        try {
            const response: AxiosResponse<PublicUserInformationDTO[]> = await axios.get(url);
            return response.data;
        } catch (err) {
            console.log('error in search service: ' + err);
            throw err;
        }
    }



}