/**
 * Utility class to determine the type of question based on the properties of the object.
 */
export class QuestionTypeUtility {

  /**
   * Checks if the object is a multiple choice question.
   * @param object The object to check.
   */
  static questionIsMultipleChoice(object: any) {
    const dtoProperties: string[] = ["questionType", "questionText", "answers"];
    for (const key in object) {
      if (!dtoProperties.includes(key)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Checks if the object is a true or false question.
   * @param object The object to check.
   */
  static questionIsTrueOrFalse(object: any) {
    const dtoProperties: string[] = [
      "questionType",
      "questionText",
      "questionIsCorrect",
    ];
    for (const key in object) {
      if (!dtoProperties.includes(key)) {
        return false;
      }
    }
    return true;
  }
}
