
<script setup lang="ts">
import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";

/**
 * This component is a preview of a question in a quiz. It is used to display the question in a list of questions.
 */



/**
 * questionName: the name of the question / what the question is asking.
 * questionIndex: the index of the question in the current quiz of the parent component.
 */
const props = defineProps({
  question: {type: Object as () => QuizQuestionDTO, required: true},
  questionIndex: {type: Number, required: true},
  currentlySelected: {type: Boolean, required: true}
});


/**
 * Defines an event that is emitted when the preview is clicked.
 */
const emit = defineEmits(['preview-clicked']);

/**
 * Emits the current index to the parent component when this preview is clicked.
 */
function previewClicked() {
  emit('preview-clicked', {questionIndex: props.questionIndex})
}
</script>

<template>
  <div class="question-preview"
       @click="previewClicked"
       :class="{selected: currentlySelected}"
  >
    <div id="question">
      <p class="question-index">{{questionIndex + 1}}</p>
      <p>{{ question.questionText }} </p>
    </div>
  </div>
</template>

<style scoped>
.question-preview {
  border-radius: 10px;
  display: flex;
  background-color: whitesmoke;
  flex-direction: column;
  border: 3px solid lightgrey;
  overflow: hidden;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;

}
.question-preview:hover {
  cursor: pointer;
  border: 3px solid black;
}

.selected{
  border-color: var(--question-color);
}

.question-index {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  text-align: center;
  padding-top: 10px;
}


</style>