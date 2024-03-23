<script setup lang="ts">


import { useUserStore } from '@/stores/UserStore'

defineProps({
  links: { type: Object, required: true }
})

const userStore = useUserStore();
function isAuthorized(){
  return userStore.isAuthenticated;
}
</script>

<template>
  <div id="menu">
    <router-link v-for="(value, key) in links" :key="value.label" :to="key">
      <template v-if="!value.authNeeded || isAuthorized()">
        {{ value.label }}
      </template>
    </router-link>
  </div>
</template>

<style scoped>

.router-link-active {
  text-decoration: underline !important;
}

#menu {
  display: flex;
  padding: 0;
  overflow: auto;
  width: 100%;
  background-color: grey;
  justify-content: center;
}

#menu a {
  padding: 10px 20px 10px 20px;
  color: white;
  text-decoration: none;
}

#menu a:hover {
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;

}
</style>