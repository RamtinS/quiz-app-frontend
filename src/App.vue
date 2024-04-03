<script setup lang="ts">

import NavigationBar from "@/components/navigation/navigationbar/NavigationBar.vue";
import quizrun from "@/components/quizRunner/quizrunbox.vue";
import Quizrunbox from "@/components/quizRunner/quizrunbox.vue";

</script>

<template>
  <div id="app-container">

    <NavigationBar>

    </NavigationBar>
    <div id="content">

      <Suspense>
        <template #default>
          <RouterView></RouterView>
        </template>

        <template #fallback>
          <div>Loading...</div>
        </template>
      </Suspense>
    </div>
  </div>

</template>

<style scoped>



#content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 70px;
}

</style>
