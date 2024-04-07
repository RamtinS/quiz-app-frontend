import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import type {TrueOrFalseQuestionDTO} from "@/models/quiz/TrueOrFalseQuestionDTO";

export class QuizValidationUtility {
  static multipleChoiceQuestionIsValid(question: MultipleChoiceQuestionDTO): string {
    if (question.questionType !== "MultipleChoiceQuestionDTO") {
      return "There is something wrong with the question type"
    }

    const amountOfCorrectAnswers = question.answers.filter((answer) => answer.correct).length;

    if (amountOfCorrectAnswers < 1) {
      return "You need to have at least one correct answer"
    }
    if (question.answers.length === 0) {
      return "You need to have at least one answer"
    }
    const emptyAnswers = question.answers.filter((answer) => answer.answerText === '')
    if (emptyAnswers.length > 0) {
      console.log(emptyAnswers)
      return "You need to fill in all answers"
    }
    //No error
    return ""
  }

  static trueOrFalseQuestionIsValid(question: TrueOrFalseQuestionDTO) {
    if (question.questionType !== "TrueOrFalseQuestionDTO") {
      return "There is something wrong with the question type"
    }

  }
}