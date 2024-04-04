<script setup lang="ts">
import {ref} from "vue";
import {UserService} from "@/services/UserService";
import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import {SearchService} from "@/services/SearchService";

const search = ref<string>('')
const errorMessage = ref("")

const preview = ref<{ link: string; label: string; authNeeded: boolean; icon: string; }[]>([]);

async function searchInteract() {
  if (search.value === "") {
    return
  }

  //const publicUserResult: PublicUserInformationDTO[] = await UserService.searchUserByUsername(search.value, 0, 3)
  const quizResult: QuizPreviewDTO[] = await SearchService.searchQuizzesByName(search.value, 0, 3)

  console.log(quizResult)

  /*
    preview.value = publicUserResult.map(user => ({
    link: `/user/${user.username}`,
    label: user.username,
    authNeeded: false,
    icon: "person"
  }));
   */



  preview.value = quizResult.map(quizPreview => ({
    link: ``,
    label: quizPreview.title,
    authNeeded: false,
    icon: "help_center"
  }));

}
</script>


<template>
  <div class="search-bar">
    <span class="material-icons" title="search">
      search
    </span>

    <input type="text"
           :placeholder="'Search'"
           @keydown.capture="searchInteract"
           @keydown.enter=""
           v-model="search"/>

    <DropDown v-if="preview && !errorMessage">
      <RouterLinkBar :links="preview"></RouterLinkBar>
    </DropDown>
  </div>
</template>

<style scoped>

h3 {
  text-align: center;
}


.search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
  margin: 10px;
  background: white;
  border: 1px solid black;


  span, input {
    background: inherit;
    outline: none;
    height: auto;
    display: flex;
    align-items: center;
  }

  input {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    border: none;
  }

  span {
    flex-grow: 1;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
}


</style>