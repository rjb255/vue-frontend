<template>
  <!-- <canvas id="tree" ref="tree" width="100" height="100"> </canvas> -->
  <svg id="tree" viewBox="0 0 100 100" overflow="visible">
    <circle
      v-for="[index, point] of points.entries()"
      :key="index"
      :cx="point[0]"
      :cy="point[1]"
      r="1"
    />
  </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Tree, tree } from "../utilities/treePoints";
// const treeRef = ref<HTMLCanvasElement | null>(null);

const points = ref<number[][]>([]);

onMounted(() => {
  console.log(tree);
  points.value = passTree(tree).map((point) => [point.x + 50, 100 - point.y]);
  //   treeRef.value?.focus();
  //   if (!treeRef.value) return;
  //   tree.value;
  //   const graphics = tree.value.getContext("webgl2") || tree.value.getContext("webgl");
  //   if (!graphics) return;
  //   //   graphics.clearColor(0.0, 0.0, 0.0, 1.0);
  //   //   graphics.clear(graphics.COLOR_BUFFER_BIT);
});

function passTree(tree: Tree): DOMPoint[] {
  //   tree.setChildPoint(new DOMMatrix());
  console.log(tree.basePoint);
  if (!tree.branches) return [tree.basePoint];
  return [tree.basePoint, ...passTree(tree.branches[0]), ...passTree(tree.branches[1])];
}
</script>
