import type {QuizCreationRequestDTO} from "@/models/quiz/QuizCreationRequestDTO";
import axios from 'axios';
import type {AxiosResponse} from 'axios';
import type {QuizCreationResponseDTO} from "@/models/quiz/QuizCreationResponseDTO";
export class QuizCreationService {
    private static readonly api_url = "http://localhost:8080/api/v1"
    public static async createQuiz(quizCreationRequestDTO: QuizCreationRequestDTO): Promise<QuizCreationResponseDTO> {
        try {
            const result: AxiosResponse<QuizCreationResponseDTO> = await axios.post(this.api_url + "/create-quiz", quizCreationRequestDTO);
            return result.data;
        } catch (err) {
            console.log('error while creating quiz: ' + err);
            throw err;
        }
    }
}