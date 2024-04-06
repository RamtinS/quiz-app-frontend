<script setup lang="ts">
import { ref, watch } from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import {QuizService} from "@/services/QuizService";

const previews = ref<QuizPreviewDTO[]>([])
let page = ref(0);
const searchField = ref<string>('')
let searchByCategory = false
let searchByTags = false

async function getSearchResult() {
  previews.value = await QuizService.getQuizBySpecifiedCriteria(6, page.value, searchField.value, searchByCategory, searchByTags);
}

watch(page, async () => {
  previews.value = await getSearchResult()
})


function increasePage() {
  if (page.value >= 0) {
    page.value++
  }
}

async function changeCategory() {
  searchByCategory = !searchByCategory;
  console.log(searchByCategory)
}

async function changeTags() {
  searchByTags = !searchByTags;
  console.log(searchByTags)
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

try {
  console.log("browsing public")
  previews.value = await QuizService.getQuizBySpecifiedCriteria(6, page.value, searchField.value, searchByCategory, searchByTags);
} catch (err) {
  console.log("Quizzes could not be loaded, " + err)
}
</script>

<template>
  <div class="quiz-browser">

    <div class="options-container">
      <h1>{{props.title}}</h1>

      <div class="search-container">
        <input @keydown.enter="getSearchResult" v-model="searchField" type="search" name="" id="search" placeholder="">
        <button id="search-button" @click="getSearchResult">Search</button>
      </div>


      <div>
        <label for="tags">Search by tags</label>
        <input name="tags" type="checkbox" id="tags" @change="changeTags">

        <label for="category">Search by category</label>
        <input name="category" id="category" type="checkbox"  @change="changeCategory">
      </div>

    </div>

    <div class="quiz-grid">
      <QuizPost v-for="(quiz, index) in previews"
                :key="index"
                :post="quiz"
                :is-owned-by-user="quizzesAreFromCurrentUser"
                class="quiz-post"
      >
      </QuizPost>
    </div>

    <div class="browser-navigator">
      <button id="previous" @click="decreasePage">
        Previous
      </button>
      <p>Page: {{page}}</p>
      <button id="next" @click="increasePage">
        Next
      </button>
    </div>¨
  </div>
</template>

<style scoped>
h1{
  color: black;
}

.quiz-browser{
  min-width: 400px;
}

.browser-navigator {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-weight: bold;
}

button {
  padding: 10px;
  font-size: 17px;
  font-weight: bold;
}

.quiz-grid {
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
  justify-content: center;
}


.options-container h1 {
  text-align: center;
}


input {
  margin: 15px;
  font-size: 15px;
}

@media screen and (max-width: 600px) {
  .search-container {
    display: flex;
    flex-direction: column;
  }
}

.search-container {
}

input[type=checkbox] {
  width: 15px;
  height: 15px;
  padding-bottom: 20px;
}

</style>