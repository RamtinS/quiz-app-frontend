<script setup lang="ts">

import {ref, watch} from "vue";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

const questionText = ref<String>('')
const answers = ref<AnswerDTO []>([])
const emit = defineEmits(['create-clicked']);
const answerAmount = ref<number>(4)

for (let i = 0; i < answerAmount.value; i++) {
  answers.value[i] = { answerText: 'b', isCorrect: false };
}
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
    questionText.value = newQuestion.questionText
    answers.value = newQuestion.answers
    //TODO: set answerAmount to the length of the answers array
  }
});

/**
 * Submits the current question to the parent component. If there are no correct answers, or no submitted
 * questions, the user will be notified.
 */
function submitClicked() {
  // if (answers.value.filter((answer) => answer.isCorrect).length === 0) {
  //   alert("You need to have at least one correct answer")
  //   return
  // }
  //
  // if (questionText.value === '') {
  //   alert("You need to have a question")
  //   return
  // }

  const questionDTO: QuizQuestionDTO = {
    questionText: "dette er et spørsmål",
    answers: [
      {
        answerText: "dette er et svar",
        isCorrect: true
      }
    ],
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
  questionText.value = ''
  answers.value = []
}

</script>

<template>
<!--  <div id="question-editor">-->
<!--    <div id="dev">-->
<!--      <input id="question" type="text" placeholder="enter question" v-model="questionText">-->
<!--    </div>-->
<!--    <div id="answers">-->
<!--      <div v-for="index in answerAmount" :key="index">-->
<!--        <input type="text" v-model="answers[index].answerText" placeholder="enter answer">-->
<!--        <input type="checkbox" v-model="answers[index-1].isCorrect">-->
<!--                {{answers[index].answerText }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <div>-->
      <button @click="submitClicked">Submit question</button>
<!--    </div>-->
<!--  </div>-->
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