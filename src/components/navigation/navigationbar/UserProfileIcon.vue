<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import DropDown from "@/components/navigation/NavigationBarDropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore();
const username = ref<string>('Not logged in');
const compressed = ref<boolean>(true);

/**
 * Update the displayed username when the component is mounted
 */
onMounted(() => {
  updateUsername()
})

/**
 * Update the displayed user-info when the authentication status changes
 */
watch(() => userStore.isAuthenticated, () => {
  updateUsername()
});

/**
 * Update the displayed username based on authentication status
 */
function updateUsername() {
  if (userStore.isAuthenticated) {
    username.value = userStore.username;
  } else {
    username.value = "Not logged in";
  }
}

/**
 * Router links for the dropdown
 */
defineProps({
  links: {type: Object, required: true},
})

/**
 * Toggles the compressed state of the component, either showing or hiding the dropdown
 */
function toggleCompressed() {
  compressed.value = !compressed.value;
}

</script>

<template>
  <div>
    <div class="my-account-preview" @click="toggleCompressed">

      <p> {{ username }} </p>

      <img src="https://via.placeholder.com/40x40" alt="profile picture" class="profile-picture"/>

      <DropDown v-if="!compressed" >
        <RouterLinkBar :links="links"></RouterLinkBar>
      </DropDown>

    </div>
  </div>

</template>


<style scoped>

.my-account-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

.profile-picture {
  margin-top: 5px;
  margin-bottom: 2px;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.profile-picture:hover {
  cursor: pointer;
}

@media (max-width: 500px) {
  .my-account-preview p {
    display: none;
  }
}

</style>