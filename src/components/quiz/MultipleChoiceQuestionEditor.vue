<script setup lang="ts">

import {ref, watchEffect} from "vue";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import {QuizValidationUtility} from "@/models/quiz/QuizValidationUtility";

const props = defineProps({
  preExistingQuestion: {type: Object as () => MultipleChoiceQuestionDTO, required: true},
})

const emit = defineEmits(['submit-changes']);


const maxAnswers = 6
const minAnswers = 2

const currentQuestion = ref(props.preExistingQuestion)
const inputAnswers = ref<Array<{ inputText: string, answerIsCorrect: boolean }>>([])
const errorMessage = ref('')

/**
 * Checks if the pre-existing question prop has been updated. If it has, the question editor will update its fields.
 */
watchEffect(() => {
  currentQuestion.value = props.preExistingQuestion
  inputAnswers.value = props.preExistingQuestion.answers.map((answer) => {
    return {inputText: answer.answerText, answerIsCorrect: answer.correct}
  })
})

/**
 * Exposes the submitQuestion function to the parent component.
 */
defineExpose({
  submitQuestion
})

/**
 * Submits the current question to the parent component. If there are no correct answers, or no submitted
 * questions, the user will be notified.
 */
function submitQuestion() {


  const questionDTO: MultipleChoiceQuestionDTO = {
    questionType: "MultipleChoiceQuestionDTO",
    questionText: "",
    answers: inputAnswers.value.map((answer) => {
      return {
        answerText: answer.inputText,
        correct: answer.answerIsCorrect
      } as AnswerDTO
    })
  }

  const error = QuizValidationUtility.multipleChoiceQuestionIsValid(questionDTO)

  if (error){
    emit('submit-changes', {question: null, errorMessage: error});
  } else {
    emit('submit-changes', {question: questionDTO, errorMessage: null});
  }
}


/**
 * Adds a new empty answer to the list of answers.
 */
function addNewAnswer() {
  if (inputAnswers.value.length >= maxAnswers) {
    errorMessage.value = "You can only have a maximum of 6 answers"
    return
  }
  errorMessage.value = ''
  inputAnswers.value.push({inputText: '', answerIsCorrect: false})
}

/**
 * Tries to remove the first empty answer from the back, if there are at least 2 answers.
 * If the there are no empty answers, the first answer from the back will be removed
 */
function removeAnswer() {
  if (inputAnswers.value.length === minAnswers) {
    errorMessage.value = "You must have at least 2 answers"
    return
  }
  errorMessage.value = ''

  for (let i = inputAnswers.value.length - 1; i >= 0; i--) {
    const question = inputAnswers.value[i];
    if (question.inputText === '' && question.answerIsCorrect === false) {
      inputAnswers.value.splice(i, 1);
      return;
    }
  }

  inputAnswers.value.pop()
}
</script>

<template>
  <div id="question-editor">

    <div id="answers">
      <div v-for="(question, index) in inputAnswers"
           :key="index"
           class="answer">
        <textarea
            v-model="question.inputText"
            placeholder="enter answer"
            class="answer-text">

        </textarea>
        <input type="checkbox"
               v-model="question.answerIsCorrect"
               class="correct-checkbox">
      </div>
    </div>
    <h4 class="error-message" v-if="errorMessage">
      {{errorMessage}}
    </h4>
    <div class="button-container">
      <button @click="addNewAnswer">
        Add new answer
      </button>
      <button @click="removeAnswer">
        Remove answer
      </button>
    </div>
  </div>
</template>

<style scoped>



#question-editor {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#answers {
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  gap: 25px;

}

@media (max-width: 600px) {
  #answers {
    grid-template-columns: auto;
  }

}

.button-container {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;

}

button{
  aspect-ratio: 3/1;


}

.answer {
  background-color: var(--question-color);
  color: white;
  border: 4px solid #b22028;
  height: 150px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
}

.answer:hover {
  border-color: black;
}


.answer-text {
  margin: 10px;
  text-align: center;
  overflow: hidden;
  width: 80%;
  border-radius: inherit;
  background: transparent;
  border: none;
  font-size: 1.2em;
  text-wrap: normal;
  resize: none;
  color: white;
  height: 80%;
}

.answer-text::placeholder {
  color: white !important;
}

.correct-checkbox {
  opacity: 0.7;
  height: 90%;
  aspect-ratio: 1/1;
  margin-right: 10px;
}

.correct-checkbox:checked {
  background-color: indigo !important;
  opacity: 1;
}

.correct-checkbox:not(:checked)::after {
  content: "Toggle correct answer";
  color: black;
  display: flex;
  align-items: center;
  padding-left: 10px;
  width: 100%;
  height: 100%;
}

.error-message {
  color: red;
}


</style>