<script setup lang="ts">
import { UserService } from "@/services/UserService";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { QuizService } from "@/services/QuizService";
import QuizView from "@/components/quiz/browser/QuizPreviewer.vue";
import type { QuizPreviewDTO } from "@/models/quiz/QuizPreviewDTO";

const route = useRoute();
const userInformation = ref();
const username = ref("");
const errorMessage = ref("");
let previews = ref<QuizPreviewDTO[]>();

getRouteParams();
loadUserInformation();

/**
 * Updates the information about the user based on the route parameters
 */
watch(route, () => {
  getRouteParams();
  loadUserInformation();
  loadQuizzes(0);
});

function handlePageChange(page: number) {
  loadQuizzes(page)
    .then(() => {})
    .catch((error) => {
      console.error("Error loading quiz previews:", error);
    });
}

/**
 * Gets the username from the route parameters
 */
function getRouteParams() {
  if (typeof route.params.username === "string") {
    username.value = route.params.username;
  } else if (Array.isArray(route.params.username)) {
    username.value = route.params.username[0];
  }
}

/**
 * Loads the user information from the server
 */
async function loadUserInformation() {
  try {
    userInformation.value =
      await UserService.getPublicUserInformationFromUsername(username.value);
  } catch (err) {
    errorMessage.value = "Could not find user, please try again";
  }
}

async function loadQuizzes(page: number) {
  try {
    previews.value = await QuizService.getQuizPreviewsSpecifiedUser(
      username.value,
      page,
      5,
    );
  } catch (err) {
    errorMessage.value = "Could not find user, please try again";
  }
}
</script>

<template>
  <div id="public-profile" v-if="userInformation">
    <QuizView
      :title="username"
      :user-owns-them="false"
      @page-change="handlePageChange"
      :previews="previews"
    >
    </QuizView>
  </div>
  <div class="error-message" v-else>
    <h1>{{ errorMessage }}</h1>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
