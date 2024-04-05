<script setup lang="ts">

import { ref, watch } from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import {QuizService} from "@/services/QuizService";
const previews = ref<QuizPreviewDTO[]>([])


let page = ref(0);

watch(page, async () => {
  previews.value = await QuizService.getQuizBySpecifiedCriteria(10, page.value, searchField.value, searchByCategory, searchByTags)
})
const searchField = ref<string>('')

let searchByCategory = false

let searchByTags = false


function increasePage() {
  if (page.value >= 0) {
    page.value++
  }
}

async function searchQuiz() {
  previews.value = await QuizService.getQuizBySpecifiedCriteria(10, page.value, searchField.value, searchByCategory, searchByTags)
}
async function changeCategory() {
  searchByCategory = !searchByCategory;
  console.log(searchByCategory)
}

async function changeTags() {
  searchByTags = !searchByTags;
  console.log(searchByTags)
}

async function getQuizzes(){
  previews.value = await QuizService.getQuizPreviewsPublic(page.value, 10);
}

function decreasePage() {
  if (page.value > 0) {
    page.value--
  }
}

const props = defineProps(
  {
    title: {type: String, required: false, default: "Browse quizzes:"},
    username: {type: String, required: false}, //use field when browsing other user profiles
    quizzesAreFromCurrentUser: {type: Boolean, required: false, default: false}
  }
)

if (!props.username){
  try {
    console.log("browsing public")
    previews.value = await QuizService.getQuizPreviewsPublic(page.value, 10)
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

    <div class="options-container">
      <h1>{{props.title}}</h1>

      <div>
        <input v-model="searchField" type="search" name="" id="" placeholder="">
        <input value="Search" type="button" @click="searchQuiz">
      </div>


      <div>
        <label for="tags">Search by tags</label>
        <input name="tags" type="checkbox"  @change="changeTags">

        <label for="category">Search by category</label>
        <input name="category" type="checkbox"  @change="changeCategory">
      </div>

    </div>

    <div id="quiz-grid">
      <QuizPost v-for="(quiz, index) in previews"
                :key="index"
                :post="quiz"
                :is-owned-by-user="quizzesAreFromCurrentUser"
                class="quiz-post"
      >
      </QuizPost>
    </div>


    <div class="browser-navigator">
      <button @click="decreasePage">
        Previous
      </button>
      <p>Page: {{page}}</p>
      <button @click="increasePage">
        Next
      </button>
    </div>¨
  </div>

</template>

<style scoped>

h1{
  color: black;
}

#quiz-browser{
  background: rgb(93,79,149);
  background: linear-gradient(252deg, rgba(93,79,149,1) 0%, rgba(112,132,183,1) 55%, rgba(0,212,255,1) 100%);
}

.browser-navigator {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

.options-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.options-container h1 {
  text-align: center;
}

input {
  margin: 30px;
  font-size: 20px;
}

</style>