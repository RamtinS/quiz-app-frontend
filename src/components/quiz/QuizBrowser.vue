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

    <div id="quiz-grid">
      <QuizPost v-for="(quiz, index) in previews"
                :key="index"
                :post="quiz"
                class="quiz-post"
      >
      </QuizPost>
    </div>
    <div id="show-more">
      <button>Show more</button>
    </div>
  </div>

</template>

<style scoped>

h1{
  text-align: left;
  padding-left: 5%;
  color: black;


}

#quiz-browser{
  background: rgb(93,79,149);
  background: linear-gradient(252deg, rgba(93,79,149,1) 0%, rgba(112,132,183,1) 55%, rgba(0,212,255,1) 100%);
}

#quiz-grid {
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  justify-content: center;
  height: auto;
  gap: 50px;
  width: 90%;
  padding-left: 5%;
}

#show-more{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}







</style>