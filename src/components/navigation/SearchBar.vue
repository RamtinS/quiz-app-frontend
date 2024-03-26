<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits(['SearchClicked'])

const search = ref<string>('')

const props = defineProps({
      compressed: {type: Boolean, required: true}
    }
)

function emitSearchClicked() {
  alert("search clicked: " + search.value);
  emitMessage(search.value)
}

function emitMessage(message: string) {
  emit('SearchClicked', message);
}

</script>


<template>
  <div id="search-bar" :class="compressed ? 'compressed' : 'notCompressed'">
    <span class="material-icons" title="search">search</span>
    <input type="text"
           placeholder="Search"
           @keydown.enter="emitSearchClicked"
           v-model="search"
    />
  </div>

</template>

<style scoped>

.compressed {
  input{
    display: none;

  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  height: 40px;
}

.notCompressed {

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  margin: 2px;
  color: black;
  background: white;


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