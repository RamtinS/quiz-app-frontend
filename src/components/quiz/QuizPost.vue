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
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <p>{{ post.open }} </p>
    </div>
  </div>
</template>

<style scoped>


#quiz-post {
  border-radius: 10px;
  background-color: yellow;
  display: flex;
  flex-direction: column;

  :hover {
    cursor: pointer;
  }

  box-shadow: grey 5px 5px 5px;
}

#quiz-post:hover {
  box-shadow: grey 10px 10px 10px;
  transform: scale(1.05);
}

#quiz-image {
  aspect-ratio: 1/1;

  background-image: url("src/assets/images/test-images/football_example.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border: black solid 1px;
  flex: 1;


}

#quiz-info {
  flex: 1;
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
  display: flex;
  border: black solid 1px;
  flex-direction: column;
  text-align: center;
  background-color: var(--primary-light);
}
</style>