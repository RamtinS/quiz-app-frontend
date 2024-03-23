<script setup lang="ts">
import UserLogin from "@/components/user/UserLogin.vue";
import NavigationBar from "@/components/navigation/NavigationBar.vue";
import {ref} from "vue";


const links = ref({
  '/': { label: 'Home', authNeeded: false },
  '/login': { label: 'Login', authNeeded: false },
});

</script>

<template>
  <NavigationBar :links="links"/>
  <RouterView>

  </RouterView>
</template>

<style scoped>

</style>
