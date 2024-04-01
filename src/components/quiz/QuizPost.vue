<script setup lang="ts">

import router from "@/router";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";

const props = defineProps({
  post: {type: Object as () => QuizPreviewDTO, required: true}
})


function startQuiz() {
  router.push({name: "quiz-runner", params: {quizId: props.post.id}})
}




</script>

<template>

  <div id="quiz-post" @click="startQuiz">
    <div id="quiz-image"></div>
    <div id="quiz-info">
      <p>{{ post.title }}</p>

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

}

#quiz-post:hover {
  cursor: pointer;

  #quiz-info{
    text-decoration: underline;
  }
}



#quiz-info{
  background-color: rgb(205, 103, 106);
  margin-top: auto;
  height: 30%;
  align-content: center;
  padding-left: 5px;

}
</style>