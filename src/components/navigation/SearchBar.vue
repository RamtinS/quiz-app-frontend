<script setup lang="ts">
import {ref, watch} from "vue";
import { UserService } from "@/services/UserService";
import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";
import type {QuizPreviewDTO} from "@/models/quiz/QuizPreviewDTO";
import router from "@/router";
import {QuizService} from "@/services/QuizService";

const searchField = ref<string>('')
let searchQuery = ref<{ link: string; label: string; authNeeded: boolean; icon: string; }[]>([]);
let hideDropDown;

async function searchInteract() {
  const publicUserResult: PublicUserInformationDTO[] = await UserService.searchUserByUsername(searchField.value, 0, 3);

  searchQuery.value = publicUserResult.map(user => ({
    link: `/user/${user.username}`,
    label: user.username,
    authNeeded: false,
    icon: "person"
  }));
}

watch(searchField, () => {
  searchInteract();
  hideDropDown = searchField.value.length !== 0;
})

function onSearchEnter() {
  router.push("/search-query")
}

</script>

<template>
  <div class="search-bar">
    <span class="material-icons" title="search">
      search
    </span>

    <input type="search"
           :placeholder="'Search'"
           @keydown.enter="onSearchEnter"
           v-model="searchField"/>

    <div class="dropdown-container">
      <DropDown v-if="searchQuery && hideDropDown">
        <RouterLinkBar :links="searchQuery"></RouterLinkBar>
      </DropDown>
    </div>

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