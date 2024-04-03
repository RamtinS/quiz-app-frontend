<script setup lang="ts">

import {ref} from "vue";
import {QuestionType} from "@/models/quiz/QuestionType";


const emits = defineEmits(['close-modal', 'confirm-choice'])

function closeModal() {
  emits('close-modal')
}

function confirmChoice() {
  if (selectedOption.value === '') {
    alert('You need to select a question type')
    return
  }
  emits('confirm-choice', selectedOption.value)
}


const questionTypes = ref<{ type: QuestionType; description: string }[]>([
  { type: QuestionType.MULTIPLE_CHOICE, description: "Multiple Choice" },
  { type: QuestionType.TRUE_OR_FALSE, description: "True or False" },
]);

const selectedOption = ref('');


</script>


<template>
  <div id="new-question-modal" class="modal" @click="closeModal">
    <div id="modal-content"
         class="modal-content"
         @click.stop
    >
      <h1>
        Select a question type
      </h1>
      <div id="question-types" >
        <label v-for="questionType in questionTypes"
               class="question-option">
          {{ questionType.description }}
          <input type="radio" v-model="selectedOption" :value="questionType.type" name="questionType">
        </label>
      </div>
      <button @click="confirmChoice">
        Confirm choice
      </button>
    </div>
  </div>
</template>

<style scoped>

.modal {
  text-align: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  border-radius: 5px;
  margin-top: 10%;
  margin-left: 25%;
  width: 50%;
  height: 50%;
  z-index: 2;
}

.question-option {
  input[type="radio"] {
    scale: 2;
  }
}

#question-types {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

</style>

