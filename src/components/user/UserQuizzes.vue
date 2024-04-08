<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore";
import QuizView from "@/components/quiz/browser/QuizPreviewer.vue";
import {onMounted, ref} from "vue";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
import { QuizService } from "@/services/QuizService";
import type { QuizPreviewDTO } from "@/models/quiz/QuizPreviewDTO";
import {ErrorHandlingService} from "@/services/ErrorHandlingService";

const userStore = useUserStore();
const username = userStore.username;
let previews = ref<QuizPreviewDTO[]>();

/**
 * Fetches quizzes associated with the specified user.
 * @param page Page number for pagination
 * @returns Promise resolving to an array of quiz preview data
 */
async function getQuizForUsers(page: number) {
  try {
    return await QuizService.getQuizPreviewsSpecifiedUser(username, page, 3);
  } catch (err) {
    await ErrorHandlingService.handleRequestError(err, "Failed to retrieve quizzes.")
  }
}

/**
 * Handles page change event by fetching new quizzes and updating previews.
 * @param page - Page number for pagination
 */
function handlePageChange(page: number) {
  getQuizForUsers(page)
    .then((newPreviews) => {
      previews.value = newPreviews;
    })
    .catch((error) => {
      console.error("Error loading quiz previews:", error);
    });
}

/**
 * Initializing previews with quizzes on component mount.
 */
onMounted(async () => {
  previews.value = await getQuizForUsers(0);
});
</script>

<template>
  <div class="user-quizzes">
    <UserProfileHeader></UserProfileHeader>

    <QuizView
      :previews="previews"
      :title="username"
      :user-owns-them="true"
      @page-change="handlePageChange"
    >
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
