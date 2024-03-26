<script setup lang="ts">
import NavigationBar from "@/components/navigation/NavigationBar.vue";
import {reactive, ref} from "vue";
import QuizRunner from "@/components/quiz/QuizRunner.vue";
import type { QuizQuestionDTO } from '@/models/quiz/QuizQuestionDTO'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/UserStore";

const userStore = useUserStore();
const user = userStore.user;

const links = ref({
  '/': { label: 'Home', authNeeded: false },
  '/login': { label: 'Login', authNeeded: false },
  '/quiz-browser' : {label: 'Quiz Browser', authNeeded: false},
  '/user-profile' : {label: "Profile", authNeeded: false},
  '/register-user' : {label: "register", authNeeded: false},
  '/contact': {label: 'Contact', authNeeded: false},
  '/quiz-creator': {label: 'Quiz Creator', authNeeded: true},
});


</script>

<template>
  <NavigationBar :links="links"/>

<!--  <QuizRunner :questions="questions"></QuizRunner>-->
<Suspense>
  <template #default>
    <RouterView>

    </RouterView>
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>

</template>

<style scoped>

</style>
