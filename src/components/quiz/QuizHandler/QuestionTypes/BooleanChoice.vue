<script setup lang="ts">
import type { TrueOrFalseQuestionDTO } from "@/models/quiz/TrueOrFalseQuestionDTO";
import router from "@/router";
import {ref} from "vue";

const errorMessage = ref("");
const emit = defineEmits(['answer-selected'])
const props = defineProps(
    {
      question: { type: Object as () => TrueOrFalseQuestionDTO, required: true }
    }
);

let questions = props.question;

try {
   questions = props.question;
} catch (err) {
  errorMessage.value = "An error happened" + err;
}


function verifyAnswer(value: boolean) {
  let isAnswerCorrect = questions?.questionIsCorrect == value
  console.log(isAnswerCorrect)
  emit('answer-selected', isAnswerCorrect)
}


/**
 * Method to return back to the previous site.
 */
function returnToPreviousRouterPage() {
  router.go(-1)
}
</script>

<template>
  <div class="grid-container">
    <button class="button-1" @click="verifyAnswer(true)">True</button>
    <button class="button-2" @click="verifyAnswer(false)">False</button>
  </div>

  <div class="error-container" v-if="errorMessage">
    <h1>
      {{ errorMessage }}
    </h1>

    <button @click="returnToPreviousRouterPage">
      Exit Quiz
    </button>
  </div>

</template>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 800px;
  margin: auto;
}

button {
  font-family: "Inter", sans-serif;
  font-size: 30px;
  font-weight: bold;
  box-shadow: 0 4px 4px -2px #000000;
}

.button-1 {
  background: #005600;
}

.button-2 {
  background: #ab0000;
}

button:hover {
  filter: brightness(80%);
}

button {
  border-radius: 10px;
  border: 0;
  color: white;
  padding: 30px;
  margin: 5px;
}

</style>