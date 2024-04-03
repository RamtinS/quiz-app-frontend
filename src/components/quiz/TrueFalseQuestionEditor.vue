<script setup lang="ts">


import type {TrueOrFalseQuestionDTO} from "@/models/quiz/TrueOrFalseQuestionDTO";
import {ref} from "vue";


const props = defineProps({
  preExistingQuestion: {type: Object as () => TrueOrFalseQuestionDTO, required: true},
})

const emit = defineEmits(['submit-changes']);

const question = ref<TrueOrFalseQuestionDTO>(props.preExistingQuestion)


const questionIsCorrect = ref<boolean>(question.value.questionIsCorrect)

defineExpose({
  submitQuestion
})

function submitQuestion() {
  console.log('submitting T/F question in child')

  const questionDTO: TrueOrFalseQuestionDTO = {
    questionType: "TrueOrFalseQuestionDTO",
    questionText: "",
    questionIsCorrect: questionIsCorrect.value
  }

  emit('submit-changes', {question: questionDTO})
}

</script>
<template>
  <div>
    <div>
      true
      <input type="radio" name="true-false" :value="true" v-model="questionIsCorrect">
    </div>
    <div>
      false
      <input type="radio" name="true-false" :value="false" v-model="questionIsCorrect">
    </div>
  </div>
</template>

<style scoped>

</style>