<script setup lang="ts">

import TrueFalse from "@/components/quizRunner/trueFalse.vue";
import MultipleChoice from "@/components/quizRunner/multipleChoice.vue";
</script>

<template>
  <div class="flex-2">
    <div class="grid">
      <h1>asda</h1>
      <h1>asda</h1>
      <div class="input-component">
        <multiple-choice></multiple-choice>
      </div>
  </div>

  </div>
  <div class="input-part">
  </div>

</template>

<style scoped>

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  height: 800px;
  width: 1000px;
  background: rgba(255, 255, 255, 0.93);
  box-shadow: 0 4px 4px -2px #000000;
}

.input-part {
  display: grid;
}

.input-component {
  background: red;
  grid-row: 4/5;
  grid-column: 1/3;
}

.flex-2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>