<script setup lang="ts">


import {ref} from "vue";
import DropDown from "@/components/navigation/UserDropDown.vue";

const hover = ref(false);
const username = ref('Username');


const props = defineProps({
      compressed: {type: Boolean, required: true}
    }
)

</script>

<template>
  <div id="my-account-preview">
    <img src="https://via.placeholder.com/40x40"
         alt="profile picture"
         id="profile-picture"/>
    <div v-if="!compressed">{{ username }}</div>
  </div>
</template>

<style scoped>

#profile-picture {
  border-radius: 50%;
  aspect-ratio: 1/1;

}

#my-account-preview {

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#my-account-preview:hover {
  cursor: pointer;
}


</style>