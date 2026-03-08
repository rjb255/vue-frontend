<template>
  <RouterLink :to="project.route">
    <div class="project-card">
      <img :src="project.img" class="project-thumb" />
      <div class="project-content">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { woodColour } from "@/utilities/mainSvgColours";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const woodColourCss = computed(
  () => `hsl(${woodColour.value[0]},${woodColour.value[1]}%,${woodColour.value[2]}%)`,
);
</script>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  border: solid 1px v-bind(woodColourCss);
  border-radius: 12px;
  padding: 1rem;
  gap: 1rem;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  align-items: center;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px v-bind(woodColourCss);
}

.project-thumb {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
</style>
