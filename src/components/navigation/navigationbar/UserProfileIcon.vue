<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import DropDown from "@/components/navigation/navigationbar/NavigationBarDropDown.vue";
import RouterLinkBar from "@/components/navigation/navigationbar/RouterLinkBar.vue";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const username = ref<string>("Not logged in");
const compressed = ref<boolean>(true);

/**
 * Update the displayed username when the component is mounted
 */
onMounted(() => {
  updateUsername();
});

/**
 * Update the displayed user-info when the authentication status changes
 */
watch(
  () => userStore.isAuthenticated,
  () => {
    updateUsername();
  },
);

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
  links: { type: Object, required: true },
});

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
      <p>{{ username }}</p>
      <span class="material-icons">person </span>

      <DropDown v-if="!compressed">
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

@media (max-width: 500px) {
  .my-account-preview p {
    display: none;
  }
}
</style>
