<script setup lang="ts">
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import {QuestionTypeUtility} from "@/models/quiz/QuestionTypeUtility";
import MultipleChoiceQuestionEditor from "@/components/quiz/MultipleChoiceQuestionEditor.vue";
import {ref, watch} from "vue";
import TrueFalseQuestionEditor from "@/components/quiz/TrueFalseQuestionEditor.vue";

const props = defineProps(
    {
      preExistingQuestion: {type: Object as () => QuizQuestionDTO, required: true},
      questionIndex: {type: Number, required: true}
    }
)


const questionText = ref<String>(props.preExistingQuestion.questionText)
const currentQuestion = ref(props.preExistingQuestion)
const children = ref()
const questionHasBeenSubmitted = ref<boolean>(false)
const submissionErrorMessage = ref<String>("")


const emit = defineEmits(['create-clicked'])

watch(() => props.preExistingQuestion, (newValue) => {
  currentQuestion.value = newValue
  questionText.value = newValue.questionText
})


function handleCreateClickedQuestionEditorChild(receivedEmitData: any) {
  if (questionText.value === "") {
    submissionErrorMessage.value = "Error: Question title cannot be empty"
    return
  }


  let errorMessage = receivedEmitData.errorMessage as string
  if (errorMessage) {
    submissionErrorMessage.value = errorMessage
    return
  } else {
    submissionErrorMessage.value = ""
    let newQuestion = receivedEmitData.question as QuizQuestionDTO
    newQuestion.questionText = questionText.value as string
    emit('create-clicked', {questionIndex: props.questionIndex, question: newQuestion})
  }
}

function submitChildQuestion() {
  const errorMessage = children.value.submitQuestion()
  questionHasBeenSubmitted.value = true
  if (errorMessage) {
    submissionErrorMessage.value = errorMessage
  }
}

</script>

<template>
  <div v-if="currentQuestion"
       id="question-editor"
       @click="questionHasBeenSubmitted = false"
  >
    <div id="header">
      <input id="question"
             class="question-input"
             type="text"
             placeholder="Enter a question"
             v-model="questionText">
    </div>
    <MultipleChoiceQuestionEditor ref="children"
                                  v-if="QuestionTypeUtility.questionIsMultipleChoice(currentQuestion)"
                                  :pre-existing-question="props.preExistingQuestion"
                                  @submit-changes="handleCreateClickedQuestionEditorChild"
    >
    </MultipleChoiceQuestionEditor>
    <TrueFalseQuestionEditor
        v-else-if="QuestionTypeUtility.questionIsTrueOrFalse(currentQuestion)"
        ref="children"
        :pre-existing-question="props.preExistingQuestion"
        @submit-changes="handleCreateClickedQuestionEditorChild"
    >

    </TrueFalseQuestionEditor>
    <div v-else id="incorrect-type-message">
      <p>Error: The question could not load properly as it seems to be of an invalid type</p>
    </div>
    <div class="question-submit-container">
      <button class="question-submit-button"
              @click.stop="submitChildQuestion"
              v-if="!questionHasBeenSubmitted">
        Submit question changes
      </button>
      <div v-else class="shake">
        <p v-if="submissionErrorMessage" class="error-message">
          {{ submissionErrorMessage }}
        </p>
        <p v-else class="confirmation-message">
          Question submitted successfully
        </p>
      </div>
    </div>

  </div>
  <div v-else>
    <p>Error: No question has been loaded</p>
  </div>


</template>

<style scoped>

button{
  aspect-ratio: 3/1;
}

#incorrect-type-message {
  text-align: center;
  color: red;
}

.question-input {
  display: block;
  margin: 20px auto 0;
  text-align: center;
  width: 25%;
  height: 50px;
}

.question-submit-container {
  display: flex;
  justify-content: center;
}

.confirmation-message {
  color: green;
}

.error-message {
  color: red;
}


</style>