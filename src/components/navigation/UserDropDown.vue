<script setup lang="ts">

import {useUserStore} from "@/stores/UserStore";

const store = useUserStore();
const username = store.user.username || "Guest"

const props = defineProps({
  hover: {type: Boolean, required: true}
})

</script>

<template>
  <div id="dropdown" v-if="hover">
    <div id="header">
      {{ username }}
    </div>
    <div id="links">
      <div id="divider"/>
      <router-link to="/user-profile">My Account</router-link>
      <router-link to="/settings">Settings</router-link>
      <div id="divider"/>

      <router-link to="/log out">Log out</router-link>
    </div>


  </div>
</template>

<style scoped>

#dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--primary-light);
  border-radius: 10px;
  width: 200px;
  height: auto;
  padding: 10px;
  box-shadow: 0 0 10px 5px grey;
  border: darkslategrey solid 1px;
}

#header {
  text-align: center;
}

#divider{
  border-bottom: 1px solid darkslategrey;
  width: 100%;
}

#links{
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 10px;
}


</style>