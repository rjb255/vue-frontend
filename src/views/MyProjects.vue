<script setup lang="ts">
import ProjectInfoComponent from "@/components/ProjectInfoComponent.vue";
import ProjectCentrolCoverPic from "@/assets/pictures/project-covers/project-centrol.png";
</script>

<template>
  <div class="projects">
    <ProjectInfoComponent
      :project="{
        name: 'Project Centrol',
        description: 'Making my own computer',
        img: ProjectCentrolCoverPic,
        route: { name: 'project-centrol' },
      }"
    />
  </div>
</template>

<style scoped>
.projects {
  display: flex;
  justify-content: center;
}
</style>
