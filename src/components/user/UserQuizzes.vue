<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import QuizView from "@/components/quiz/QuizView.vue";
import {ref, watch} from "vue";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
import {QuizService} from "@/services/QuizService";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";

const userStore = useUserStore();
const username = userStore.username;
let previews = ref<QuizPreviewDTO[]>()

async function getQuizForUsers(page: Number) {
  return await QuizService.getQuizPreviewsSpecifiedUser(username, page, 3)
}

function handlePageChange(page: number) {
  getQuizForUsers(page).then(newPreviews => {
    previews.value = newPreviews
  }).catch(error => {
    console.error('Error loading quiz previews:', error);
  });
}

previews.value = await getQuizForUsers(0);

</script>

<template>
  <div class="user-quizzes">
    <UserProfileHeader></UserProfileHeader>

    <QuizView :previews="previews"
              :title="username"
              :user-owns-them="true"
              @page-change="handlePageChange">
    </QuizView>
  </div>
</template>

<style scoped>
.user-quizzes {
  padding: 2%;
  flex-grow: 1;
  max-height: 100vh;
  overflow-y: auto;
}
</style>