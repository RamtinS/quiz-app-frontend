import type {QuizCreationRequestDTO} from "@/models/quiz/QuizCreationRequestDTO";
import axios from 'axios';
import type {AxiosResponse} from 'axios';
import type {QuizCreationResponseDTO} from "@/models/quiz/QuizCreationResponseDTO";
export class QuizCreationService {
    private static readonly api_url = "http://localhost:8080/api/v1/quiz-management"


    public static async postQuizForLoggedInnUser(quiz: QuizCreationRequestDTO): Promise<QuizCreationResponseDTO> {
        try {
            const result: AxiosResponse<QuizCreationResponseDTO> = await axios.post(this.api_url + "/quizzes", quiz);
            return result.data;
        } catch (err) {
            console.log('error in quiz service: ' + err);
            throw err;
        }
    }
}