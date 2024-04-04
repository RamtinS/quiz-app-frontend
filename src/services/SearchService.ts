import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import axios from "axios";
import type {AxiosResponse} from 'axios';
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";


export class SearchService {

    private static readonly api_url = "http://localhost:8080/api/v1/quiz-management"

    public static async searchQuizzesByName(name: string, page: number,
                                             pageSize: number): Promise<QuizPreviewDTO> {

        const url = this.api_url + "?" + "search=" + name + "&page=" + page + "&size=" + pageSize;
        console.log("url: " + url);
        try {
            const response: AxiosResponse<QuizPreviewDTO> = await axios.get(url);
            return response.data;
        } catch (err) {
            console.log('error in search service: ' + err);
            throw err;
        }
    }

}