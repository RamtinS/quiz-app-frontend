<script setup lang="ts">

import {ref} from "vue";
import type {QuizSettings} from "@/models/quiz/QuizSettings";
import type {TagDTO} from "@/models/quiz/TagDTO";
import CategoryPicker from "@/components/quiz/CategoryPicker.vue";


const emits = defineEmits(['close-modal', 'submit-settings-from-modal'])

/**
 * The preExistingSettings prop is used to prepopulate the settings modal with the current settings
 */
const props = defineProps(
    {
      preExistingSettings: {type: Object as () => QuizSettings, required: true},
    }
)


const title = ref(props.preExistingSettings.title)
const description = ref(props.preExistingSettings.description)
const open = ref(props.preExistingSettings.open)
const selectedTags = ref<TagDTO[]>(props.preExistingSettings?.tags ?? [])
const selectedCategory = ref(props.preExistingSettings.categoryDescription)
const currentTag = ref('')

/**
 * Close the modal
 */
function closeModal() {
  emits('close-modal')
}

/**
 * Emit the settings to the parent component
 */
function submitSettings() {
  const settings: QuizSettings = {
    title: title.value,
    description: description.value,
    open: open.value,
    tags: selectedTags.value,
    categoryDescription: selectedCategory.value
  }
  emits('submit-settings-from-modal', settings)
}

/**
 * Handle the category selected from the category picker
 * @param category
 */
function handleCategoryFromCategoryPicker(category: string) {
  selectedCategory.value = category
}

/**
 * Add a tag to the selected tags
 * @param tagValue
 */
function addTag(tagValue: string) {
  if (tagValue === '') return
  const tag: TagDTO = {
    description: tagValue
  }
  selectedTags.value.push(tag)

}


</script>

<template>
  <div id="new-question-modal" class="modal" @click="closeModal">
    <div id="modal-content"
         class="modal-content"
         @click.stop
    >
      <h1>
        Quiz settings
      </h1>
      <div class="modal-item">
        <label>
          Title
        </label>
        <input type="text"
               v-model="title"
               placeholder="Enter a title for the quiz (required)"
        >
      </div>
      <div class="modal-item">
        <label>
          Description
        </label>
        <textarea
            v-model="description"
            placeholder="Enter a description of the quiz (optional)"
        >
        </textarea>
      </div>
      <div class="modal-item">
        <label>
          Make quiz public?
        </label>
        <div class="public-chooser">
          <input type="radio"
                 id="public-yes"
                 :value="true"
                 v-model="open"
          >
          <label for="public-yes">
            Yes
          </label>
          <input type="radio"
                 id="public-no"
                 :value="false"
                 v-model="open"
          >
          <label for="public-no">
            No
          </label>
        </div>
      </div>
      <div class="modal-item tag-picker"
      >
        <p>Tags:</p>
        <div class="tag-container"
        >
          <div v-for="tag in selectedTags"
               class="tag"
          >
            {{ tag.description }}
          </div>
        </div>
        <input
            type="text"
            placeholder="Enter a tag"
            v-model="currentTag"
        >
        <button @click="addTag(currentTag)">
          Add tag
        </button>
      </div>
      <div class="modal-item">
        <CategoryPicker
            @submit-category="handleCategoryFromCategoryPicker"
            :pre-selected-category="props.preExistingSettings?.categoryDescription"
        >
        </CategoryPicker>
      </div>
      <button @click="submitSettings" class="submit-button">
        Update settings
      </button>
    </div>
  </div>
</template>

<style scoped>

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}


.modal-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  margin-top: 10%;
  margin-left: 25%;
  width: 50%;
  height: 75%;
  overflow-y: scroll;
  min-height: 450px;
  min-width: 500px;
  z-index: 2;
  position: relative;
}

@media (max-width: 900px) {
  .modal-content {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    min-width: 300px;

  }
}

h1 {
  text-align: center;
}

.modal-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;
  width: 50%;

  textarea {
    height: 100px;
  }
}

.tag-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid black;
  padding: 10px;
}

.tag-container {
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100px;
  min-height: 100px;

}

.tag{
  background-color: lightgrey;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
}

.public-chooser {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.submit-button {
  display: block;
  margin-bottom: 20px;

}

</style>

