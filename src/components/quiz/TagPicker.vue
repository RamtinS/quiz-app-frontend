<script setup lang="ts">

import type {TagDTO} from "@/models/quiz/TagDTO";
import {ref} from "vue";
import DropDown from "@/components/navigation/DropDown.vue";
import TagPicker from "@/components/quiz/TagPicker.vue";
import {TagService} from "@/services/TagService";

const emit = defineEmits(['submit-tags']);

const possibleTags = ref<TagDTO[]>([])
const selectedTags = ref<TagDTO[]>([])
const showDropDown = ref(false)

const currentPage = ref(0)
const pageSize = 10


const props = defineProps({
  preSelectedTags: {type: Array as () => TagDTO[], required: false}
})

const errorMessage = ref('')

fetchPossibleTags(currentPage.value)


async function fetchPossibleTags(page: number) {
  try {
    possibleTags.value = await TagService.getTagsPaginated(page, 5)
  } catch (err) {
    errorMessage.value = "Could not fetch tags";
  }
}

function nextPage() {
  currentPage.value++
  fetchPossibleTags(currentPage.value)
}

function previousPage() {
  if (currentPage.value === 0) return
  currentPage.value--
  fetchPossibleTags(currentPage.value)
}



function submitTags() {
  showDropDown.value = false
  emit('submit-tags', selectedTags.value)
}

function toggleDropdown() {
  showDropDown.value = !showDropDown.value
}

</script>

<template>
  <div v-if="errorMessage">
    {{errorMessage}}
  </div>
  <div v-else
       class="tag-picker">
    <button @click="toggleDropdown">
      Select tags
    </button>
    <DropDown v-if="showDropDown"
              :center="true"
    >
      <div class="dropdown-content">
        <h3>Tags</h3>
        <input type="text" placeholder="Search for tags">

        <div
            v-for="tag in possibleTags"
             :key="tag.description"
             class="dropdown-item"
        >
          <input type="checkbox" v-model="selectedTags" :value="tag">
          <label>{{ tag.description }}</label>
        </div>
        <div v-if="possibleTags.length === 0">
          You have reached the end
        </div>

      </div>
      <div>
        <button class="save-button" @click="submitTags">Save</button>
      </div>
      <div class="page-picker">
        <button @click="previousPage">Previous</button>
        <p>Page {{currentPage + 1}}</p>
        <button @click="nextPage">Next</button>
      </div>

    </DropDown>

  </div>
  <div id="debug" v-show="false">
    Selected: {{ selectedTags }}
  </div>

</template>

<style scoped>

.tag-picker {
  display: flex;
  flex-direction: column;
  position: relative;
  background: grey;
  width: 50%;
  max-width: 400px;

  margin-left: auto;
  margin-right: auto;
}

h3 {
  margin: 0;
  text-align: center;
}

.dropdown-content {
  background: lightgrey;
  max-height: 300px;
  max-width: 300px;
  width: 300px;
  overflow-y: scroll;
  white-space: nowrap;
  overflow-x: hidden;

}

.save-button {
  min-width: 300px;
  max-width: 300px;
  min-height: 50px;
}

.page-picker{
  display: flex;
  justify-content: space-between;
  background-color: lightgrey;
  p{
    background-color: lightgrey;
  }
}


</style>