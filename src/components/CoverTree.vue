<template>
  <!-- <canvas id="tree" ref="tree" width="100" height="100"> </canvas> -->
  <div class="flex">
    <svg id="tree" viewBox="0 0 100 100" overflow="visible" vector-effect="non-scaling-stroke">
      <!-- <circle -->
      <!--   v-for="[index, point] of points.points.entries()" -->
      <!--   :key="index" -->
      <!--   :cx="point.x + 50" -->
      <!--   :cy="100 - point.y" -->
      <!--   r="1" -->
      <!--   :class="`L${point.level}`" -->
      <!-- /> -->
      <line
        v-for="[index, edge] of points.edges.entries()"
        :key="index"
        :x1="edge[0].x + 50"
        :x2="edge[1].x + 50"
        :y1="100 - edge[0].y"
        :y2="100 - edge[1].y"
        length="0"
        vector-effect="non-scaling-stroke"
        :transform-origin="`${edge[0].x + 50} ${100 - edge[0].y}`"
        :style="`animation-delay:${edge[0].level / 2}s;`"
        :stroke-width="2 * Math.exp(-(edge[0].level - 1) / 5)"
        :stroke="
          edge[0].level < 9
            ? `hsl(${woodColour[0]}, ${woodColour[1]}%, ${woodColour[2]}%)`
            : `hsl(${leafColour[0]}, ${leafColour[1]}%, ${leafColour[2]}%)`
        "
      ></line>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { Tree, tree } from "../utilities/treePoints";
import { woodColour, leafColour } from "@/utilities/mainSvgColours";

class Point {
  x: number;
  y: number;
  level: number;

  constructor(point: DOMPoint, level: number) {
    this.x = point.x;
    this.y = point.y;
    this.level = level;
  }
}

const treeRef = ref<Tree>();
const points = computed(() =>
  treeRef.value ? flattenTree(treeRef.value) : { points: [], edges: [] },
);

function flattenTree(tree: Tree): { points: Point[]; edges: Point[][] } {
  //   tree.setChildPoint(new DOMMatrix());
  const level = tree.level;
  console.log(level);
  console.log({ p1: tree.parent?.point, p2: tree.point });

  const edges = tree.parent
    ? [[new Point(tree.parent.point, level), new Point(tree.point, level)]]
    : [[new Point(new DOMPoint(0, 0), level), new Point(tree.point, level)]];

  if (!tree.branches) return { points: [new Point(tree.point, level)], edges };

  const children = tree.branches.map(flattenTree);
  console.log(children);
  return {
    points: [new Point(tree.point, level), ...children.map((v) => v.points).flat()],
    edges: [...edges, ...children.map((v) => v.edges).flat()],
  };
}

onMounted(() => {
  console.log(tree);
  treeRef.value = tree;
});
</script>

<style scoped>
#tree {
  width: min(80vh, 100vw);
  height: min(80vh, 100vw);
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
}
</style>
