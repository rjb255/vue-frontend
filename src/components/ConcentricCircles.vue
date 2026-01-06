<template>
  <svg viewBox="0 0 100 100" overflow="visible">
    <g v-for="stellar of consecutiveNumbers" :key="stellar">
      <circle
        v-for="[index, colour] of moonColours.entries()"
        :key="index"
        :transform="`rotate(${fractionOfDay + stellar * 40})`"
        transform-origin="50 800"
        cx="50"
        cy="50"
        :r="25 + (moonColours.length - index - 1) * 10"
        :fill="`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`"
      />
      <circle
        v-for="[index, colour] of sunColours.entries()"
        :key="index"
        :transform="`rotate(${fractionOfDay + 20 + stellar * 40})`"
        transform-origin="50 800"
        cx="50"
        cy="50"
        :r="25 + (sunColours.length - index - 1) * 10"
        :fill="`hsl(${colour[0]}, ${colour[1]}%, ${colour[2]}%)`"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { SPEED_UP } from "@/config";

const consecutiveNumbers: number[] = Array<number>(3)
  .fill(0)
  .map((_, index) => index - 2);

const { moonColours, sunColours, colours } = defineProps({
  moonColours: { type: Array as PropType<number[][]>, required: true },
  sunColours: { type: Array as PropType<number[][]>, required: true },
  colours: { type: Array as PropType<number[][]>, required: true },
});

const fractionOfDay = ref(getFractionOfDay());

function getFractionOfDay() {
  const date = new Date();
  if (SPEED_UP) return (date.getSeconds() / 60) * 40;
  return ((date.getHours() + date.getMinutes() / 60) / 24) * 40;
}

setInterval(() => (fractionOfDay.value = getFractionOfDay()), SPEED_UP ? 100 : 1000 * 60);
</script>

<style scoped>
svg {
  height: 100%;
  width: 100%;
  background-color: v-bind("`hsl(${colours[0][0]}, ${colours[0][1]}%, ${colours[0][2]}%)`");
}

svg circle {
  filter: drop-shadow(2px 2px 1px rgb(0 0 0 / 0.4)) drop-shadow(-2px -2px 1px rgb(0 0 0 / 0.4));
  transition: fill 300ms ease;
}
</style>
