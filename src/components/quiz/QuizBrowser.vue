<script setup lang="ts">

import type {QuizDTO} from "@/models/quiz/QuizDTO";
import {ref} from "vue";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";


const previews = ref<QuizPreviewDTO[]>([])

const props = defineProps(
  {
    previews: {type: Object as () => QuizPreviewDTO[], required: false},
    title: {type: String, required: false, default: "Browse quizzes"},
  }

)

for (let i = 0; i < 12; i++) {
  previews.value.push({
    id: -i,
    title: "quiz " + i,
    description: "This is a quiz about " + i,
  })
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