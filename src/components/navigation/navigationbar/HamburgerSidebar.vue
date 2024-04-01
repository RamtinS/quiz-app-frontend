<script setup lang="ts">

import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import {ref} from "vue";



defineProps({
  links: {type: Object, required: true},
})


const showLeft = ref(false);

function toggleShowLeftMenu() {
  showLeft.value = !showLeft.value;
}


const root = ref<HTMLElement |null>(null)



</script>


<template>
  <div id="hamburger-icon" ref="root"
       @click="toggleShowLeftMenu"
  >
    <span class="material-icons"
          v-if="!showLeft"
    >
      menu
    </span>
    <span class="material-icons"
          v-else
    >
      menu_open
    </span>
    <DropDown v-if="showLeft"
              :left="true">
      <RouterLinkBar :links="links">
      </RouterLinkBar>
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