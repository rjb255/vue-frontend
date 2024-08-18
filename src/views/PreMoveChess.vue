<template>
  <div class="wrapper">
    <h1>PreMove Chess</h1>
    <p>
      The idea of this game is you do not know what your opponent's move is before you play. When
      your opponent has made a move, your "premove" will go as far as legally possible (including
      taking if permitted). The game ends when you capture your opponent's king.
    </p>
    <svg viewBox="0 0 100 100">
      <rect
        v-for="i in Array.from({ length: 64 }, (_, i) => i)"
        :key="i"
        height="12.5"
        width="12.5"
        :x="(i % 8) * 12.5"
        :y="Math.floor(i / 8) * 12.5"
        :class="{ dark: (i + Math.floor(i / 8)) % 2, light: !((i + Math.floor(i / 8)) % 2) }"
      />
    </svg>
  </div>
</template>
<style scoped>
svg {
  width: 60vw;
  height: 60vw;
}
.light {
  fill: yellow;
}
.dark {
  fill: black;
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}
</style>
