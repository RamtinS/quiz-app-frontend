<script setup lang="ts">


import {ref} from "vue";
import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore();

const username = ref('Not logged in');
const compressed = ref(true);
username.value = userStore.getUserData("name")

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
    <div id="my-account-preview" @click="toggleCompressed">
      @{{ username }}
      <img src="https://via.placeholder.com/40x40"
           alt="profile picture"
           id="profile-picture"/>
      <DropDown v-if="!compressed" >
        <RouterLinkBar :links="links"></RouterLinkBar>
      </DropDown>
    </div>
  </div>

</template>


<style scoped>

#my-account-preview {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}

#profile-picture {
  margin-top: 5px;
  margin-bottom: 2px;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

#profile-picture:hover {
  cursor: pointer;
}

</style>