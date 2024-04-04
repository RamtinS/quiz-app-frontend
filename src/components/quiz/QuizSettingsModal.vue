<script setup lang="ts">

import {ref, watch} from "vue";
import type {QuizSettings} from "@/models/quiz/QuizSettings";
import TagPicker from "@/components/quiz/TagPicker.vue";
import type {TagDTO} from "@/models/quiz/TagDTO";


const emits = defineEmits(['close-modal', 'submit-settings-from-modal'])

const props = defineProps(
    {
      preExistingSettings: {type: Object as () => QuizSettings, required: true},
    }
)



const title = ref(props.preExistingSettings.title)
const description = ref(props.preExistingSettings.description)
const open = ref(props.preExistingSettings.open)
const selectedTags = ref(props.preExistingSettings.tags)

function closeModal() {
  emits('close-modal')
}

function submitSettings() {
  const settings: QuizSettings = {
    title: title.value,
    description: description.value,
    open: open.value,
    tags: selectedTags.value
  }
  emits('submit-settings-from-modal', settings)
}

function handleTagsFromTagPicker(tags: TagDTO[]) {
  selectedTags.value = tags
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
      <div class="modal-item">
        <TagPicker
            @submit-tags="handleTagsFromTagPicker"
            :pre-selected-tags="selectedTags"
        >

        </TagPicker>
      </div>
      <button @click="submitSettings" class="modal-item">
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
  height: 50%;
  min-height: 450px;
  min-width: 500px;
  z-index: 2;
  position: relative;
}

@media (max-width: 900px) {
  .modal-content {
    width: 100%;
    margin: 0;
  }
}

h1{
  text-align: center;
}

.modal-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;
  width: 50%;
  textarea{
    height: 100px;
  }
}


.public-chooser {
  display: flex;
  gap: 10px;
  justify-content: center;
}

</style>

