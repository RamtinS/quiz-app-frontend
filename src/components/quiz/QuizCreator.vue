<script setup lang="ts">


import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {QuizCreationRequestDTO} from "@/models/quiz/QuizCreationRequestDTO";
import {computed, ref} from "vue";
import {QuizCreationService} from "@/services/QuizCreationService";
import QuestionPreview from "@/components/quiz/QuestionPreview.vue";
import QuestionEditor from "@/components/quiz/QuestionEditor.vue";

const title = ref<string>('');
const description = ref<string>('')
const questionIndex = ref<number>(0)
const isPublic = ref<boolean>(false)


const createdQuestions = ref<QuizQuestionDTO[]>([])

const currentQuestion = computed(() => createdQuestions.value[questionIndex.value])


/**
 * Handles the event emitted by the QuestionEditor component.
 * @param emitData - includes a question and where to put it in the array of questions.
 */
const handleAddQuestionEmit = (emitData: { quizIndex: number, question: QuizQuestionDTO }) => {
  createdQuestions.value[emitData.quizIndex] = emitData.question

  questionIndex.value = createdQuestions.value.length
}

/**
 * Emits the question index to the parent component.
 * @param emitData The question index
 */
function handlePreviewEmit(emitData: { questionIndex: number }) {
  questionIndex.value = emitData.questionIndex
}

/**
 * Posts the quiz to the server.
 */
function postQuiz() {
  console.log("trying to submit quiz")

  const quizCreationRequestDTO: QuizCreationRequestDTO = {
    title: title.value,
    description: description.value,
    questions: createdQuestions.value,
    open: true
  };

  console.log("adding quiz: " + quizCreationRequestDTO.title)
  try {
    QuizCreationService.postQuizForLoggedInnUser(quizCreationRequestDTO)

  } catch (err) {
    console.error("error posting quiz", err)
  }
}


</script>

<template>
  <div id="quiz-creator">

    <div>
      <div>
        <h1>Create a quiz</h1>
      </div>
      <div>
        <label for="isPublic">Public:</label>
        <input type="checkbox"
               v-model="isPublic"/>
        <label for="title">Title:</label>
        <input type="text"
               required
               v-model="title"/>
        <label for="description">Description:</label>
        <input type="text"
               required
               v-model="description"/>
      </div>
      <div>
        <QuestionEditor :quiz-index="questionIndex"
                        @create-clicked="handleAddQuestionEmit"
                        v-bind:pre-existing-question="currentQuestion">
        >
        </QuestionEditor>

      </div>
    </div>
    <div>
      <button @click="postQuiz">Post quiz</button>
    </div>
    <div id="previews">
      <p v-for="(question, index) in createdQuestions" :key="index">
        <QuestionPreview :question="question"
                         :question-index="index"
                         @preview-clicked="handlePreviewEmit"></QuestionPreview>
      </p>
    </div>

  </div>


</template>

<style scoped>

#quiz-creator {
  display: flex;
  flex-direction: column;
  border: 3px orange solid;
  align-items: center;
}

#previews {
  display: flex;
  flex-direction: row;
  border: 3px green solid;
  gap: 10px;

}
</style>