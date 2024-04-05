<script setup lang="ts">
import {ref} from "vue";
import {UserService} from "@/services/UserService";
import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import DropDown from "@/components/navigation/DropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";


const search = ref<string>('')
const searchShake = ref(false);
const errorMessage = ref("")

const previews = ref<{ link: string; label: string; authNeeded: boolean; icon: string; }[]>([]);

async function searchClicked() {
  removeError()
  try {
    if (search.value === "") {
      triggerError("Please enter something")
      return
    }

    const result: PublicUserInformationDTO[] = await UserService.searchUserByUsername(search.value, 0, 10)


    previews.value = result.map(user => ({
      link: `/user/${user.username}`,
      label: user.username,
      authNeeded: false,
      icon: "person"
    }));



    if (result.length === 0) {
      triggerError("No results found")
    }

  } catch (err) {
    triggerError("Could not connect to server")
    console.error("error while searching: " + err)
  }
}

function triggerError(message: string) {
  errorMessage.value = message;
  searchShake.value = true
  setTimeout(() => {
    searchShake.value = false
  }, 1000)
  return;
}

function removeError() {
  errorMessage.value = ""
}

function clearSearch() {
  search.value = ""
  previews.value = []
}

</script>


<template>

  <div id="search-bar"
       :class="[
        (errorMessage) ? 'error' : 'noError',
         searchShake ? 'shake' : '']"
  >
    <span class="material-icons"
          title="search">search</span>
    <input type="text"
           :placeholder="errorMessage ? errorMessage : 'Search'"
           @keydown.enter="searchClicked"
           v-model="search"

    />
    <DropDown v-if="previews && !errorMessage">
      <RouterLinkBar :links="previews"></RouterLinkBar>
    </DropDown>
    <DropDown v-else-if="errorMessage && (search.length !== 0)">
      <div id="errorMessage">
        {{ errorMessage }}
      </div>
    </DropDown>
  </div>


</template>

<style scoped>

h3 {
  text-align: center;
}


.error {
  border: 1px solid red !important;

  input::placeholder {
    color: red;
  }
}


#search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
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
    flex-grow: 1;
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