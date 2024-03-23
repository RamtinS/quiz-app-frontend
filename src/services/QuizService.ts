import type {QuizDTO} from "@/models/quiz/QuizDTO";
import type {AxiosResponse} from 'axios';
import axios from 'axios';


export class QuizService {
    private readonly api_url = "http://localhost:8080/api/v1/quizzes"

    async getQuizzes(): Promise<QuizDTO[]> {
        try {
            const result: AxiosResponse<QuizDTO[]> = await axios.get(this.api_url + "/browse");
            return result.data;

        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }


    }

    async getQuizById(quizId: number): Promise<QuizDTO> {
        try {

            console.log("inserting test data")
            if (quizId < 0) {
                //test data
                const questions =  [
                    {
                        question: "(1)What is 1+0?",
                        answers: ["1", "2", "3", "4"],
                        correctAnswers: [0],
                        explanation: "it is"
                    },
                    {
                        question: "(2) What is 1+1?",
                        answers: ["a", "b", "c", "4"],
                        correctAnswers: [1],
                        explanation: "it is  "
                    },
                    {
                        question: "(3) What is 1+2?",
                        answers: ["1", "2", "3", "4"],
                        correctAnswers: [2],
                        explanation: "it is  "
                    },
                    {
                        question: "(4) What is 1+3?",
                        answers: ["1", "2", "3", "4"],
                        correctAnswers: [3],
                        explanation: "it is  "
                    }
                ];
                return {
                    quizId: -1,
                    title: "Test Quiz",
                    date: new Date(),
                    creator: "Test Creator",
                    description: "This is a test quiz",
                    questions: questions
                };

            } else {
                console.log("fetching data");
                const result: AxiosResponse<QuizDTO> = await axios.get(this.api_url + "/" + quizId);
                return result.data;
            }


        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }

    async getQuizzesByUser(userId: number): Promise<QuizDTO[]> {
        try {
            const result: AxiosResponse<QuizDTO[]> = await axios.get(this.api_url + "/" + userId + "/quizzes");
            return result.data;

        } catch (err) {
            console.log('error: ' + err);
            throw err;
        }
    }


}