<script setup lang="ts">


import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {QuizCreationRequestDTO} from "@/models/quiz/QuizCreationRequestDTO";
import {ref} from "vue";
import {QuizCreationService} from "@/services/QuizCreationService";
import QuestionPreview from "@/components/quiz/QuestionPreview.vue";
import QuestionEditor from "@/components/quiz/QuestionEditor.vue";

const title = ref<string>('');
const description = ref<string>('')

const createdQuestions = ref<QuizQuestionDTO[]>([])
const currentQuestionIndex = ref<number>(0)


/**
 * Handles the event emitted by the QuestionEditor component.
 * @param emitData - includes a question and where to put it in the array of questions.
 */
const handleAddQuestionEmit = (emitData: { quizIndex: number, question: QuizQuestionDTO }) => {
  createdQuestions.value[emitData.quizIndex] = emitData.question
  //skip to the end
  currentQuestionIndex.value = createdQuestions.value.length
}

/**
 * Emits the question index to the parent component.
 * @param emitData The question index
 */
function handlePreviewClicked(emitData: { questionIndex: number }) {
  currentQuestionIndex.value = emitData.questionIndex
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
        <label for="title">Title:</label>
        <input type="text" required v-model="title"/>
        <label for="description">Description:</label>
        <input type="text" required/>
      </div>
      <div>
        <QuestionEditor :quiz-index="currentQuestionIndex"
                        @create-clicked="handleAddQuestionEmit"
                        v-bind:pre-existing-question="createdQuestions[currentQuestionIndex]"
        >
        </QuestionEditor>

      </div>
    </div>
    <div>
      <button @click="postQuiz">Post quiz</button>
    </div>
    <div id="previews">
      <p v-for="(question, index) in createdQuestions" :key="index">
        <QuestionPreview :question-name="question.question"
                         :question-index="index"
                         @preview-clicked="handlePreviewClicked"></QuestionPreview>
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