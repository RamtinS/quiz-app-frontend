<script setup lang="ts">

import NavigationBar from "@/components/navigation/NavigationBar.vue";
import axios from "axios";


</script>

<template>
  <div id="app-container">
    <NavigationBar>

    </NavigationBar>
    <div class="content">
      <Suspense>
        <template #default>

          <RouterView>

          </RouterView>
        </template>

        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>


</template>

<style scoped>
#app-container {
  display: flex;
  flex-direction: row;
}



</style>
