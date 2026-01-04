// import { createRouter, createWebHistory } from "vue-router";
import "vue-router";
import { createRouter, createWebHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
  }
}

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/skating",
      name: "skating",
      component: HomeView,
      meta: { title: "Ross Brown | Ice Skating" },
    },
    {
      path: "/projects",
      name: "projects",
      meta: { title: "Ross Brown | Projects" },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PreMoveChess.vue"),
    },
  ],
});
router.beforeEach((to, _, next) => {
  document.title = to.meta.title ?? "Ross Brown";
  next();
});

export default router;
