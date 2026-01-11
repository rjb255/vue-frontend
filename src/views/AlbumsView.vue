<template>
  <div class="flex">
    <div class="flex-column" v-for="[index, album] of Object.entries(albums)" :key="index">
      <a class="link" :href="album.albumSrc" target="_blank">
        <img class="cover" :src="album.imgSrc" />
        <p class="caption">{{ album.caption }}</p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircusFerrel2022 from "@/assets/pictures/album-covers/circus-ferrel-2022.png";
import Maac2023 from "@/assets/pictures/album-covers/maac-2023.png";
type Album = { imgSrc: string; albumSrc: string; caption: string };

const albums: Album[] = [
  {
    caption: "Circus Ferrel 2022",
    imgSrc: CircusFerrel2022,
    albumSrc: "https://photos.app.goo.gl/j1xoa9UL39BNZ1y59",
  },
  {
    caption: "Manchester Aerial and Acrobatic Convention 2023",
    albumSrc: "https://photos.app.goo.gl/3adaxCPyZujgEbzS8",
    imgSrc: Maac2023,
  },
];
</script>

<style scoped>
.flex {
  display: flex;
}
.flex-column {
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover {
  object-fit: cover;
  aspect-ratio: 1/1;
}
.link {
  height: 100%;
}

.link,
.cover,
.caption {
  width: min(100%, 400px);
  width: min(100%, 400px);
}
.caption {
  text-align: center;
}
</style>
