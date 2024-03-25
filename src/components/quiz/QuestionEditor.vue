<script setup lang="ts">

import {ref, watch} from "vue";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

const questionTitle = ref<String>('')
const answers = ref<String[]>([])
const correctAnswers = ref<boolean[]>([])
const emit = defineEmits(['create-clicked']);
const answerAmount = ref<number>(4)

/**
 * questionIndex: the index of the question in the quiz.
 * preExistingQuestion: the already existing question to edit, if supplied. This should be null if creating a new question.
 */
const props = defineProps({
  quizIndex: {type: Number, required: true},
  preExistingQuestion: {type: Object as () => QuizQuestionDTO, default: null}
})

/**
 * Checks if the pre-existing question prop has been updated. If it has, the question editor will update its fields.
 */
watch(() => props.preExistingQuestion, (newQuestion) => {
  if (newQuestion) {
    questionTitle.value = newQuestion.question
    answers.value = newQuestion.answers
    correctAnswers.value = newQuestion.correctAnswers
  }
});

/**
 * Submits the current question to the parent component. If there are no correct answers, or no submitted
 * questions, the user will be notified.
 */
function submitClicked() {
  if (correctAnswers.value.filter((value) => value).length === 0) {
    alert("You need to have at least one correct answer")
    return
  }

  if (questionTitle.value === '') {
    alert("You need to have a question")
    return
  }

  const questionDTO: QuizQuestionDTO = {
    question: questionTitle.value as string,
    answers: answers.value as string[],
    correctAnswers: correctAnswers.value as boolean[],
    explanation: null,
  };

  submitQuestion(questionDTO)
}

/**
 * Submits the question to the parent component through the 'create-clicked' event.
 * @param question the question to submit
 */
function submitQuestion(question: QuizQuestionDTO) {
  emit('create-clicked', {quizIndex: props.quizIndex, question: question});
  clearFields()
}

/**
 * Clears the fields of the question editor, to enable creating a new question.
 */
function clearFields() {
  questionTitle.value = ''
  answers.value = []
  correctAnswers.value = []
}

</script>

<template>
  <div id="question-editor">
    <div id="dev">
      <input id="question" type="text" placeholder="enter question" v-model="questionTitle">
    </div>
    <div id="answers">
      <div v-for="index in answerAmount" :key="index">
        <input type="text" v-model="answers[index-1]" placeholder="enter answer">
        <input type="checkbox" v-model="correctAnswers[index-1]">
        {{ correctAnswers[index - 1] }}
      </div>
    </div>
    <div>
      <button @click="submitClicked">Submit question</button>
    </div>
  </div>
</template>

<style scoped>
#question-editor {
  border: 3px red dashed;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

#answers {
  display: grid;
  grid-template-columns: auto auto;
}
</style>