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

const questionText = ref<String>('')
const currentQuestion = ref(props.preExistingQuestion)
const children = ref()


const emit = defineEmits(['create-clicked'])

watch(() => props.preExistingQuestion, (newValue) => {
  currentQuestion.value = newValue
  // alert("between: "+ JSON.stringify(currentQuestion.value))

  questionText.value = newValue.questionText
})

function handleCreateClickedChild(receivedEmitData: any) {
  let newQuestion = receivedEmitData.question as QuizQuestionDTO
  newQuestion.questionText = questionText.value as string
  emit('create-clicked', {questionIndex: props.questionIndex, question: newQuestion})
}

function submitChild() {
  children.value.submitQuestion()
}

</script>

<template>
  <div v-if="currentQuestion" id="question-editor">
    <div id="header">
      <input id="question"
             type="text"
             placeholder="enter question"
             v-model="questionText">
    </div>
    <MultipleChoiceQuestionEditor ref="children"
                                  v-if="QuestionTypeUtility.questionIsMultipleChoice(currentQuestion)"
                                  :pre-existing-question="props.preExistingQuestion"
                                  @submit-changes="handleCreateClickedChild"
    >
    </MultipleChoiceQuestionEditor>
    <TrueFalseQuestionEditor
        v-else-if="QuestionTypeUtility.questionIsTrueOrFalse(currentQuestion)"
        ref="children"
        :pre-existing-question="props.preExistingQuestion"
        @submit-changes="handleCreateClickedChild"
    >

    </TrueFalseQuestionEditor>
    <div v-else id="incorrect-type-message">
      <p>Error: The question could not load properly as it seems to be of an invalid type</p>
    </div>
    <div>
      <!--      TODO add click functionality-->
      <button @click="submitChild">
        Confirm changes
      </button>
    </div>

  </div>
  <div v-else>
    <p>Error: No question has been loaded</p>
  </div>


</template>

<style scoped>

#incorrect-type-message {
  text-align: center;
  color: red;
}


</style>