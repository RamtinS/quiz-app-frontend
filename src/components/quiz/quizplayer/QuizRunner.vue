<script async setup lang="ts">
import { ref, watch } from "vue";
import type { QuizDTO } from "@/models/quiz/QuizDTO";
import router from "@/router";
import type { QuizQuestionDTO } from "@/models/quiz/QuizQuestionDTO";
import MultipleChoiceView from "@/components/quiz/quizplayer/questiontypes/MultipleChoice.vue";
import type { AnswerDTO } from "@/models/quiz/AnswerDTO";
import { QuestionTypeUtility } from "@/utility/QuestionTypeUtility";
import { QuizAttemptService } from "@/services/QuizAttemptService";
import type { QuizAttemptDTO } from "@/models/quiz/QuizAttemptDTO";
import QuizExit from "@/components/quiz/quizplayer/questiontypes/QuizExit.vue";
import BooleanChoice from "@/components/quiz/quizplayer/questiontypes/BooleanChoice.vue";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import type {TrueOrFalseQuestionDTO} from "@/models/quiz/TrueOrFalseQuestionDTO";

const props = defineProps({
  quiz: {
    type: Object as () => QuizDTO,
    required: true,
  },
});

let quiz = ref(props.quiz as QuizDTO);
let questions = ref(shuffleArray(quiz.value.questions));
let questionIndex = ref(0);
let currentQuestion = ref<QuizQuestionDTO>(
  questions.value[questionIndex.value],
);
let score = 0;
let quizCompleted = false;
let restartMessage = ref("");

/**
 * Shuffles the array of questions.
 *
 * @param array the array of questions to be shuffled.
 */
function shuffleArray(array: QuizQuestionDTO[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Watcher which checks if the questionIndex gets updates.
 * If so, updates the current question.
 */
watch(questionIndex, (newValue) => {
  currentQuestion.value = quiz.value.questions[newValue];
});

/**
 * Handles various operations when an answer to a question has been given.
 * Verifies the answer, checks to see if the quiz is done and lastly, threads over to the next question.
 *
 * @param answer the chosen answer, which is to be verified for score points.
 */
function handleAnswer(answer: AnswerDTO | any) {
  verifyAnswer(answer);
  isQuizComplete();
  questionIndex.value++;
}

/**
 * Resets a quiz to its initial state.
 */
function resetQuiz() {
  questionIndex.value = 0;
  quiz.value.questions = shuffleArray(quiz.value.questions);
  currentQuestion.value = quiz.value.questions[questionIndex.value];
  score = 0;
  quizCompleted = false;
}

/**
 * Method for taking an answer and checking whether they are correct.
 * If so, add a point to the user.
 *
 * @param answer is the answer in which we are going to check.
 */
function verifyAnswer(answer: boolean) {
  if (answer) {
    score++;
  }
}

/**
 * Checks to see if the quiz is finished.
 */
function isQuizComplete() {
  if (questionIndex.value == quiz.value.questions.length - 1) {
    quizCompleted = true;
    restartMessage.value =
      "Quiz finished, you got " +
      score +
      " correct answer" +
      (score === 1 ? "" : "s") +
      " out of " +
      (quiz.value.questions.length | 0);
    handleSubmit();
  }
}

/**
 * Method to return back to the previous site.
 */
function returnToPreviousRouterPage() {
  router.go(-1);
}

/**
 * Checks whether the current question is of type boolean.
 * Returns true if so. False if not.
 */
function isQuestionBoolean() {
  return QuestionTypeUtility.questionIsTrueOrFalse(currentQuestion.value);
}

/**
 * Checks whether the current question is of type boolean.
 * Returns true if so. False if not.
 */
function isQuestionMultipleQuestion() {
  return QuestionTypeUtility.questionIsMultipleChoice(currentQuestion.value);
}

/**
 * Handle submits for quiz attempts.
 * Takes the score and id from quiz and sends it down to backend for persistent storage.
 */
async function handleSubmit() {
  const quizAttempt: QuizAttemptDTO = {
    score: score,
    quizId: quiz.value.quizId,
  };
  try {
    await QuizAttemptService.sendQuizAttempt(quizAttempt);
    handleSubmissionSuccess();
  } catch (error) {
    handleSubmissionError(error);
  } finally {
    //resetQuiz();
    //returnToPreviousRouterPage();
  }
}

/**
 * General info for managing successive requests.
 */
function handleSubmissionSuccess() {
  console.log("Form successfully submitted!");
}

/**
 * General info for managing errors.
 */
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
      <img
        src="../../../assets/images/detective.png"
        height="200"
        width="200"
        alt="Quiz Picture"
      />
    </div>

    <div class="answer-container">
      <MultipleChoiceView
        v-if="isQuestionMultipleQuestion() && !quizCompleted"
        :question="currentQuestion as MultipleChoiceQuestionDTO"
        @answer-selected="handleAnswer"
      >
      </MultipleChoiceView>

      <BooleanChoice
        v-if="isQuestionBoolean() && !quizCompleted"
        :question="currentQuestion as TrueOrFalseQuestionDTO"
        @answer-selected="handleAnswer"
      >
      </BooleanChoice>

      <QuizExit
        v-if="quizCompleted"
        :score="score"
        :quiz="quiz"
        @exit-selected="returnToPreviousRouterPage"
        @restart-selected="resetQuiz"
      >
      </QuizExit>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  text-align: center;
}

.answer-container {
  min-width: 400px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 300px;
  height: auto;
}
</style>
