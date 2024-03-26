<script setup lang="ts">

import type {QuizQuestionDTO} from '@/models/quiz/QuizQuestionDTO'
import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {QuizService} from "@/services/QuizService";
import type {QuizDTO} from "@/models/quiz/QuizDTO";


const route = useRoute();
const id = ref(-1);
const quiz = ref<QuizDTO>()
const questions = ref<QuizQuestionDTO[]>([])
const service = new QuizService();


loadQuizFromServer()

/**
 * Loads the quiz from the server.
 */
async function loadQuizFromServer(){
  try {
    if (typeof route.params.quizId === 'string') {
      id.value = parseInt(route.params.quizId);
    } else if (Array.isArray(route.params.quizId)) {
      id.value = parseInt(route.params.quizId[0]);
    }
    console.log("loaded quiz id: " + id.value);

    quiz.value = await service.getQuizById(id.value)
    questions.value = quiz.value.questions;

  } catch (err) {

    alert("could not load quiz id: " + err)
  }
}


const currentQuestionIndex = ref<number>(0)
const currentQuestion = computed<QuizQuestionDTO>(() => questions.value[currentQuestionIndex.value]);
const possibleAnswers = computed(() => currentQuestion.value?.answers)
const answerSubmitted = ref<boolean>(false)
const answerIsCorrect = ref<boolean>(false)
const correctAnswerCounter = ref<number>(0)
const restartMessage = ref<String>("")
const quizCompleted = ref<boolean>(false)


/**
 * Checks if the answer is correct and updates the state accordingly.
 * @param answerIndex The index of the answer that was clicked.
 */
function checkIfCorrect(answerIndex: number) {
  answerSubmitted.value = true;
  if (possibleAnswers.value[answerIndex].isCorrect) {
    answerIsCorrect.value = true
    correctAnswerCounter.value++;
    console.log("correct")
  } else {
    answerIsCorrect.value = false
    console.log("wrong")
  }
}

/**
 * Moves to the next question.
 */
function nextQuestion() {
  answerSubmitted.value = false
  answerIsCorrect.value = false

  if (currentQuestionIndex.value === questions.value.length - 1) {

    quizCompleted.value = true;

    restartMessage.value = "Quiz finished, you got " +
        correctAnswerCounter.value + " correct answer" +
        (correctAnswerCounter.value === 1 ? "" : "s") +
        " out of " + questions.value.length

  } else {
    currentQuestionIndex.value++
  }
}

/**
 * Resets the quiz to question 0.
 */
function resetQuiz() {
  currentQuestionIndex.value = 0
  correctAnswerCounter.value = 0
  answerSubmitted.value = false;
  quizCompleted.value = false;
}

</script>

<template>
  <div id="finishedPrompt" v-show="quizCompleted">
    <h1>
      {{ restartMessage }}
    </h1>
    <button>
      <router-link to="/">Go back</router-link>
    </button>
    <button @click="resetQuiz">
      Restart quiz
    </button>
  </div>
  <div id="question-container">
    <h1>
      {{ currentQuestion?.question }}
    </h1>
  </div>
  <div id="answer-container">

    <div @click="checkIfCorrect(index)"
         v-for="(answer, index) in possibleAnswers"
         :key="answer.answerText"
         :class="answerSubmitted ? (answer.isCorrect ? 'correctAnswer' : 'wrongAnswer') : ''"
         v-if="!quizCompleted"
    >
      ({{ index + 1 }}) {{ answer.answerText }}
    </div>
  </div>
  <div id="button-container">
    <button id="next-question"
            @click="nextQuestion"
            v-show="answerSubmitted"
    >Next question
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