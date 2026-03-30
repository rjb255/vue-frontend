<script setup lang="ts">
import ProjectInfoComponent from "@/components/ProjectInfoComponent.vue";
import ProjectCentrolCoverPic from "@/assets/pictures/project-covers/project-centrol.png";
</script>
<template>
  <ProjectInfoComponent
    :project="{
      name: 'Initial Design',
      description: 'Initial Design Work',
      img: ProjectCentrolCoverPic,
      route: { name: 'project-centrol-initial-work' },
    }"
  ></ProjectInfoComponent>
  <ProjectInfoComponent
    :project="{
      name: 'Detailed Design',
      description: 'Detailed Design Work',
      img: ProjectCentrolCoverPic,
      route: { name: 'project-centrol-detailed-design' },
    }"
  ></ProjectInfoComponent>
  <ProjectInfoComponent
    :project="{
      name: 'Prototyping',
      description: 'Prototyping Work',
      img: ProjectCentrolCoverPic,
      route: { name: 'project-centrol-prototyping' },
    }"
  ></ProjectInfoComponent>
</template>
