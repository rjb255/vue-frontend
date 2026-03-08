// import { createRouter, createWebHistory } from "vue-router";
import "vue-router";
import { createRouter, createWebHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/albums",
      name: "albums",
      meta: { title: "Albums | Ross Brown" },
      component: () => import("@/views/AlbumsView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      meta: { title: "Projects | Ross Brown" },
      component: () => import("@/views/MyProjects.vue"),
    },
    {
      path: "/projects/centrol",
      name: "project-centrol",
      meta: { title: "Project Centrol | Ross Brown" },
      component: () => import("@/views/projects/ProjectCentrol.vue"),
    },
  ],
});
router.beforeEach((to, _, next) => {
  document.title = to.meta.title ?? "Ross Brown";
  next();
});

export default router;
