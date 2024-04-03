<script setup lang="ts">
import {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";

const props = defineProps(
    {
      question: { type: Object as () => MultipleChoiceQuestionDTO, required: true }
    }
);

console.log(props.question?.answers);

const emit = defineEmits(['answer-selected'])

//TODO: Implement answer picker
function selectAnswer(value: boolean) {
  emit("answer-selected", value)
}
</script>

<template>
  <div class="grid-container">
    <button class="button-1" @click="selectAnswer(true)">True</button>
    <button class="button-2" @click="selectAnswer(false)">False</button>
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
  background: green;
}

.button-2 {
  background: red;
}

.button-1:hover {
  background: #013b01;
}

.button-2:hover {
  background: #8b0000;
}

button {
  border-radius: 10px;
  border: 0;
  color: white;
  padding: 50px;
  margin: 5px;
}

</style>