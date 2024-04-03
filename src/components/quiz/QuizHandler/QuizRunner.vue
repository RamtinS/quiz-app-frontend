<script async setup lang="ts">
import {ref, watch} from "vue";
import type {QuizDTO} from "@/models/quiz/QuizDTO";
import router from "@/router";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import MultipleChoiceView from "@/components/quiz/QuizHandler/QuestionTypes/MultipleChoice.vue";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import TrueFalsePicker from "@/components/quiz/QuizHandler/QuestionTypes/Boolean.vue";
import InputFieldAnswer from "@/components/quiz/QuizHandler/QuestionTypes/TextInput.vue";
import {QuestionTypeUtility} from "@/models/quiz/QuestionTypeUtility"
import MultipleChoice from "@/components/quiz/QuizHandler/QuestionTypes/MultipleChoice.vue";
import Boolean from "@/components/quiz/QuizHandler/QuestionTypes/Boolean.vue";
import {QuizAttemptService} from "@/services/QuizAttemptService";
import {ContactRequestDTO} from "@/models/contact/ContactRequestDTO";
import {FeedbackService} from "@/services/FeedbackService";
import type {QuizAttemptDTO} from "@/models/quiz/QuizAttemptDTO";
import QuizExit from "@/components/quiz/QuizHandler/QuestionTypes/QuizExit.vue";

const props = defineProps(
    {
      quiz: {
        type: Object as () => QuizDTO,
        required: true,
      }
    }
);

let quiz = ref(props.quiz as QuizDTO)
let questionIndex = ref(0);
let currentQuestion = ref<QuizQuestionDTO>(quiz.value.questions[questionIndex.value])
let score = 0;

// Watch for changes in questionIndex and update currentQuestion accordingly
watch(questionIndex, (newValue) => {
  currentQuestion.value = quiz.value.questions[newValue];
});

let answerSubmitted = false;
let quizCompleted = false;

console.log(quiz.questions)
let restartMessage = ref("");

/**
 * Handles various operations when an answer to a question has been given.
 * Verifies the answer, checks to see if the quiz is done and lastly, threads over to the next question.
 *
 * @param answer the chosen answer, which is to be verified for score points.
 */
function handleAnswer(answer: AnswerDTO | any) {

  verifyAnswer(answer)
  isQuizComplete()
  questionIndex.value++

}

/**
 * Resets a quiz to its initial state.
 */
function resetQuiz() {
  questionIndex.value = 0;
  currentQuestion.value = quiz.value.questions[questionIndex.value]
  score = 0
  answerSubmitted = false;
  quizCompleted = false;
}

/**
 * Method for taking an answer and checking whether they are correct.
 * If so, add a point to the user.
 *
 * @param answer is the answer in which we are going to check.
 */
function verifyAnswer(answer: AnswerDTO | any) {
  if (answer.correct || answer) {
    score++;
  }
}

/**
 * Checks to see if the quiz is finished.
 */
function isQuizComplete() {
  if (questionIndex.value == quiz.value.questions.length - 1) {
    quizCompleted = true;
    restartMessage.value = "Quiz finished, you got " +
        score + " correct answer" +
        (score === 1 ? "" : "s") +
        " out of " + (quiz.value.questions.length | 0);
  }
}

/**
 * Method to return back to the previous site.
 */
function returnToPreviousRouterPage() {
  router.go(-1)
}

/**
 * Checks whether the current question is of type boolean.
 * Returns true if so. False if not.
 */
function isQuestionBoolean() {
  return QuestionTypeUtility.questionIsTrueOrFalse(currentQuestion.value)
}


/**
 * Checks whether the current question is of type boolean.
 * Returns true if so. False if not.
 */
function isQuestionMultipleQuestion() {
  return QuestionTypeUtility.questionIsMultipleChoice(currentQuestion.value)
}

async function handleSubmit() {

  const quizAttempt: QuizAttemptDTO = {
    score: score,
    quizId: quiz.quizId
  }

  try {
    await QuizAttemptService.sendQuizAttempt(quizAttempt);
    handleSubmissionSuccess();
  } catch (error) {
    handleSubmissionError(error);
  } finally {
    resetQuiz();
    returnToPreviousRouterPage();
  }
}

function handleSubmissionSuccess() {
  console.log("Form successfully submitted!")
}

function handleSubmissionError(error: any) {
  let conformationMessage = "An error occurred during form submission.";
  console.log(conformationMessage, error);
}

</script>

<template>
  <div class="flex">
    <div class="title-container">
      <h1 v-if="currentQuestion">
        {{ currentQuestion.questionText }}
      </h1>
    </div>

    <div class="image-container">

    </div>

    <div class="answer-container">

      <MultipleChoiceView
          v-if="isQuestionMultipleQuestion() & !quizCompleted"
          :question="currentQuestion"
          @answer-selected="handleAnswer">
      </MultipleChoiceView>

      <Boolean
          v-if="isQuestionBoolean() & !quizCompleted"
          :question="currentQuestion"
          @answer-selected="handleAnswer">
      </Boolean>

      <QuizExit
          v-if=quizCompleted
          :score="score"
          :quiz="quiz"
          @exit-selected="returnToPreviousRouterPage"
          @restart-selected="resetQuiz"
          @save-selected="handleSubmit">
      </QuizExit>
    </div>
  </div>


</template>

<style scoped>

</style>