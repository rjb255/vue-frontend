<script setup lang="ts"></script>

<template>
  <main class="flex-column">
    <h1>Welcome</h1>
    <p>
      Welcome to the fourth (maybe fifth?) iteration of my website; this time using the NestJS
      framework. It is still under development, so several areas may not be functional at the
      moment.
    </p>
    <h2>Academic</h2>
    <p>
      I am a graduate of Cambridge University where I read Chemical Engineering, achieving a BA and
      an MEng. In my final year, I explored a variety of options, from Healthcare to Electrochemical
      Engineering.
    </p>
    <h2>Circus</h2>
    <p>
      Having started gymnastics while at university, I eventually got involved with aerial
      acrobatics. This passion continued throughout my final year, resulting in me touring with
      <a href="http://www.circusferrel.com/">Circus Ferrel</a> over the summer of 2022.
    </p>
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
</style>
