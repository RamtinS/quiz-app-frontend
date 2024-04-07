<script setup lang="ts"></script>

<template>
  <div class="user-logout">
    <h1>You have successfully logged out</h1>
    <router-link to="/">Go back to the home page</router-link>
  </div>
</template>

<style scoped>
.user-logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 30px;
}
</style>
