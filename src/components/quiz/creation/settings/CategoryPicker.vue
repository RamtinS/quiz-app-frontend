<script setup lang="ts">

import {ref} from "vue";
import {CategoryService} from "@/services/CategoryService";



/**
 * The preSelectedCategory prop is used to preselect a category when the component is loaded
 */
const props = defineProps({
  preSelectedCategory: {type: String, required: false}
})

const emit = defineEmits(['submit-category']);

const possibleCategories = ref<String[]>([])
const selectedCategory = ref<String>(props.preSelectedCategory ?? '');
const showDropDown = ref(false)
const currentPage = ref(0)
const pageSize = 5


const errorMessage = ref('')

fetchPossibleCategories(currentPage.value)


async function fetchPossibleCategories(page: number) {
  try {
    const categories = await CategoryService.getCategoriesPaginated(page, pageSize);
    possibleCategories.value.push(...categories);
  } catch (err) {
    errorMessage.value = "Could not fetch categories";
  }
}

async function nextPage() {
  const currentLength = possibleCategories.value.length
  currentPage.value++
  await fetchPossibleCategories(currentPage.value)
  if (currentLength === possibleCategories.value.length) {
    errorMessage.value = "No more categories available"
  }
}


function submitCategory() {
  showDropDown.value = false
  emit('submit-category', selectedCategory.value)
}

function toggleDropdown() {
  showDropDown.value = !showDropDown.value
}

</script>

<template>
  <div >
    {{ errorMessage }}
  </div>
  <div
       class="category-picker">
    <button @click="toggleDropdown">
      Select categories
    </button>
    <div v-if="showDropDown"
         class="dropdown">
      <div class="dropdown-content">
        <h3>Category</h3>
        <div
            v-for="(category, index) in possibleCategories"
            :key="index"
            class="dropdown-item"
        >
          <input type="radio" v-model="selectedCategory" :value="category">
          <label>{{ category }}</label>
        </div>
        <div v-if="possibleCategories.length === 0">
          You have reached the end
        </div>
      </div>
      <div>
        <button @click="nextPage">
          Load more categories
        </button>
      </div>
      <div>
        <button class="save-button" @click="submitCategory">Save</button>
      </div>

    </div>
  </div>
  <div id="debug" v-show="false">
    Selected: {{ selectedCategory }}
  </div>

</template>

<style scoped>

.category-picker {

  display: flex;
  flex-direction: column;
  position: relative;
  background: grey;
  max-width: 400px;
  max-height: 200px;

  margin-left: auto;
  margin-right: auto;
}

h3 {
  margin: 0;
  text-align: center;
}

.dropdown {
  max-width: 400px;
}

.dropdown-content {
  background: lightgrey;
  max-height: 100px;
  max-width: 300px;
  width: 300px;
  overflow-y: scroll;
  white-space: nowrap;
  overflow-x: hidden;
  border: 1px solid black;
}

.save-button {
  min-width: 300px;
  max-width: 300px;
  min-height: 50px;
  border-radius: 0;
}


</style>