<script setup lang="ts">

import {ref} from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import {QuizService} from "@/services/QuizService";


const previews = ref<QuizPreviewDTO[]>([])
const props = defineProps(
  {
    title: {type: String, required: false, default: "Browse quizzes"},
    username: {type: String, required: false} //use field when browsing other user profiles
  }
)


if (!props.username){
  try {
    console.log("browsing public")

    previews.value = await QuizService.getQuizPreviewsPublic(0, 100)
  } catch (err) {
    console.error("Could not public quizzes: " + err)
  }
} else {
  console.log("browsing user");
  try {
    previews.value = await QuizService.getQuizPreviewsSpecifiedUser(props.username, 0, 100)

  } catch (err){
    console.error("Could not user quizzes: " + err)
  }
}


</script>

<template>
  <div id="quiz-browser">
    <h1>{{props.title}}</h1>
  </div>
  <div id="quiz-grid">
    <QuizPost v-for="quiz in previews"
              :key="quiz.title"
              :post="quiz">
    </QuizPost>
  </div>
</template>

<style scoped>

h1{
  text-align: center;
}

#quiz-grid {
  display: grid;
  gap: 5%;
  padding: 5% 15% 0 15%;
}


@media (min-width: 1000px) {
  #quiz-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 700px) and (max-width: 1000px) {
  #quiz-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  #quiz-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}





</style>