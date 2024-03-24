<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "@/stores/UserStore";
import QuizPost from "@/components/quiz/QuizPost.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import QuizBrowser from "@/components/quiz/QuizBrowser.vue";

const userStore = useUserStore();
const username = ref("Smithy0143")

if (userStore.user.username) {
  username.value = userStore.user.username
}

const firstName = ref('John')
const surname = ref('Smith')
const editMode = ref(false)
const bio = ref("This is a test bio")

const previews = ref<QuizPreviewDTO[]>([]);


function toggleEdit() {
  editMode.value = !editMode.value
}

</script>

<template>

  <div id="grid">
    <header>
      <img src="https://via.placeholder.com/150" alt="profile picture" id="profile-picture"/>
      <h1>{{ username }}</h1>
    </header>


    <div id="personal-info">
      <div>
        <p>
          first name:
        </p>
        <p v-if="!editMode">
          {{ firstName }}
        </p>
        <input v-else v-model="firstName" type="text" placeholder="Enter your first name"/>
      </div>

      <div>
        <p>
          surname:
        </p>
        <p v-if="!editMode">
          {{ surname }}
        </p>
        <input v-else v-model="surname" type="text" placeholder="Enter your surname"/>

      </div>
      <button @click="toggleEdit">
        {{ editMode ? 'Save' : 'Edit' }}
      </button>
    </div>

    <div id="user-quizzes">
      <QuizBrowser :title="'All user quizzes'"
      >

      </QuizBrowser>
    </div>
  </div>


</template>


<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
}

header {
  display: flex;
  padding-left: 20px;
  grid-area: header;
}

#grid {
  display: grid;
  grid-template-columns: 33% 67%;
  grid-template-areas:
    'header user-quizzes'
    'personal-info user-quizzes';
  padding-bottom: 50px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}



#profile-picture {
  border-radius: 50%;
  border: 5px solid var(--primary);
}

#personal-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  grid-area: personal-info;

}

#personal-info > div{
  display: flex;
  gap: 20px;
  flex-direction: row;
}

#user-quizzes{
  grid-area: user-quizzes;

}

</style>