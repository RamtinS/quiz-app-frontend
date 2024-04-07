<script setup lang="ts">
/**
 * A dropdown that can be placed on the left, right or center of the screen
 * The default position is right
 */
defineProps({
  left: {
    type: Boolean,
    required: false,
    default: false,
  },
  center: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <div class="dropdown" :class="center ? 'center' : left ? 'left' : 'right'">
    <slot> </slot>
  </div>
</template>

<style scoped>
.dropdown {
  position: fixed;
  top: 60px;
}

@media (max-width: 800px) {
  .dropdown {
    width: 100%;
    top: 50px;
  }
}

.left {
  left: 5px;
}

.right {
  right: 5px;
}

.center {
  left: 50%;
  top: 40px;
  width: 25vw;
  transform: translateX(-50%);
}
</style>
