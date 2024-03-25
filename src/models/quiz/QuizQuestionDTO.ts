export type QuizQuestionDTO = {
    question: string;
    answers: string[];
    correctAnswers: boolean[];
    explanation: string | null;
}