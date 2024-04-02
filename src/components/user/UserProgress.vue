<script setup lang="ts">

import UserProfileHeader from "@/components/user/UserProfileHeader.vue";
</script>

<template>

  <div id="user-progress">

    <UserProfileHeader></UserProfileHeader>

  </div>

</template>

<style scoped>

#user-progress {
  padding: 2%;
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

#separator {
  border: 1px solid var(--primary);
}



</style>