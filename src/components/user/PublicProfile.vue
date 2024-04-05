<script setup lang="ts">

import {UserService} from "@/services/UserService";
import QuizBrowser from "@/components/quiz/QuizBrowser.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const userInformation = ref();
const username = ref('');
const errorMessage = ref('');


getRouteParams();
loadUserInformation()

/**
 * Updates the information about the user based on the route parameters
 */
watch(route, () => {
  getRouteParams()
  loadUserInformation()
})

/**
 * Gets the username from the route parameters
 */
function getRouteParams() {
  if (typeof route.params.username === 'string') {
    username.value = route.params.username
  } else if (Array.isArray(route.params.username)) {
    username.value = route.params.username[0]
  }
}

/**
 * Loads the user information from the server
 */
async function loadUserInformation(){
  try {
    userInformation.value = await UserService.getPublicUserInformationFromUsername(username.value);
  } catch (err) {
     errorMessage.value = 'Could not find user, please try again';
  }
}

</script>

<template>
  <div id="public-profile" v-if="userInformation">
    <quiz-browser
        :username="userInformation.username"
        :title="'Quizzes by ' + userInformation.username"
    ></quiz-browser>
  </div>
  <div class="error-message"
       v-else>
    <h1>{{errorMessage}}</h1>
  </div>
</template>

<style scoped>
h1{
  text-align: center;
}

</style>