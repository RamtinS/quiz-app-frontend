<script setup lang="ts">
import type { QuizDTO } from "@/models/quiz/QuizDTO";
import {ref, watch} from "vue";

const props = defineProps({
  score: Number,
  quiz: {
    type: Object as () => QuizDTO,
    required: true,
  },
})

const emit = defineEmits(['save-selected', 'exit-selected', 'restart-selected'])

let quiz = ref(props.quiz as QuizDTO)

let score = props.score;

let restartMessage = ref("Quiz finished, you got " + score + " correct answer" + (score === 1 ? "" : "s") +
    " out of " + (quiz.value.questions.length | 0));

</script>

<template>
  <div class="end-container">

    <h1>
      {{ restartMessage }}
    </h1>

    <button @click="emit('exit-selected')">
      Finish
    </button>

    <button @click="emit('restart-selected')">
      Restart
    </button>

    <button @click="emit('save-selected')">
      Save
    </button>

  </div>
</template>

<style scoped>
* {
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