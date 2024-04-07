<script setup lang="ts">

import {onMounted, ref} from "vue";
import SearchBar from "@/components/navigation/navigationbar/SearchBar.vue";
import MyAccountPreview from "@/components/navigation/navigationbar/UserProfileIcon.vue";
import HamburgerSidebar from "@/components/navigation/navigationbar/HamburgerSidebar.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore();

/**
 * Setting auth token on component mount.
 */
onMounted(() => {
  userStore.setAuthToken(userStore.token);
});

/**
 * Array of links for hamburger menu.
 */
const hamburgerLinks = ref([
  {link: '/', label: 'Home', authNeeded: false, icon: 'home', id: 'home-link'},
  {link: '/login', label: 'Login', authNeeded: false, icon: 'login', id: 'login-link'},
  {link: '/register-user', label: "Register", authNeeded: false, icon: 'app_registration', id: 'register-link'},
  {link: '/contact', label: 'Contact us', authNeeded: false, icon: 'contact_support', id: 'contact-link'},
  {link: '/quiz-creator', label: 'Quiz Creator', authNeeded: false, icon: 'edit_square', id: 'creator-link'},
]);

/**
 * Array of links for user profile menu.
 */
const profileLinks = ref([
  {link: '/user-profile', label: "Profile", authNeeded: false, icon: 'person', id: 'user-profile'},
  {link: '/logout', label: "Logout", authNeeded: false, icon: 'logout', id: 'log-out'},
]);

</script>

<template>
  <div id="navigation-bar">

    <HamburgerSidebar :links="hamburgerLinks"
                      class="end-item"
                      data-cy="hamburger-sidebar">

    </HamburgerSidebar>

    <SearchBar data-cy="search-bar"></SearchBar>

    <MyAccountPreview id="right-preview"
                      class="end-item"
                      :links="profileLinks"
                      data-cy="my-account-preview">
    </MyAccountPreview>

  </div>
</template>

<style scoped>

#navigation-bar {
  z-index: 10;
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