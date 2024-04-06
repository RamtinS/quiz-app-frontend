<script setup lang="ts">
import {ref} from "vue";
import {UserService} from "@/services/UserService";
import type {PublicUserInformationDTO} from "@/models/user/PublicUserInformationDTO";
import DropDown from "@/components/navigation/NavigationBarDropDown.vue";
import RouterLinkBar from "@/components/navigation/RouterLinkBar.vue";


const search = ref<string>('')
const searchShake = ref(false);
const errorMessage = ref("")

const previews = ref<{ link: string; label: string; authNeeded: boolean; icon: string; }[]>([]);

/**
 * Search for users based on the input in the search bar, the users are then displayed in a dropdown
 */
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

/**
 * Trigger an error message and shake the search bar
 * @param message
 */
function triggerError(message: string) {
  errorMessage.value = message;
  searchShake.value = true
  return;
}

/**
 * Remove the current error message
 */
function removeError() {
  errorMessage.value = ""
}

/**
 * Clear the search bar
 */
function clearSearch() {
  search.value = ""
  previews.value = []
}

</script>


<template>
  <div class="search-bar"
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
    <DropDown v-if="previews.length && !errorMessage" :center="true">
      <RouterLinkBar :links="previews"></RouterLinkBar>
    </DropDown>
    <DropDown v-else-if="errorMessage && (search.length !== 0)" :center="true">
      <div class="error-dropdown">
        <p class="error-message">
          {{ errorMessage }}
        </p>
      </div>
    </DropDown>
  </div>
</template>

<style scoped>

h3 {
  text-align: center;
}

.error-dropdown {
  color: red;
  background: white;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 10px;
  border: 1px solid black;
}

.error-message{
  margin: 0;
}


.error {
  border: 1px solid red !important;

  input::placeholder {
    color: red;
  }
}


.search-bar {
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