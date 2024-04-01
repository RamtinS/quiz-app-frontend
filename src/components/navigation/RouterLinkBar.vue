<script setup lang="ts">


import {useUserStore} from '@/stores/UserStore'

defineProps({
  links: {type: Object, required: true},

})

const userStore = useUserStore();

function isAuthorized() {
  return userStore.isAuthenticated;
}


</script>

<template>
  <div class="generic-dropdown">
    <router-link class="router-link" v-for="(value, index) in links" :key="index" :to="value.link">

      <div class="bar-item" v-if="!value.authNeeded || isAuthorized()">
        <span class="material-icons">{{ value.icon }}</span>
        <p class="bar-item-text">
          {{ value.label }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>

.generic-dropdown {
  top: 100%;
  background: inherit;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid black;
  background-color: var(--navigation-bar-background);

  .bar-item {
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 20px;
    border-radius: inherit;
    height: 40px;
  }

  .bar-item:hover {
    background-color: lightgrey;
    text-shadow: none;

    .bar-item-text {
      text-decoration-color: black;
    }
  }

  .router-link {
    border-radius: 10px;
    text-decoration: none;
    color: black;
  }

  .bar-item-text {
    text-decoration: underline;
    text-decoration-color: lightgrey;
    white-space: nowrap;


  }
}

@media (max-width: 800px) {
  .generic-dropdown {
    border-radius: 0;
  }
  .bar-item {
    width: 100vw;
    padding: 0;
  }

}
</style>