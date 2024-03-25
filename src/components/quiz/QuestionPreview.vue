<script setup lang="ts">

/**
 * This component is a preview of a question in a quiz. It is used to display the question in a list of questions.
 */


/**
 * questionName: the name of the question / what the question is asking.
 * questionIndex: the index of the question in the current quiz of the parent component.
 */
const props = defineProps({
  questionName: {type: String, required: true},
  questionIndex: {type: Number, required: true},
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
  <div id="question-preview" @click="previewClicked">
    <div id="question">
      <p>({{ questionIndex }}) {{ questionName }} </p>
    </div>
  </div>
</template>

<style scoped>
#question-preview {
  border-radius: 10px;
  background-color: yellow;
  display: flex;
  flex-direction: column;

  :hover {
    cursor: pointer;
  }

  box-shadow: grey 5px 5px 5px;
}


</style>