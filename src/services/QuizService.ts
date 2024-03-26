import type {QuizDTO} from "@/models/quiz/QuizDTO";
import type {AxiosResponse} from 'axios';
import axios from 'axios';
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {QuizCreationResponseDTO} from "@/models/quiz/QuizCreationResponseDTO";


export class QuizService {
    private readonly api_url = "http://localhost:8080/api/v1/quizzes"

    async getQuizzesPublic(): Promise<QuizDTO[]> {
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
                const questions: QuizQuestionDTO[] =  [
                    {
                        question: "(1)What is 1+0?",
                        answers: [
                            {answerText: "1", isCorrect: true},
                            {answerText: "2", isCorrect: false},
                        ],
                        explanation: "it is"
                    },
                    {
                        question: "(2) What is 1+1?",
                        answers: [
                            {answerText: "a", isCorrect: false},
                            {answerText: "b", isCorrect: false},
                            {answerText: "c", isCorrect: false},
                            {answerText: "2", isCorrect: true},
                        ],
                        explanation: "it is 2"
                    },
                    {
                        question: "(3) What is 1+2?",
                        answers: [
                            {answerText: "1", isCorrect: false},
                            {answerText: "2", isCorrect: false},
                            {answerText: "3", isCorrect: true},
                            {answerText: "4", isCorrect: false},
                        ],
                        explanation: "it is 3"
                    },
                    {
                        question: "(4) What is 1+3?",
                        answers: [
                            {answerText: "1", isCorrect: false},
                            {answerText: "2", isCorrect: false},
                            {answerText: "3", isCorrect: false},
                            {answerText: "4", isCorrect: true},
                        ],
                        explanation: "it is 4"
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
            console.log('error in quiz service: ' + err);
            throw err;
        }
    }

    async getQuizzesForLoggedInnUser(): Promise<QuizDTO[]> {
        try {
            const result: AxiosResponse<QuizDTO[]> = await axios.get(this.api_url + "/user-quizzes-all");
            return result.data;

        } catch (err) {
            console.log('error in quiz service: ' + err);
            throw err;
        }
    }




}