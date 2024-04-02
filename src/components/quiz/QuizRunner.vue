<script async setup lang="ts">

import {ref} from "vue";

import type {QuizDTO} from "@/models/quiz/QuizDTO";
import router from "@/router";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import MultipleChoiceAnswerPicker from "@/components/quiz/MultipleChoiceAnswerPicker.vue";


const props = defineProps(
    {
      quiz: {
        type: Object as () => QuizDTO,
        required: true,
      }
    }
);


const quiz = ref(props.quiz as QuizDTO)
console.log(JSON.stringify(quiz.value));


const currentQuestionIndex = ref(0);

const currentQuestion = ref<QuizQuestionDTO>(quiz.value.questions[currentQuestionIndex.value])


const answerSubmitted = ref(false);
const answerIsCorrect = ref(false);
const correctAnswerCounter = ref(0);
const quizCompleted = ref(false);
const restartMessage = ref("");

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

  for (const key in currentQuestion.value) {
    if (!dtoProperties.includes(key)) {
      return false;
    }
  }
  return true;
}

function questionIsTrueOrFalse() {
  const dtoProperties = ['questionText', 'correctAnswer'];

  for (const key in currentQuestion.value) {
    if (!dtoProperties.includes(key)) {
      return false;
    }
  }
  return true;
}

</script>

<template>

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
  <div id="question-container">
    <h1 v-if="currentQuestion">
      {{ currentQuestion }}
    </h1>
  </div>
  <div id="answer-container">
    <MultipleChoiceAnswerPicker
        v-if="questionIsMultipleChoice()"
        :question="currentQuestion">
    </MultipleChoiceAnswerPicker>
<!--TODO add more answer pickers, with v-else-->

  </div>
  <div id="button-container">
    <button id="next-question"
            @click="nextQuestion"
            v-show="answerSubmitted"
    >
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


#answer-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  padding: 0 10%;


  div {
    padding: 50px;
    margin: 10px;
    background-color: var(--question-color);
    border-radius: 10px;
  }

  div:hover {
    background-color: lightgrey;
    cursor: pointer;
  }

  .correctAnswer {
    background-color: green !important;
  }

  .wrongAnswer {
    background-color: red !important;
  }
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