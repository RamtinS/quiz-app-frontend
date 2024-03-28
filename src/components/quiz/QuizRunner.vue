<script async setup lang="ts">

import {computed, ref} from "vue";
import {useRoute} from "vue-router";
import {QuizService} from "@/services/QuizService";
import type {QuizDTO} from "@/models/quiz/QuizDTO";
import router from "@/router";


const route = useRoute();
const quiz : QuizDTO | null = await loadQuizFromServer() ?? null;



const currentQuestionIndex = ref(0);

const currentQuestion = computed(() => quiz?.questions[currentQuestionIndex.value]);
const possibleAnswers = computed(() => currentQuestion.value?.answers);

const answerSubmitted = ref(false);
const answerIsCorrect = ref(false);
const correctAnswerCounter = ref(0);
const quizCompleted = ref(false);
const restartMessage = ref("");


/**
 * Loads the quiz from the server.
 */
async function loadQuizFromServer() {
  try {
    let id = -1;
    if (typeof route.params.quizId === 'string') {
      id = parseInt(route.params.quizId);
    } else if (Array.isArray(route.params.quizId)) {
      id = parseInt(route.params.quizId[0]);
    }

    console.log("id: " + id)
    return await QuizService.getQuizById(id) as QuizDTO;

  } catch (err) {
    return undefined;
  }
}

function checkIfCorrect(answerIndex: number) {
  answerSubmitted.value = true;
  if (possibleAnswers.value && possibleAnswers.value[answerIndex]?.correct) {
    answerIsCorrect.value = true
    correctAnswerCounter.value++;
    console.log("correct")
  } else {
    answerIsCorrect.value = false
    console.log("wrong")
  }
}

function nextQuestion() {
  answerSubmitted.value = false
  answerIsCorrect.value = false

  if (quiz?.questions && currentQuestionIndex.value === quiz?.questions.length - 1) {

    quizCompleted.value = true;

    restartMessage.value = "Quiz finished, you got " +
        correctAnswerCounter.value + " correct answer" +
        (correctAnswerCounter.value === 1 ? "" : "s") +
        " out of " + (quiz.questions.length | 0);

  } else {
    currentQuestionIndex.value++
  }
}

function returnToPreviousRouterPage(){
  router.go(-1)
}


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
    <button @click="returnToPreviousRouterPage">
      go back
    </button>
    <button @click="resetQuiz">
      Restart quiz
    </button>
  </div>
  <div id="question-container">
    <h1 v-if="currentQuestion">
      {{ currentQuestion.questionText }}
    </h1>
  </div>
  <div id="answer-container">
    <div @click="checkIfCorrect(index)"
         v-for="(answer, index) in possibleAnswers"
         :key="answer.answerText"
         :class="answerSubmitted ? (answer.correct ? 'correctAnswer' : 'wrongAnswer') : ''"
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