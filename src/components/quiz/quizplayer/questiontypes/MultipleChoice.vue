<script setup lang="ts" generic="">
import type { MultipleChoiceQuestionDTO } from "@/models/quiz/MultipleChoiceQuestionDTO";
import { computed, ref } from "vue";
import router from "@/router";

const errorMessage = ref("");
const emit = defineEmits(["answer-selected"]);
const props = defineProps({
  question: { type: Object as () => MultipleChoiceQuestionDTO, required: true },
});

/**
 * Method to return back to the previous site.
 */
function returnToPreviousRouterPage() {
  router.go(-1);
}

//Fisher-Yates-Shuffle-Algorithm
const shuffledQuestions = computed(() => {
  try {
    const answers = props.question?.answers.slice();

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  } catch (err) {
    errorMessage.value = "An error happened" + err;
  }
});
</script>

<template>
  <div v-if="!errorMessage" class="grid-container">
    <button
      v-for="(answer, index) in shuffledQuestions"
      :key="index"
      @click="emit('answer-selected', answer.correct)"
      :class="['button-type', `button-type-${index}`]"
    >
      {{ answer.answerText }}

      <div class="error-container" v-if="errorMessage">
        <h1>
          {{ errorMessage }}
        </h1>

        <button @click="returnToPreviousRouterPage">Exit Quiz</button>
      </div>
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
  border-radius: 10px;
  border: 0;
  color: white;
  padding: 20px;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;
}

.button-type-0 {
  background: #8d0505;
}

.button-type-1 {
  background: #0c0d46;
}

.button-type-2 {
  background: #093102;
}

.button-type-3 {
  background: chocolate;
}

.button-type-4 {
  background: #6e095c;
}

.button-type-5 {
  background: #6b261c;
}

.button-type-6 {
  background: #44247c;
}

button:hover {
  filter: brightness(80%);
}
</style>
