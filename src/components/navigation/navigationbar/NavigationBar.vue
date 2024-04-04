<script setup lang="ts">

import {ref} from "vue";
import SearchBar from "@/components/navigation/SearchBar.vue";
import MyAccountPreview from "@/components/navigation/navigationbar/UserProfileIcon.vue";
import HamburgerSidebar from "@/components/navigation/navigationbar/HamburgerSidebar.vue";

const hamburgerLinks = ref([
  {link: '/', label: 'Home', authNeeded: false, icon: 'home'},
  {link: '/login', label: 'Login', authNeeded: false, icon: 'login'},
  {link: '/quiz-browser', label: 'Quiz Browser', authNeeded: false, icon: 'travel_explore'},
  {link: '/register-user', label: "Register", authNeeded: false, icon: 'app_registration'},
  {link: '/contact', label: 'Contact us', authNeeded: false, icon: 'contact_support'},
  {link: '/quiz-creator', label: 'Quiz Creator', authNeeded: false, icon: 'edit_square'},
]);

const profileLinks = ref([
  {link: '/user-profile', label: "Profile", authNeeded: false, icon: 'person'},
  {link: '/logout', label: "Logout", authNeeded: false, icon: 'logout'},
]);

</script>

<template>
  <div id="navigation-bar">

    <HamburgerSidebar :links="hamburgerLinks"
                      class="end-item"
    ></HamburgerSidebar>
    <SearchBar>
    </SearchBar>
    <MyAccountPreview id="right-preview"
                      class="end-item"
                      :links="profileLinks"
    >
    </MyAccountPreview>

  </div>
</template>

<style scoped>


#navigation-bar {

  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: space-between;
  position: fixed;
  margin: 10px;
  width: calc(100% - 20px);
  background-color: var(--navigation-bar-background);
  border-radius: 15px;
}

@media (max-width: 800px) {
  #navigation-bar {
    margin: 0;
    border-radius: 0;
    width: 100%;
  }

  .end-item {
    padding: 0
  }
}

.end-item {
  padding-left: 10px;
  padding-right: 10px;
}


</style>