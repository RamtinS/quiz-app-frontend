<script setup lang="ts">

import {useUserStore} from "@/stores/UserStore";
import { RouterLink } from 'vue-router';
import {onMounted, ref} from "vue";

const userStore = useUserStore();
const username = ref<string>(userStore.username);
const userImagePath = ref<string>("");

function generateNumber(): number {
  const length = username.value.length;
  return Math.round(length/3.5);
}

onMounted(() => {
  const imageNumber = generateNumber();
  userImagePath.value = "/src/assets/images/user/owl" + imageNumber + ".png";
})

</script>

<template>
  <header class="profile-header">
    <img :src="userImagePath" alt="profile picture" class="profile-picture" />
    <h3 class="profile-username">{{username}}</h3>
  </header>

  <nav>
    <RouterLink :to="{name: 'user-profile'}">Profile</RouterLink>
    <RouterLink :to="{name: 'user-quizzes'}">Quizzes</RouterLink>
    <RouterLink :to="{name: 'user-stats'}">Statistics</RouterLink>
  </nav>

  <hr class="separator">

</template>

<style scoped>

.profile-header {
  display: flex;
}

.profile-picture{
  margin-left: 1%;
  width: 8%;
  border-radius: 50%;
  border: 4px solid var(--primary);
}

.profile-username {
  margin-top: 4%;
  margin-left: 2%;
}

nav {
  text-align: left;
  width: 100%;
  margin-top: 1rem;
}

nav a {
  color: var(--primary);
}

nav a.router-link-exact-active {
  color: grey;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

.separator {
  border: 1px solid var(--primary);
}

</style>