<script setup lang="ts">

import QuizBrowser from "@/components/quiz/QuizBrowser.vue";
import {useUserStore} from "@/stores/UserStore";
import UserProfileHeader from "@/components/user/UserProfileHeader.vue";

const userStore = useUserStore();




</script>

<template>

  <div id="user-quizzes">

    <UserProfileHeader></UserProfileHeader>

    <QuizBrowser :title="'All user quizzes'" :username="userStore.getUserData('username')"></QuizBrowser>


  </div>

</template>

<style scoped>

#user-quizzes {
  padding: 2%;
}

#user-quizzes {
  flex-grow: 1;
  max-height: 100vh;
  overflow-y: auto;
}

</style>