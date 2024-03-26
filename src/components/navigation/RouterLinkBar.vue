<script setup lang="ts">


import {useUserStore} from '@/stores/UserStore'
import {ref} from "vue";

defineProps({
  links: {type: Object, required: true},
  compressed: {type: Boolean, required: true}

})



const userStore = useUserStore();

function isAuthorized() {
  return userStore.isAuthenticated;
}
</script>

<template>
  <div id="menu">
    <router-link class="router-link" v-for="(value, key) in links" :key="value.label" :to="key" >

      <div class="bar-item" v-if="!value.authNeeded || isAuthorized()">

        <span class="material-icons">{{value.icon}}</span>
        <p v-if="!compressed">
          {{ value.label }}
        </p>
      </div>
    </router-link>
  </div>
</template>

<style scoped>



.bar-item{
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: inherit;
  height: 40px;
  border: 1px solid #222f1a;

}
.bar-item:hover{
  background-color: lightgrey;
  color: black;
  text-shadow: none;
}

.router-link{
  border-radius: inherit;
}

#menu {
  display: flex;
  flex-direction: column;
  background-color: black;
  border-radius: 10px;
}

#menu a {
  color: inherit;
  text-decoration: none;
}


</style>