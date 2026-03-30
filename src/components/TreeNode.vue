<template>
  <g v-if="level < maxLevel" viewBox="0 0 100 100" class="parent-node">
    <line
      vector-effect="non-scaling-stroke"
      :stroke-width="2 * Math.exp(-(level - 1) / 5)"
      :style="`animation-delay:${0.5 + level / 4}s;`"
      transform-origin="50 100"
      x1="50"
      x2="50"
      y1="0"
      y2="100"
      :stroke="
        level < 7
          ? `hsl(${woodColour[0]}, ${woodColour[1]}%, ${woodColour[2]}%)`
          : `hsl(${leafColour[0]}, ${leafColour[1]}%, ${leafColour[2]}%)`
      "
    ></line>
    <TreeNode
      ref="node1"
      :level="level + 1"
      :maxLevel="maxLevel"
      :bias="bias"
      :style="{
        transform: `${matrix1}`,
      }"
      class="child-node"
    ></TreeNode>
    <TreeNode
      ref="node2"
      :level="level + 1"
      :maxLevel="maxLevel"
      :bias="bias"
      :style="{
        transform: `${matrix2}`,
      }"
      class="child-node"
    ></TreeNode>
  </g>
</template>

<script setup lang="ts">
import { leafColour, woodColour } from "@/utilities/mainSvgColours";
import { useTemplateRef } from "vue";

const node1 = useTemplateRef("node1");
const node2 = useTemplateRef("node2");

const { level, maxLevel, bias } = defineProps<{ level: number; maxLevel: number; bias: number }>();

const alpha1 = 40 + 20 * (Math.random() - 0.5);
const alpha2 = -40 - 20 * (Math.random() - 0.5);
const matrix1 = new DOMMatrix();
matrix1.translateSelf(0, -100).scaleSelf(0.8).rotateSelf(alpha1);
const matrix2 = new DOMMatrix();
matrix2.translateSelf(0, -100).scaleSelf(0.8).rotateSelf(alpha2);

const targets = [0, 0];

const trueX = [0, 0];
const x = [0, 0];
const v = [0, 0];
const a = [0, 0];

let startingTime: number | undefined;
let t: number;
let dt = 0;

const springConstant = 3;
const viscousDamping = 0.8 / (level + 1);
const m = 5 * 0.8 ** level;

function rotateTreeNode() {
  targets[0] = (Math.random() - 0.5 + bias) * 5;
  targets[1] = (Math.random() - 0.5 + bias) * 5;
  x[0] = trueX[0] - targets[0];
  x[1] = trueX[1] - targets[1];
}

function animate(timestamp: number) {
  if (!startingTime) {
    startingTime = timestamp / 1000;
    t = startingTime;
    rotateTreeNode();
    return requestAnimationFrame(animate);
  }
  if (t - startingTime > 10) {
    startingTime = timestamp / 1000;
    rotateTreeNode();
  }
  dt = Math.min(timestamp / 1000 - t, 0.5);
  t = timestamp / 1000;

  for (let i = 0; i <= 1; i++) {
    a[i] = (-springConstant * x[i] - viscousDamping * v[i]) / m;
    v[i] = Math.min(100, a[i] * dt + v[i]);
    x[i] = Math.min(360, x[i] + v[i] * dt);
    trueX[i] = targets[i] + x[i];
  }

  if (node1.value?.$el.style) {
    node1.value.$el.style.transform = `${matrix1} rotate(${trueX[0]}deg)`;
  }
  if (node2.value?.$el.style) {
    node2.value.$el.style.transform = `${matrix2} rotate(${trueX[1]}deg)`;
  }
  if (!document.hidden) requestAnimationFrame(animate);
  else startingTime = undefined;
}

if (Math.random() > 1 / (12 - level)) {
  requestAnimationFrame(animate);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      requestAnimationFrame(animate);
    }
  });
}
</script>

<style lang="css" scoped>
.parent-node {
  transform-origin: 50px 100px;
}

line {
  transform: scale(0, 0);
  animation: scale-grow 0.25s linear forwards;
}
@keyframes scale-grow {
  to {
    transform: scale(1, 1);
  }
}
</style>
