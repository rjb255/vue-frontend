<template>
  <div class="wrapper">
    <div id="landscape">
      <ConcentricCircles
        id="concentric-circles"
        :colours="circleColours"
        :sunColours="sunCircleColours"
        :moonColours="moonCircleColours"
      />
      <CoverTree />
    </div>
    <div>
      <header>
        <div id="ground">
          <svg
            id="roots"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            vector-effect="non-scaling-stroke"
          >
            <path
              v-for="[index, path] in roots.entries()"
              :key="index"
              :d="path"
              stroke-linecap="round"
              stroke-width="2"
              fill="none"
              vector-effect="non-scaling-stroke"
              :stroke="`hsl(${woodColour[0]}, ${woodColour[1]}%, ${woodColour[2]}%)`"
            />
          </svg>
        </div>
        <nav class="nav-links">
          <RouterLink
            class="button"
            v-for="link of links"
            :to="{ name: link.name }"
            :key="link.text"
            >{{ link.text }}</RouterLink
          >
        </nav>
      </header>
    </div>
    <div class="body">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import ConcentricCircles from "./components/ConcentricCircles.vue";
import FooterComponent from "./components/FooterComponent.vue";
import CoverTree from "./components/CoverTree.vue";
import {
  woodColour,
  moonCircleColours,
  sunCircleColours,
  circleColours,
  groundColour,
  startColourChangingInterval,
} from "@/utilities/mainSvgColours";

const route = useRoute();

let colourChangingInterval: ReturnType<typeof setInterval>;
onMounted(() => {
  colourChangingInterval = startColourChangingInterval();
});

onUnmounted(() => {
  clearInterval(colourChangingInterval);
});

const links = [
  { text: "Home", name: "home" },
  { text: "Albums", name: "albums" },
  // { text: "Projects", name: "projects" },
];

const roots = links.map((_, index) => {
  const endX = (100 / links.length) * (index + 0.5);
  return "M 50 0 C 50 100 " + endX + " -60 " + endX + " 80";
});

const woodColourCss = computed(
  () => `hsl(${woodColour.value[0]},${woodColour.value[1]}%,${woodColour.value[2]}%)`,
);
const groundColourCss = computed(
  () => `hsl(${groundColour.value[0]},${groundColour.value[1]}%,${groundColour.value[2]}%)`,
);
</script>

<style>
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
nav .button:link,
a {
  text-decoration: none;
}

nav .button:visited,
a {
  text-decoration: none;
}

nav .button:hover,
a {
  text-decoration: none;
}

nav .button:active,
a {
  text-decoration: none;
}

nav .button {
  text-align: center;
  border: none;
  border-top: solid v-bind(woodColourCss);
  width: 100%;
  padding: 10px 0;
  background-color: rgba(0, 0, 46, 0);
  color: v-bind(woodColourCss);
  cursor: pointer;

  position: relative;
  /* padding: 1.4rem 4.2rem; */
  /* padding-right: 3.1rem; */
  letter-spacing: 1.1rem;
  text-transform: uppercase;
  transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);
  cursor: pointer;
  user-select: none;
}

nav .button:after {
  content: "";
  position: absolute;
  transition: inherit;
  z-index: -1;
}

nav .button:hover {
  color: v-bind(groundColourCss);
  transition-delay: 0.25s;
}

nav .button.router-link-active {
  background-color: v-bind(woodColourCss);
  color: v-bind(groundColourCss);
}

nav .button:hover:after {
  background: v-bind(woodColourCss);
  transition-delay: 0s;
}

/* From Top */

nav .button:after {
  left: 0;
  height: 0;
  width: 100%;
}

nav .button:after {
  top: 0;
  height: 0;
}

nav .button:hover:after,
.router-link-active:after {
  height: 100%;
}

nav {
  position: sticky;
}

.wrapper {
  position: relative;
}

#landscape {
  height: 80vh;
  width: 100%;
  background-color: lightblue;
}

#ground,
#roots {
  height: 10vh;
}
.body {
  position: absolute;
  padding-bottom: 20px;
}

nav {
  width: 100%;
}

.body,
#ground,
nav {
  background-color: hsl(v-bind("`${groundColour[0]},${groundColour[1]}%,${groundColour[2]}%`"));
  transition:
    background-color 300ms ease,
    color 300ms ease;
  color: hsl(v-bind("`${woodColour[0]},${woodColour[1]}%,${woodColour[2]}%`"));
  z-index: 3;
}
.body {
  width: 100%;
  position: relative;
}
#ground {
  width: 100%;
}
.nav-links {
  display: flex;
  gap: 10%;
  width: 100%;
  justify-content: space-around;
  top: 90vh;
  padding: 0 5%;
  padding-bottom: 3rem;
}

@media only screen and (max-width: 1200px) {
  .nav-links {
    flex-direction: column;
  }
  .nav-links > .button {
    height: 3rem;
    text-align: center;
  }
}

#concentric-circles {
  position: fixed;
  z-index: 0;
}

#roots {
  width: 100%;
}

#roots svg path {
  transition: stroke 300ms ease;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
