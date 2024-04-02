<script setup lang="ts">

</script>

<template>
  <div class="flex">
    <input class="true-box" type="button" value="True">
    <input class="false-box" type="button" value="False">
  </div>
</template>
<style scoped>


.true-box {
  background: #195b00;
}

.true-box:hover {
  background: #0e3101;
}

.false-box {
  background: #a10101;
}

.false-box:hover {
  background: #5d0000;
}

.flex {
  display: flex;
  flex-direction: row;
  gap: 20px;
}


input[type=button] {
  font-weight: bold;
  width: 100%;
  height: 100%;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
}


</style>