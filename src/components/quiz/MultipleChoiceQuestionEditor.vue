<script setup lang="ts">

import {ref, watchEffect} from "vue";
import type {AnswerDTO} from "@/models/quiz/AnswerDTO";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";

const props = defineProps({
  preExistingQuestion: {type: Object as () => MultipleChoiceQuestionDTO, required: true},
})

const emit = defineEmits(['submit-changes']);


const maxAnswers = 6
const minAnswers = 2

const currentQuestion = ref(props.preExistingQuestion)
const inputAnswers = ref<Array<{ inputText: string, answerIsCorrect: boolean }>>([])

/**
 * Checks if the pre-existing question prop has been updated. If it has, the question editor will update its fields.
 */
watchEffect(() => {
  currentQuestion.value = props.preExistingQuestion
  inputAnswers.value = props.preExistingQuestion.answers.map((answer) => {
    return {inputText: answer.answerText, answerIsCorrect: answer.correct}
  })
})


defineExpose({
  submitQuestion
})

/**
 * Submits the current question to the parent component. If there are no correct answers, or no submitted
 * questions, the user will be notified.
 */
function submitQuestion() {
  console.log('submitting question in child')
  const amountOfCorrectAnswers = inputAnswers.value.filter((answer) => answer.answerIsCorrect).length;
  if (amountOfCorrectAnswers === 0) {
    alert("You need to have at least one correct answer")
    return
  }
  if (inputAnswers.value.length === 0) {
    alert("You need to have at least one correct answer")
    return
  }

  const emptyAnswers = inputAnswers.value.filter((answer) => answer.inputText === '')
  if (emptyAnswers.length > 0) {
    alert("You need to fill in all answers")
    return
  }


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

  emit('submit-changes', {question: questionDTO});
  clearFields()
}


/**
 * Clears the fields of the question editor, to enable creating a new question.
 */
function clearFields() {
  inputAnswers.value.forEach((question) => {
    question.inputText = ''
    question.answerIsCorrect = false
  })
}

/**
 * Adds a new empty answer to the list of answers.
 */
function addNewAnswer() {
  if (inputAnswers.value.length >= maxAnswers) {
    alert("You can't have more than " + maxAnswers + " answers")
    return
  }
  inputAnswers.value.push({inputText: '', answerIsCorrect: false})
}

/**
 * Tries to remove the first empty answer from the back, if there are at least 2 answers.
 * If the there are no empty answers, the first answer from the back will be removed
 */
function removeAnswer() {
  if (inputAnswers.value.length === minAnswers) {
    alert("You need to have at least 2 answers")
    return
  }

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
    <div>
      <button @click="addNewAnswer">
        Add new answer
      </button>
      <button @click="removeAnswer">
        Remove answer
      </button>

    </div>

  </div>


  <div id="debug" v-show="false">
    {{ inputAnswers }}
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
  width: 100%;
  gap: 10px;

}

.answer {
  background-color: orangered;
  color: white;
  border: 1px solid black;
  height: 150px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  cursor: pointer;
  align-items: center;
}


.answer:hover {
  border: 3px solid black;
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

  height: 90%;
  aspect-ratio: 1/1;

}

.correct-checkbox:checked {
  background-color: indigo !important;
}


</style>