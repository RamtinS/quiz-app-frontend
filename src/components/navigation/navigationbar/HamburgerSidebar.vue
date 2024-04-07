<script setup lang="ts">
import DropDown from "@/components/navigation/navigationbar/NavigationBarDropDown.vue";
import RouterLinkBar from "@/components/navigation/navigationbar/RouterLinkBar.vue";
import { ref } from "vue";

/**
 * Defines a list of links used to iterate over to show router links
 */
defineProps({
  links: { type: Object, required: true },
});

const showLeft = ref(false);
const root = ref<HTMLElement | null>(null);

/**
 * Toggles the visibility of the left menu
 */
function toggleShowLeftMenu() {
  showLeft.value = !showLeft.value;
}
</script>

<template>
  <div id="hamburger-icon" ref="root" @click="toggleShowLeftMenu">
    <span class="material-icons" v-if="!showLeft"> menu </span>
    <span class="material-icons" v-else> menu_open </span>
    <DropDown v-if="showLeft" :left="true">
      <RouterLinkBar :links="links"> </RouterLinkBar>
    </DropDown>
  </div>
</template>

<style scoped>
#hamburger-icon {
  background: inherit;
  position: relative;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

#hamburger-icon span {
  font-size: 50px;
  cursor: pointer;
  border-radius: inherit;
}
</style>
