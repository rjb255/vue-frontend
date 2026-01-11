// import { createRouter, createWebHistory } from "vue-router";
import "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AlbumsView from "@/views/AlbumsView.vue";

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
      component: HomeView,
    },
    {
      path: "/albums",
      name: "albums",
      component: AlbumsView,
      meta: { title: "Albums | Ross Brown" },
    },
    {
      path: "/projects",
      name: "projects",
      meta: { title: "Projects | Ross Brown" },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/PreMoveChess.vue"),
    },
  ],
});
router.beforeEach((to, _, next) => {
  document.title = to.meta.title ?? "Ross Brown";
  next();
});

export default router;
