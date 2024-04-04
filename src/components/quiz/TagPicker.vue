<script setup lang="ts">

import type {TagDTO} from "@/models/quiz/TagDTO";
import {ref} from "vue";
import DropDown from "@/components/navigation/DropDown.vue";

const emit = defineEmits(['submit-tags']);

const possibleTags = ref<TagDTO[]>([])
const selectedTags = ref<TagDTO[]>([])
const showDropDown = ref(false)


const props = defineProps({
  preSelectedTags: {type: Array as () => TagDTO[], required: true}
})


fetchPossibleTags()

function fetchPossibleTags() {

  for (let i = 0; i < 100; i++) {
    possibleTags.value.push({type: "TagDTO", description: "tag: " + i})
  }

  //todo fetch tags from server
}

function searchForTags() {
  //todo search for tags
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
  <div class="tag-picker">
    <button @click="toggleDropdown">
      Select tags
    </button>
    <DropDown v-if="showDropDown">
      <div class="dropdown-content">
        <h3>Tags</h3>
        <input type="text" placeholder="Search for tags">

        <div v-for="tag in possibleTags"
             :key="tag.description"
             class="dropdown-item"
        >
          <input type="checkbox" v-model="selectedTags" :value="tag">
          <label>{{ tag.description }}</label>
        </div>

      </div>
      <div >
        <button class="save-button" @click="submitTags">Save</button>
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
  width: 300px;
  max-width: 300px;

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


</style>