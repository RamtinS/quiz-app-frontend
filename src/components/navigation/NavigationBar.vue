<script setup lang="ts">

import {ref} from "vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import SearchBar from "@/components/navigation/SearchBar.vue";
import MyAccountPreview from "@/components/navigation/UserPersonalAccountPreview.vue";

const links = ref({
  '/': {label: 'Home', authNeeded: false, icon: 'home'},
  '/login': {label: 'Login', authNeeded: false, icon: 'login'},
  '/quiz-browser': {label: 'Quiz Browser', authNeeded: false, icon: 'travel_explore'},
  '/user-profile': {label: "Profile", authNeeded: false, icon: 'person'},
  '/register-user': {label: "register", authNeeded: false, icon: 'app_registration'},
  '/contact': {label: 'Contact', authNeeded: false, icon: 'contact_support'},
  '/quiz-creator': {label: 'Quiz Creator', authNeeded: true, icon: 'edit_square'},
});

const compressed = ref(true);
function toggleCompressed() {
  compressed.value = !compressed.value;
}
</script>

<template>
  <div id="navigation-bar" @mouseover="compressed = false" @mouseleave="compressed=true" >
    <MyAccountPreview :compressed="compressed">
    </MyAccountPreview>
    <SearchBar :compressed="compressed">
    </SearchBar>
    <RouterLinkBar :links="links" :compressed="compressed">
    </RouterLinkBar>

  </div>
</template>

<style scoped>


#navigation-bar {
  display: flex;
  flex-direction: column;
  background-color: var(--navigation-bar-background);
  color: white;
  height: 100vh;
}



#logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}




</style>