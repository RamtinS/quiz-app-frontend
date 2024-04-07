<script setup lang="ts">

import router from "@/router";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";

const props = defineProps({
  post: {type: Object as () => QuizPreviewDTO, required: true},
  isOwnedByUser: {type: Boolean, required: false, default: false}
})


function startQuiz() {
  router.push({name: "quiz-runner", params: {quizId: props.post.id}})
}

function editQuiz(){
  router.push({name: "quiz-editor", params: {quizId: props.post.id}});
}

</script>

<template>

  <div id="quiz-post" @click="startQuiz">
    <div id="quiz-image"></div>
    <div id="quiz-info">
      <p>{{ post.title }}</p>
    </div>
    <div v-if="props.isOwnedByUser"
        class="edit-container"
         @click.stop="editQuiz"
    >
      <p class="edit-message">
        click to edit
      </p>
      <span class="material-icons">
        edit
      </span>
    </div>
  </div>
</template>

<style scoped>

h2{
  margin: 0;
}

p{
  margin: 0;
}

#quiz-post {
  width: 300px;
  max-width: 300px;
  aspect-ratio: 1.61/1;
  border: 1px solid black;
  background: url("src/assets/images/test-images/football_example.jpeg");
  display: flex;
  flex-direction: column;
  color: white;
  position: relative;

}

#quiz-post:hover {
  cursor: pointer;

  &:hover{
    #quiz-info{
      text-decoration: underline;
    }
  }
}

#quiz-info{
  background-color: rgb(205, 103, 106);
  margin-top: auto;
  height: 30%;
  align-content: center;
  padding-left: 5px;

}

.edit-container{
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
}

.edit-container:hover{
  .edit-message{
    visibility: visible;
  }
}

.edit-message{
  padding-top: 5px;
  visibility: hidden;
}

.material-icons {
  font-size: 30px;
}


</style>