<script setup lang="ts">
import { QuizService } from "@/services/QuizService";
import type { QuizDTO } from "@/models/quiz/QuizDTO";
import { useRoute } from "vue-router";
import QuizCreator from "@/components/quiz/creation/questions/QuizCreator.vue";
import { ref } from "vue";

const route = useRoute();

const quiz = ref<QuizDTO | null>(await loadQuizFromServer());

async function loadQuizFromServer() {
  try {
    let id = -1;
    if (typeof route.params.quizId === "string") {
      id = parseInt(route.params.quizId);
    } else if (Array.isArray(route.params.quizId)) {
      id = parseInt(route.params.quizId[0]);
    }
    return (await QuizService.getQuizById(id)) as QuizDTO;
  } catch (err) {
    return null;
  }
}
</script>

<template>
  <div id="wrapper" v-if="quiz">
    <QuizCreator :pre-existing-quiz="quiz"> </QuizCreator>
  </div>
  <div class="error-message" v-else>
    <p>Failed to load quiz, you may not have access to edit this</p>
  </div>
</template>

<style scoped>
.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
