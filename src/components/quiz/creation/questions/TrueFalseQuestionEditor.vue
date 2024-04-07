<script setup lang="ts">
import type { TrueOrFalseQuestionDTO } from "@/models/quiz/TrueOrFalseQuestionDTO";
import { ref, watchEffect } from "vue";

const props = defineProps({
  preExistingQuestion: {
    type: Object as () => TrueOrFalseQuestionDTO,
    required: true,
  },
});

const question = ref<TrueOrFalseQuestionDTO>(props.preExistingQuestion);
const questionIsCorrect = ref<boolean>(question.value.questionIsCorrect);

watchEffect(() => {
  question.value = props.preExistingQuestion;
  questionIsCorrect.value = props.preExistingQuestion.questionIsCorrect;
});

const emit = defineEmits(["submit-changes"]);

defineExpose({
  submitQuestion,
});

//setInterval(() => { console.log(props.radioIndex) }, 1000);

function submitQuestion() {
  console.log("submitting question in child");

  const questionDTO: TrueOrFalseQuestionDTO = {
    questionType: "TrueOrFalseQuestionDTO",
    questionText: "",
    questionIsCorrect: questionIsCorrect.value,
  };

  emit("submit-changes", { question: questionDTO });
}
</script>
<template>
  <div class="radio-container">
    <div class="true-container" @click="questionIsCorrect = true">
      <p>True</p>
      <input type="radio" :value="true" v-model="questionIsCorrect" />
    </div>
    <div class="false-container" @click="questionIsCorrect = false">
      <p>False</p>
      <input type="radio" :value="false" v-model="questionIsCorrect" />
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1000px) {
  .radio-container {
    flex-direction: column;
  }
}

.radio-container {
  margin-top: 45px;
  display: flex;
  justify-content: center;
  color: white;
  gap: 20px;
  align-items: center;
  padding: 20px;
}

.false-container,
.true-container {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  aspect-ratio: 3/1;
  width: 100%;

  border-radius: 10px;
  border: 2px solid black;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  p {
    font-size: 5vmax;
  }
}

input[type="radio"] {
  margin: 40px;
  transform: scale(2);
  &:hover {
    cursor: pointer;
  }
}

.false-container {
  background-color: red;
}

.true-container {
  background-color: green;
}
</style>
