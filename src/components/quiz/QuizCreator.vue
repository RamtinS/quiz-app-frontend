<script setup lang="ts">

import type {QuizQuestionDTO} from "@/models/quiz/QuizQuestionDTO";
import type {QuizCreationRequestDTO} from "@/models/quiz/QuizCreationRequestDTO";
import type {MultipleChoiceQuestionDTO} from "@/models/quiz/MultipleChoiceQuestionDTO";
import type {TrueOrFalseQuestionDTO} from "@/models/quiz/TrueOrFalseQuestionDTO";
import {QuestionTypeUtility} from "@/models/quiz/QuestionTypeUtility";
import {QuestionType} from "@/models/quiz/QuestionType";
import {QuizCreationService} from "@/services/QuizCreationService";
import {computed, ref} from "vue";
import QuestionPreview from "@/components/quiz/QuestionPreview.vue";
import QuestionEditor from "@/components/quiz/QuestionEditor.vue";
import NewQuestionModal from "@/components/quiz/NewQuestionModal.vue";
import type {TagDTO} from "@/models/quiz/TagDTO";
import TagPicker from "@/components/quiz/TagPicker.vue";


const title = ref<string>('');
const description = ref<string>('')
const questionIndex = ref<number>(0)
const isPublic = ref<boolean>(false)

const showModal = ref<boolean>(false)

const createdQuestions = ref<QuizQuestionDTO[]>([])
const selectedTags = ref<TagDTO[]>([])

//TODO delete test data
const exampleMultipleChoice: MultipleChoiceQuestionDTO = {
  questionType: "MultipleChoiceQuestionDTO",
  questionText: 'What is the capital of France?',
  answers: [
    {answerText: 'Paris', correct: true},
    {answerText: 'London', correct: false},
    {answerText: 'Berlin', correct: false},
    {answerText: 'Madrid', correct: false}
  ]
}

const exampleTrueFalse = {
  questionType: "TrueOrFalseQuestionDTO",
  questionText: 'Is the sky blue?',
  questionIsCorrect: true
}

createdQuestions.value.push(exampleMultipleChoice)
createdQuestions.value.push(exampleTrueFalse)

const currentQuestion = computed(() => createdQuestions.value[questionIndex.value])


/**
 * Handles the event emitted by the QuestionEditor component.
 * @param emitData - includes a question and where to put it in the array of questions.
 */
const handleAddQuestionEmit = (emitData: { questionIndex: number, question: QuizQuestionDTO }) => {
  alert(JSON.stringify(emitData));

  if (!emitData.question) {
    alert("no question")
  }
  createdQuestions.value[emitData.questionIndex] = emitData.question
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
function postQuizToServer() {
  console.log("trying to submit quiz")




  const quizCreationRequestDTO: QuizCreationRequestDTO =
      {
        type: "QuizCreationRequestDTO",
        title: title.value,
        description: description.value,
        categoryDescription: "cat desc not implemented in frontend",
        questions: createdQuestions.value,
        tags: selectedTags.value,
        open: false
      }

  try {
    QuizCreationService.postQuizForLoggedInnUser(quizCreationRequestDTO)

  } catch (err) {
    console.error("error posting quiz", err)
  }
}

function handleSubmitTags(TagDTOs: TagDTO[]) {
  selectedTags.value = TagDTOs;
  alert(selectedTags.value)
}


function removeModal() {
  showModal.value = false;
}

function handleModalChoice(choice: QuestionType) {
  showModal.value = false;
  addNewEmptyQuestion(choice);
}

function addNewEmptyQuestion(questionType: QuestionType) {
  console.log("Adding new question of type: " + questionType)

  if (questionType === QuestionType.MULTIPLE_CHOICE) {

    const question: MultipleChoiceQuestionDTO = {
      questionType: "MultipleChoiceQuestionDTO",
      questionText: '',
      answers: [
        {answerText: '', correct: false},
        {answerText: '', correct: false},
        {answerText: '', correct: false},
        {answerText: '', correct: false}
      ]
    }
    console.log("adding question: " + JSON.stringify(question))
    createdQuestions.value.push(question);


    //TODO remove this
    if (QuestionTypeUtility.questionIsMultipleChoice(question) && !QuestionTypeUtility.questionIsTrueOrFalse(question)) {
      console.log("question is multiple choice")
    } else {
      console.log("error: question is NOT multiple choice")
    }

  } else if (questionType === QuestionType.TRUE_OR_FALSE) {
    const question: TrueOrFalseQuestionDTO = {
      questionType: "TrueOrFalseQuestionDTO",
      questionText: '',
      questionIsCorrect: false
    }

    if (QuestionTypeUtility.questionIsTrueOrFalse(question) && !QuestionTypeUtility.questionIsMultipleChoice(question)) {
      console.log("question is true or false")
    } else {
      console.log("error: question is NOT true or false")
    }

    console.log("adding question: " + JSON.stringify(question))
    createdQuestions.value.push(question);

  } else {
    throw new Error("Unknown question type: " + questionType)
  }
}

</script>

<template>
  {{ createdQuestions }}
  <div id="quiz-creator">

    <div id="quiz-info">
      <div>
        <h1>Create a quiz</h1>
      </div>
      <div>
        <label for="isPublic">Public:
          <input type="checkbox"
                 v-model="isPublic"/>
        </label>

        <label for="title">Title:
          <input type="text"
                 required
                 v-model="title"/>
        </label>

        <label for="description">Description:
          <input type="text"
                 required
                 v-model="description"/></label>
        <TagPicker @submit-tags="handleSubmitTags">

        </TagPicker>
      </div>

      <div>
        <button @click="postQuizToServer">Post quiz</button>
      </div>
    </div>

    <div id="question-editor">
      <QuestionEditor v-if="currentQuestion"
                      :pre-existing-question="currentQuestion"
                      @create-clicked="handleAddQuestionEmit"
                      :question-index="questionIndex"
      >
        >
      </QuestionEditor>

    </div>

    <div id="previews">
      <button id="add-question"
              @click="showModal = true"
      >Add new
      </button>

      <QuestionPreview
          v-for="(question, index) in createdQuestions"
          :key="index"
          :question="question"
          :question-index="index"
          @preview-clicked="handlePreviewEmit"
          :currently-selected="questionIndex === index"
      />
    </div>
    <NewQuestionModal
        v-if="showModal"
        @close-modal="removeModal"
        @confirm-choice="handleModalChoice"
    />


  </div>


</template>

<style scoped>

h1 {
  text-align: center;
}


@media (min-width: 900px) {
  #quiz-creator {
    height: 100vh;
    grid-template-columns: 300px auto;
    grid-template-rows: 200px auto;
    grid-template-areas: "quiz-info quiz-info" "previews question-editor";
  }

  #previews {
    flex-direction: column;
    height: auto;
  }
}

@media (max-width: 900px) {
  #quiz-creator {
    grid-template-rows: 200px auto;
    grid-template-areas: "quiz-info"  "question-editor" "previews";
  }

  #previews {
    flex-direction: row;
  }
}

#quiz-creator {

  display: grid;
  background: rgb(200, 200, 200, 0.8);

}

#previews {
  display: flex;
  border: 3px green solid;
  gap: 20px;
  align-items: center;
  overflow: scroll;


}


#add-question {
  width: 80%;
  min-height: 50px;
  margin-top: 30px;
}


#previews {
  grid-area: previews;
}

#quiz-info {
  grid-area: quiz-info;
}

#question-editor {
  grid-area: question-editor;
}


</style>