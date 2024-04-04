<script setup lang="ts">

import {useUserStore} from "@/stores/UserStore";
import { RouterLink } from 'vue-router';

const userStore = useUserStore();

</script>

<template>
  <header class="profile-header">
    <img src="https://via.placeholder.com/150" alt="profile picture" class="profile-picture" />
    <h3 class="profile-username">{{userStore.getUserData("username")}}</h3>
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
  width: 8%;
  border-radius: 50%;
  border: 5px solid var(--primary);
}

.profile-username {
  margin-top: 3.4%;
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