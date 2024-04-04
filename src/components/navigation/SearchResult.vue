<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(
    {
      search: String
    })

let searchKeyword = props.search;
const page = ref(1);

const names: string[] = ["Hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey", "hey"];
</script>

<template>
  <div class="flex-container">

    <div class="title-container">
      <h1>Search For:</h1>


    </div>

    <div class="grid-container">

      <router-link class="router-link" v-for="(value, index) in names" :key="index" :to="value.link">
        <div class="query-item">
          <h1>
            ASASDSD
          </h1>
        </div>

      </router-link>
    </div>

    <div class="query-navigation-container">
      <button>
        Previous
        <--
      </button>
      <p>Page: {{ page }} </p>
      <button>
        Next
        -->
      </button>
    </div>


  </div>

</template>

<style scoped>

.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}

.query-item {
  background-color: white;
  padding: 60px;
}

.query-navigation-container button {
  font-weight: bold;
  padding: 20px;
  background-color: purple;
  color: white;
  margin: 5%;
}

.query-navigation-container {
  display: flex;
  flex-direction: row;
}

/*
 Query for mobile screens.
*/
@media (max-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>