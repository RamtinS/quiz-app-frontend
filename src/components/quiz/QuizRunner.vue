<script async setup lang="ts">

import {ref} from "vue";
import type {QuizDTO} from "@/models/quiz/QuizDTO";
import router from "@/router";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import MultipleChoiceAnswerPicker from "@/components/quiz/MultipleChoiceAnswerPicker.vue";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

const props = defineProps(
    {
      quiz: {
        type: Object as () => QuizDTO,
        required: true,
      }
    }
);

const quiz = ref(props.quiz as QuizDTO)

const currentQuestionIndex = ref(0);

let currentQuestion = ref<QuizQuestionDTO>(quiz.value.questions[currentQuestionIndex.value])


const answerSubmitted = ref(false);
const answerIsCorrect = ref(false);
const correctAnswerCounter = ref(0);
const quizCompleted = ref(false);
const restartMessage = ref("");

function handleAnswer(answer: AnswerDTO) {
  answerSubmitted.value = true;
  answerIsCorrect.value = answer.correct;
  if (answerIsCorrect) {
    correctAnswerCounter.value ++;
  }
}


function nextQuestion() {
  answerSubmitted.value = false
  answerIsCorrect.value = false

  if (currentQuestionIndex.value === quiz.value.questions.length - 1) {

    quizCompleted.value = true;

    restartMessage.value = "Quiz finished, you got " +
        correctAnswerCounter.value + " correct answer" +
        (correctAnswerCounter.value === 1 ? "" : "s") +
        " out of " + (quiz.value.questions.length | 0);

  } else {
    //TODO current question might also have to be updated here "manually"
    currentQuestionIndex.value++

  }
}

function returnToPreviousRouterPage() {
  router.go(-1)
}


function resetQuiz() {
  currentQuestionIndex.value = 0
  correctAnswerCounter.value = 0
  answerSubmitted.value = false;
  quizCompleted.value = false;
}

function questionIsMultipleChoice() {
  const dtoProperties = ['questionText', 'answers'];
  console.log("MULTIPLECHOICE")
  for (const key in currentQuestion.value) {
    if (!dtoProperties.includes(key)) {
      return false;
    }
  }
  return true;
}

function questionIsTrueOrFalse() {
  const dtoProperties = ['questionText', 'correctAnswer'];
  console.log("TRUEFALSE")
  for (const key in currentQuestion.value) {
    if (!dtoProperties.includes(key)) {
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
      go back
    </button>
    <button @click="resetQuiz">
      Restart quiz
    </button>
  </div>


  <div id="button-container">
    <button id="next-question"
            @click="nextQuestion"
            v-show="answerSubmitted">
      Next question
    </button>
  </div>
</template>

<style scoped>

#question-container {
  padding: 50px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
}


.image-container {
  height: 400px;
  width: 90%;
  background: red;
}

.flex {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


.answer-container {
  width: 100%;
  max-width: 700px;
}

#button-container {
  text-align: center;
  margin: 10px;

  button {
    font-size: 2em;
  }
}

#finishedPrompt {
  width: 50%;
  background-color: var(--secondary-light);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 30px 30px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  text-align: center;

  h1 {
    width: 80%;
    word-wrap: break-word;
    text-align: center;
    margin: auto;
  }


  button {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--primary-light);
    color: white;
    font-size: 1.5em;
  }

  /*router link*/

  a {
    text-decoration: none;
    color: white;
  }


}
</style>