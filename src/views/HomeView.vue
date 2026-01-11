<script setup lang="ts"></script>

<template>
  <main class="flex-column">
    <div class="flex-column">
      <h1>Welcome</h1>
      <p>
        I am <b>Chemical Engineering graduate from the University of Cambridge</b>. My journey began
        in my first year at Cambridge, where I matricualated as a Natural Science student. After
        completing first year, and completing an internship with
        <a href="https://immaterial.com/">Immaterial</a>, I decided I was more suited for Chemical
        Engineering. A world revolving around maths, chemistry, and physics. I achieved a 2.1 in
        both my BA and MEng in Chemical Engineering.
      </p>
      <br />
      <h2>Circus</h2>
      <p>
        After completing my degree, I spent a summer touring with
        <a href="http://www.circusferrel.com">Circus Ferrel</a>. I performed in a variety of
        performances, ranging from Spanish Web to Chinese Pole, and even had a duo trapeze act. All
        of this after starting aerial acrobatics 6 months prior.
      </p>
      <h2>TidalSense</h2>
      <p>
        Since leaving the Circus, I have been working as a software engineer for
        <a href="https://tidalsense.com">TidalSense</a>; a company revolutionising respiratory
        health care. I have experienced the process of taking two medical devices from conception to
        market and been instrumental in the journey.
      </p>
      <h2>Project Centrol</h2>
      <p>
        A side project of mine is making my own immersion cooled PC. This will allow me to challenge
        myself with the core components of Chemical Engineering, as well as being a fun prject. It
        will feature a floating copy of my brain to complete the aesthetic.
      </p>
      <h2>Skating</h2>
      <p>
        Outside of work, I spend a lot of my time training figure skating. A sport I started in
        2023, and started competing in 2025.
      </p>
    </div>
  </main>
</template>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
main {
  /* margin: 2rem; */
  width: 100%;
}
main > div {
  width: min(100%, 1200px);
  text-align: center;
}
h2 {
  padding-top: 1rem;
}
</style>
