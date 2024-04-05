<script setup lang="ts">

import { ref, watch } from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type { QuizPreviewDTO } from "@/models/quiz/QuizPreviewDTO";
import { QuizService } from "@/services/QuizService";
import { useUserStore } from "@/stores/UserStore";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
const previews = ref<QuizPreviewDTO[]>([])

let userStore = useUserStore();
const username = userStore.getUserData("username")
let page = ref(0);

watch(page, async () => {
  previews.value = await QuizService.getQuizPreviewsSpecifiedUser(username, page.value, 4)
})

function increasePage() {
  if (page.value >= 0) {
    page.value++
  }
}

function decreasePage() {
  if (page.value > 0) {
    page.value--
  }
}

const props = defineProps(
    {
      title: {type: String, required: false, default: "Browse quizzes:"},
    }
)

if (username) {
  try {
    console.log("browsing public")
    previews.value = await QuizService.getQuizPreviewsSpecifiedUser(username, page.value, 4)
  } catch (err) {
    console.error("Could not find users quizzes: " + err)
  }
}
</script>

<template>

  <div class="">
    <UserProfileHeader></UserProfileHeader>

    <div id="quiz-browser">
      <div class="options-container">
        <h1>{{props.title}}</h1>
      </div>

      <div id="quiz-grid">
        <QuizPost v-for="(quiz, index) in previews"
                  :key="index"
                  :post="quiz"
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
      </div>
    </div>
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