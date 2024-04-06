<script setup lang="ts">
import {useRoute} from "vue-router";
import QuizRunner from "@/components/quiz/QuizHandler/QuizRunner.vue";
import {QuizService} from "@/services/QuizService";
import type {QuizDTO} from "@/models/quiz/QuizDTO";
import {ref} from "vue";

const route = useRoute();


const quiz = ref<QuizDTO | null>(await loadQuizFromServer())


async function loadQuizFromServer() {
  try {
    let id = -1;
    if (typeof route.params.quizId === 'string') {
      id = parseInt(route.params.quizId);
    } else if (Array.isArray(route.params.quizId)) {
      id = parseInt(route.params.quizId[0]);
    }

    console.log("id: " + id)
    return await QuizService.getQuizById(id) as QuizDTO;

  } catch (err) {
    return null;
  }
}



</script>

<template>
  <div v-if="quiz">
    <quiz-runner :quiz="quiz">
    </quiz-runner>
  </div>
</template>

<style scoped>

</style>