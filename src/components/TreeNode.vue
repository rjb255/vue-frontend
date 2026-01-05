<template>
  <g v-if="level < maxLevel" viewBox="0 0 100 100" class="parent-node">
    <line
      vector-effect="non-scaling-stroke"
      :stroke-width="2 * Math.exp(-(level - 1) / 5)"
      :style="`animation-delay:${level / 2}s;`"
      transform-origin="50 100"
      x1="50"
      x2="50"
      y1="0"
      y2="100"
      :stroke="
        level < 9
          ? `hsl(${woodColour[0]}, ${woodColour[1]}%, ${woodColour[2]}%)`
          : `hsl(${leafColour[0]}, ${leafColour[1]}%, ${leafColour[2]}%)`
      "
    ></line>
    <TreeNode
      ref="node1"
      :level="level + 1"
      :maxLevel="maxLevel"
      :transform="modifiedM1"
    ></TreeNode>
    <TreeNode
      ref="node2"
      :level="level + 1"
      :maxLevel="maxLevel"
      :transform="modifiedM2"
    ></TreeNode>
  </g>
</template>

<script setup lang="ts">
import { leafColour, woodColour } from "@/utilities/mainSvgColours";
import { computed, ref, useTemplateRef } from "vue";
const node1 = useTemplateRef("node1");
const node2 = useTemplateRef("node2");

const { level, maxLevel } = defineProps<{ level: number; maxLevel: number }>();
const alpha1 = 30 + 20 * Math.random();
const alpha2 = -30 - 20 * Math.random();
const matrix1 = new DOMMatrix();
matrix1.translateSelf(0, -100).scaleSelf(0.8).rotateSelf(alpha1);
const matrix2 = new DOMMatrix();
matrix2.translateSelf(0, -100).scaleSelf(0.8).rotateSelf(alpha2);

const dAlpha1 = ref(0);
const dAlpha2 = ref(0);
const modifiedM1 = computed(() => matrix1.rotate(dAlpha1.value));
const modifiedM2 = computed(() => matrix2.rotate(dAlpha2.value));
//
// function rotateTreeNode() {
//   const preD1 = modifiedM1.value;
//   const preD2 = modifiedM2.value;
//   dAlpha1.value = Math.random() * 20 - 10;
//   dAlpha2.value = Math.random() * 20 - 10;
//   if (!node1.value?.$el.animate || !node2.value?.$el.animate) return;
//   node1.value?.$el.animate([{ transform: preD1 }, { transform: modifiedM1.value }], {
//     duration: 1000,
//     iterations: 1,
//     easing: "ease-out",
//   });
//   node2.value?.$el.animate([{ transform: preD2 }, { transform: modifiedM2.value }], {
//     duration: 1000,
//     iterations: 1,
//     easing: "ease-out",
//   });
//   setTimeout(rotateTreeNode, 100);
// }
// setTimeout(rotateTreeNode, 6000);
</script>

<style lang="css" scoped>
.parent-node {
  transform-origin: 50px 100px;
  animation: sway 3s ease-in-out infinite alternate;
}

line {
  transform: scale(0, 0);
  animation: scale-grow 0.5s linear forwards;
}
@keyframes scale-grow {
  to {
    transform: scale(1, 1);
  }
}
</style>
