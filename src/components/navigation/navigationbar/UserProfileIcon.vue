<script setup lang="ts">


import {ref} from "vue";
import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";

const username = ref('Username');


const compressed = ref(true);

defineProps({
  links: {type: Object, required: true},
})

function toggleCompressed() {
  compressed.value = !compressed.value;
}
</script>

<template>
  <div>
    <div id="my-account-preview" @click="toggleCompressed">
      <div class="username-container">
        @{{ username }}
      </div>
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

.username-container {
  font-size: 1em;
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