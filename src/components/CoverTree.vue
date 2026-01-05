<template>
  <div class="flex">
    <svg id="tree" viewBox="0 0 100 100" overflow="visible" vector-effect="non-scaling-stroke">
      <TreeNode transform="scale(0.3)" :level="0" :maxLevel="10"></TreeNode>
    </svg>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref, computed } from "vue";
// import { woodColour, leafColour } from "@/utilities/mainSvgColours";
import TreeNode from "@/components/TreeNode.vue";
</script>

<style scoped>
#tree {
  width: min(80vh, 90vw);
  height: min(80vh, 90vw);
  z-index: 1;
}

svg line {
  transform: scale(0, 0);
  animation: scale-grow 0.5s linear forwards;
}
@keyframes scale-grow {
  to {
    transform: scale(1, 1);
  }
}

.flex {
  display: flex;
  width: 100%;
  height: 80vh;
  justify-content: center;
  align-items: flex-end;
}
</style>
