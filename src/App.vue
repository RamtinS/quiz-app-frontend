<script setup lang="ts">

import NavigationBar from "@/components/navigation/NavigationBar.vue";
import axios from "axios";


</script>

<template>
  <div id="app-container">
    <NavigationBar>

    </NavigationBar>
    <div id="content">
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

#content {
  flex: 1; /* This will make the content div take up remaining space */
  overflow-y: auto; /* Add scroll if content overflows */
}


</style>
