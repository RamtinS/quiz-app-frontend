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
import QuestionSettingsModal from "@/components/quiz/QuizSettingsModal.vue";
import type {QuizSettings} from "@/models/quiz/QuizSettings";
import {QuizValidationUtility} from "@/models/quiz/QuizValidationUtility";
import type {QuizDTO} from "@/models/quiz/QuizDTO";


const props = defineProps({
  preExistingQuiz: {type: Object as () => QuizDTO, required: false}
})

const quizHasBeenSubmitted = ref<boolean>(false)


const questionIndex = ref<number>(0)

const showQuestionTypeModal = ref<boolean>(false)
const showQuizSettingsModal = ref<boolean>(false)

const createdQuestions = ref<QuizQuestionDTO[]>([])
const selectedTags = ref<TagDTO[]>([])

const postQuizErrorMessage = ref<string>("")

const quizSettings = ref<QuizSettings>({
  title: '',
  description: '',
  open: false,
  tags: []
})

if (props.preExistingQuiz) {
  const quiz: QuizDTO = props.preExistingQuiz
  quizSettings.value.title = props.preExistingQuiz.name
  quizSettings.value.description = quiz.description
  quizSettings.value.open = quiz.open
  createdQuestions.value = quiz.questions

} else {
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
}


const currentQuestion = computed(() => createdQuestions.value[questionIndex.value])


/**
 * Handles the event emitted by the QuestionEditor component.
 * @param emitData - includes a question and where to put it in the array of questions.
 */
const handleAddQuestionEmit = (emitData: { questionIndex: number, question: QuizQuestionDTO }) => {

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
async function postQuizToServer() {
  console.log("trying to submit quiz")

  if (quizSettings.value.title === '') {
    postQuizErrorMessage.value = "You need to have a title"
    return
  }

  const quizCreationRequestDTO: QuizCreationRequestDTO =
      {
        title: quizSettings.value.title,
        description: quizSettings.value.title,
        categoryDescription: quizSettings.value.description,
        questions: createdQuestions.value,
        tags: selectedTags.value,
        open: quizSettings.value.open
      }

  for (let i = 0; i < createdQuestions.value.length; i++) {
    const question: QuizQuestionDTO = createdQuestions.value[i];

    if (question.questionText === "") {
      postQuizErrorMessage.value = "Question number " + (i + 1) + " has no text"
      return;
    }

    if (question.questionType === "MultipleChoiceQuestionDTO") {
      const message = QuizValidationUtility.multipleChoiceQuestionIsValid(question as MultipleChoiceQuestionDTO)
      if (message) {
        postQuizErrorMessage.value = "Question " + (i + 1) + ": " + message
        return;
      }
    } else if (question.questionType === "TrueOrFalseQuestionDTO") {
      const message = QuizValidationUtility.trueOrFalseQuestionIsValid(question as TrueOrFalseQuestionDTO)
      if (message) {
        postQuizErrorMessage.value = "Question " + (i + 1) + ": " + message
        return;
      }
    } else {
      postQuizErrorMessage.value = "Question number " + (i + 1) + " has an unknown question type"
      return;
    }
  }

  try {

    if (props.preExistingQuiz) {
      await QuizCreationService.updateQuizForLoggedInUser(quizCreationRequestDTO, props.preExistingQuiz.quizId)

    } else {
      await QuizCreationService.postQuizForLoggedInnUser(quizCreationRequestDTO)
    }
    quizHasBeenSubmitted.value = true;
  } catch (err) {
    postQuizErrorMessage.value = "There was an error handling your request: " + err
  }
}

function removeQuestionTypeModal() {
  showQuestionTypeModal.value = false;
}

function removeQuizSettingsModal() {
  showQuizSettingsModal.value = false;
}

function handleQuestionTypeModalChoice(choice: QuestionType) {
  showQuestionTypeModal.value = false;
  addNewEmptyQuestion(choice);
}

function handleQuizSettingsModalSubmit(submitData: QuizSettings) {
  postQuizErrorMessage.value = "";
  quizSettings.value = submitData;
  showQuizSettingsModal.value = false;
  selectedTags.value = submitData.tags;
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
  <div id="quiz-creator" v-if="!quizHasBeenSubmitted">

    <div id="quiz-info">
      <h1 v-if="quizSettings.title">
        {{ quizSettings.title }}
      </h1>
      <h1 v-else-if="props.preExistingQuiz">
        Edit quiz
      </h1>
      <h1 v-else>
        Create a quiz
      </h1>
      <div class="button-container">
        <button @click="showQuizSettingsModal=true">Edit quiz info</button>
        <button v-if="!postQuizErrorMessage" @click="postQuizToServer">Submit quiz</button>
        <p
            v-if="postQuizErrorMessage"
            class="post-quiz-error-message"
        >
          {{ postQuizErrorMessage }}
        </p>
      </div>


      <QuestionSettingsModal v-show="showQuizSettingsModal"
                             @close-modal="removeQuizSettingsModal"
                             @submit-settings-from-modal="handleQuizSettingsModalSubmit"
                             :pre-existing-settings="quizSettings"
      >
      </QuestionSettingsModal>

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

    <div id="previews" class="preview-container">
      <button class="add-question-button"
              @click="showQuestionTypeModal = true"
      >
        <span class="material-icons">add_box</span>
        Add new question
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
        v-if="showQuestionTypeModal"
        @close-modal="removeQuestionTypeModal"
        @confirm-choice="handleQuestionTypeModalChoice"
    />


  </div>
  <div v-else class="confirmation-message">
    <p v-if="props.preExistingQuiz">
      Quiz has been edited, you may return
    </p>
    <p v-else>
      Quiz has been submitted, you may return
    </p>
    <button>
      <router-link to="/">Return to home</router-link>
    </button>

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
    grid-template-rows: 150px auto;
    grid-template-areas: "quiz-info quiz-info" "previews question-editor";
  }

  #previews {
    flex-direction: column;
    height: auto;
  }
}

@media (max-width: 900px) {
  #quiz-creator {
    grid-template-rows: 150px auto;
    grid-template-areas: "quiz-info"  "question-editor" "previews";
  }

  #previews {
    flex-direction: row;
  }
}

#quiz-creator {
  background-color: white;
  display: grid;
}

.preview-container {
  padding-top: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  overflow: scroll;
}

.add-question-button {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  border: 3px solid grey;
  overflow: hidden;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 200px;
  max-height: 200px;
  min-width: 200px;
  min-height: 200px;
}

.add-question-button:hover {
  border: 3px solid black;
}


#previews {
  grid-area: previews;
}

#quiz-info {
  grid-area: quiz-info;
  align-items: center;
  background-color: lightblue;
  display: flex;
  flex-direction: column;

}

.material-icons {
  font-size: 100px;
}

.post-quiz-error-message {
  color: red;
  background-color: white;
  margin: 10px;
  padding: 10px;
  border: 1px solid black
}

.button-container {
  display: flex;
  gap: 20px;
}

.confirmation-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  p {
    font-size: 40px;
  }
}

</style>