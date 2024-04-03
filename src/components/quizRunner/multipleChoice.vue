<script setup lang="ts">

</script>

<template>
  <div class="multiple-choice">
    <input type="button" value="a">
    <input type="button" value="b">
    <input type="button" value="c">
    <input type= "button" value="d">
  </div>
</template>
<style scoped>

.multiple-choice {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

input {
  margin: 4px;
  border-radius: 10px;
}

</style>