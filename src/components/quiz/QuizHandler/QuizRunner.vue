
  <script async setup lang="ts">
  import {ref, watch} from "vue";
  import type {QuizDTO} from "@/models/quiz/QuizDTO";
  import router from "@/router";
  import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
  import MultipleChoiceAnswerPicker from "@/components/quiz/QuizHandler/QuestionTypes/MultipleChoice.vue";
  import type {AnswerDTO} from "@/models/quiz/AnswerDTO";
  import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
  import TrueFalsePicker from "@/components/quiz/QuizHandler/QuestionTypes/Boolean.vue";
  import InputFieldAnswer from "@/components/quiz/QuizHandler/QuestionTypes/TextInput.vue";
  import { QuestionTypeUtility } from "@/models/quiz/QuestionTypeUtility"

  const props = defineProps (
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

  let restartMessage = ref("");


  /**
   * Handles various operations when an answer to a question has been given.
   * Verifies the answer, checks to see if the quiz is done and lastly, threads over to the next question.
   *
   * @param answer the chosen answer, which is to be verified for score points.
   */
  function handleAnswer(answer: AnswerDTO) {
    verifyAnswer(answer)
    isQuizComplete()
    questionIndex.value++
  }


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
  function verifyAnswer(answer: AnswerDTO) {
    if (answer.correct) {
      score++;
    }
  }


  /**
   * Checks to see if the quiz is finished.
   */
  function isQuizComplete() {
    if (questionIndex.value == quiz.value.questions.length -1) {
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
   * Checks the fields in the current question to determine if it is of type multiple choice.
   */
  function questionIsMultipleQuestion() {
    return QuestionTypeUtility.questionIsMultipleChoice(currentQuestion)
  }


  function questionIsBoolean(){
    return QuestionTypeUtility.questionIsTrueOrFalse(currentQuestion)
  }

  function isQuestionBoolean() {

    const dtoProperties = ['questionText', 'answers'];

    for (const key in currentQuestion.value) {
      if (!dtoProperties.includes(key)) {
        console.log(key)
        return false;
      }
    }
    return true;
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

        <MultipleChoiceAnswerPicker
            v-if="questionIsMultipleChoice()"
            :question="currentQuestion"
        @answer-selected="handleAnswer">
        </MultipleChoiceAnswerPicker>
      </div>

    </div>

    <div class="end-container" v-show="quizCompleted">
      <h1>
        {{ restartMessage }}
      </h1>

      <button @click="returnToPreviousRouterPage">
        Go Back.
      </button>

      <button @click="resetQuiz">
        Restart quiz.
      </button>
    </div>

  </template>

  <style scoped>

  .title-container {
    text-align: center;
  }
  .end-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .end-container button {
    text-align: center;
    background-color: #720072;
    color: white;
    width: 100px;
    padding: 25px;
    border-radius: 10px;
    margin: 10px;
    font-weight: bold;
    border: 0;
  }

  .end-container button:hover {
    background-color: #360036;
  }


  </style>