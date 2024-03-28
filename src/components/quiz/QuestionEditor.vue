<script setup lang="ts">

import {ref, watch} from "vue";
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";

const maxAnswers = 6
const minAnswers = 2

const questionText = ref<String>('')

const inputQuestions = ref<Array<{ inputText: string, status: boolean }>>([
  {inputText: '', status: false},
  {inputText: '', status: false},
])


/**
 * questionIndex: the index of the question in the quiz.
 * preExistingQuestion: the already existing question to edit, if supplied. This should be null if creating a new question.
 */
const emit = defineEmits(['create-clicked']);

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
    for (let i = 0; i < newQuestion.answers.length; i++) {
      inputQuestions.value[i] = {inputText: newQuestion.answers[i].answerText, status: newQuestion.answers[i].correct}
    }
  }
});

/**
 * Submits the current question to the parent component. If there are no correct answers, or no submitted
 * questions, the user will be notified.
 */
function submitClicked() {
  if (inputQuestions.value.filter((answer) => answer.status).length === 0) {
    alert("You need to have at least one correct answer")
    return
  }

  if (questionText.value === '') {
    alert("You need to have a question")
    return
  }


  const questionDTO: QuizQuestionDTO = {
    questionText: questionText.value as string,
    answers: inputQuestions.value.map((answer) => {
      return {
        answerText: answer.inputText,
        correct: answer.status
      } as AnswerDTO
    })
  }

  emit('create-clicked', {quizIndex: props.quizIndex, question: questionDTO});
  clearFields()
}


/**
 * Clears the fields of the question editor, to enable creating a new question.
 */
function clearFields() {
  questionText.value = ''

  inputQuestions.value.forEach((question) => {
    question.inputText = ''
    question.status = false
  })
}

/**
 * Adds a new empty answer to the list of answers.
 */
function addNewAnswer() {
  if (inputQuestions.value.length >= maxAnswers) {
    alert("You can't have more than " + maxAnswers + " answers")
    return
  }
  inputQuestions.value.push({inputText: '', status: false})
}

/**
 * Tries to remove the first empty answer from the back, if there are at least 2 answers.
 * If the there are no empty answers, the first answer from the back will be removed
 */
function removeAnswer() {
  if (inputQuestions.value.length === minAnswers) {
    alert("You need to have at least 2 answers")
    return
  }

  for (let i = inputQuestions.value.length - 1; i >= 0; i--) {
    const question = inputQuestions.value[i];
    if (question.inputText === '' && question.status === false) {
      inputQuestions.value.splice(i, 1);
      return;
    }
  }

  inputQuestions.value.pop()
}

</script>

<template>
  <div id="question-editor">
    <div id="dev">
      <input id="question" type="text" placeholder="enter question" v-model="questionText">
    </div>
    <div id="answers">
      <div v-for="(question, index) in inputQuestions" :key="index">
        <input type="text"
               v-model="question.inputText"
               placeholder="enter answer">
        <input type="checkbox"
               v-model="question.status">
      </div>
    </div>
    <div>
      <button @click="addNewAnswer">
        Add new answer
      </button>
      <button @click="removeAnswer">
        Remove answer
      </button>
      <button @click="submitClicked">
        {{ preExistingQuestion ? 'Confirm changes' : 'Create' }}
      </button>
    </div>

  </div>
  <div id="debug" v-show="false">
    {{ inputQuestions }}
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