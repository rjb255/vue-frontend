<template>
  <svg viewBox="0 0 100 100">
    <circle
      v-for="[index, colour] of colours.entries()"
      :key="index"
      cx="50"
      cy="50"
      :r="25 + (colours.length - index - 1) * 10"
      :fill="`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`"
    />
  </svg>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const { colours } = defineProps({
  colours: { type: Array as PropType<number[][]>, required: true },
});
</script>

<style scoped>
svg {
  height: 100%;
  width: 100%;
  background-color: v-bind("`hsl(${colours[0][0]}, ${colours[0][1]}%, ${colours[0][2]}%)`");
}

svg circle {
  filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 0.4)) drop-shadow(-2px -2px 1px rgb(0 0 0 / 0.4));
}
</style>
