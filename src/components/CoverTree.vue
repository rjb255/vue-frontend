<template>
  <div class="flex">
    <svg id="tree" viewBox="0 0 100 100" overflow="visible" vector-effect="non-scaling-stroke">
      <TreeNode transform="scale(0.3)" :bias="bias" :level="0" :maxLevel="8"></TreeNode>
    </svg>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref, computed } from "vue";
// import { woodColour, leafColour } from "@/utilities/mainSvgColours";
import TreeNode from "@/components/TreeNode.vue";
import { ref } from "vue";

const bias = ref<number>(0);

function getBias(timestamp: number) {
  const omega = (2 * Math.PI) / 200;
  bias.value = Math.sin((omega * timestamp) / 1000) / 1.5;
  if (!document.hidden) requestAnimationFrame(getBias);
}
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    requestAnimationFrame(getBias);
  }
});
</script>

<style scoped>
#tree {
  width: min(80vh, 90vw);
  height: min(80vh, 90vw);
  z-index: 1;
}

.flex {
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: flex-end;
}
</style>
