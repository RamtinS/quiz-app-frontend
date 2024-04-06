<script setup lang="ts">

const props = defineProps(
    {
      left: {
        type: Boolean,
        required: false,
        default: false
      },
      center: {
        type: Boolean,
        required: false,
        default: false
      }
    })

</script>

<template>

  <div
      class="dropdown"
      :class="center ? 'center' : (left ? 'left' : 'right')">    <slot>
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

.center{
  left: 50%;
  transform: translateX(-50%);
}

</style>