<script setup lang="ts">

</script>|

<template>
  <div class="grid-container">
    <input class="input-1" type="text">
    <button class="button-1">Submit</button>
  </div>
</template>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  height: 100px;
  margin: auto;
  max-width: 800px;
}

.input-1 {
  grid-column: 1/5;
  margin: 10px;
  border-radius: 10px;
  font-size: 30px;
}

.button-1 {
  margin: 10px;
  border-radius: 10px;
  background: #0e3101;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.button-1:hover {
  background-color: #0b1f01;
}


</style>