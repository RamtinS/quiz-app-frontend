<script setup lang="ts">

const props = defineProps(
    {
      left: {
        type: Boolean,
        required: false,
        default: false
      },
    })

</script>

<template>

  <div
      class="dropdown"
      :class="[left ? 'left' : 'right']">
    <slot>
    </slot>
  </div>

</template>

<style scoped>

.dropdown {
  position: absolute;
  top: 100%;
  height: auto;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

</style>