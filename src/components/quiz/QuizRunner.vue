
  <script async setup lang="ts">

  import {ref, watch} from "vue";
  import type {QuizDTO} from "@/models/quiz/QuizDTO";
  import router from "@/router";
  import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
  import MultipleChoiceAnswerPicker from "@/components/quiz/MultipleChoiceAnswerPicker.vue";
  import type {AnswerDTO} from "@/models/quiz/AnswerDTO";
  import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
  import TrueFalsePicker from "@/components/quiz/TrueFalsePicker.vue";
  import InputFieldAnswer from "@/components/quiz/InputFieldAnswer.vue";

  const props = defineProps (
      {
        quiz: {
          type: Object as () => QuizDTO,
          required: true,
        }
      }
  );

  const quiz = ref(props.quiz as QuizDTO)

  let questionIndex = ref(0);
  let currentQuestion = ref(quiz.value.questions[questionIndex.value])

  let answerSubmitted = false;
  let answerIsCorrect = false;
  let score = 0;
  let quizCompleted = false;

  let restartMessage = ref("");


  function handleAnswer(answer: AnswerDTO) {

    verifyAnswer(answer)
    isQuizComplete()

    questionIndex.value++
    currentQuestion.value = quiz.value.questions[questionIndex.value]
  }

  function verifyAnswer(answer: AnswerDTO) {
    if (answer.correct) {
      score++;
    }
  }

  function isQuizComplete() {
    if (questionIndex.value == quiz.value.questions.length -1) {
      quizCompleted = true;
      restartMessage.value = "Quiz finished, you got " +
          score + " correct answer" +
          (score === 1 ? "" : "s") +
          " out of " + (quiz.value.questions.length | 0);
    }
  }


  function nextQuestion() {
  }

  /**
   * Method to return back to the previous site.
   */
  function returnToPreviousRouterPage() {
    router.go(-1)
  }


  /**
   * Method to reset quiz.
   */
  function resetQuiz() {
    questionIndex.value = 0
    score.value = 0
    answerSubmitted.value = false;
    quizCompleted.value = false;
  }


  //Method to check quizzes type.
  /**
   * Checks the fields in the current question to determine if it is of type multiple choice.
   */
  function questionIsMultipleChoice() {

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

      <div class="question-title">
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

    <div id="finishedPrompt" v-show="quizCompleted">
      <h1>
        {{ restartMessage }}
      </h1>
      <button @click="returnToPreviousRouterPage">
        go <back></back>
      </button>
      <button @click="resetQuiz">
        Restart quiz
      </button>
    </div>

  </template>

  <style scoped>
  </style>