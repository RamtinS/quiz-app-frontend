import {QuestionType} from '../models/quiz/QuestionType';

export class QuestionTypeUtility {

  static findQuestionType(object: any): QuestionType {
    if (this.questionIsMultipleChoice(object)) {
      return QuestionType.MULTIPLE_CHOICE;
    } else if (this.questionIsTrueOrFalse(object)) {
      return QuestionType.TRUE_OR_FALSE;
    }
    throw new Error('Invalid question type');
  }



  static questionIsMultipleChoice(object: any) {
    const dtoProperties: string[] = [ 'questionType', 'questionText', 'answers'];
    for (const key in object) {
      if (!dtoProperties.includes(key)) {
        return false;
      }
    }
    return true;
  }


  static questionIsTrueOrFalse(object: any) {
    const dtoProperties: string[] = ['questionType', 'questionText', 'questionIsCorrect'];
    for (const key in object) {
      if (!dtoProperties.includes(key)) {
        return false;
      }
    }
    return true;
  }
}