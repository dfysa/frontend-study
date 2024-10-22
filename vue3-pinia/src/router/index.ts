import { createRouter,createWebHistory } from "vue-router";

import Couter from "../views/Counter.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/router",
  },
  {
    path: "/counter",
    name: "Counter",
    component: Couter,
  },
  {
    path: "/todo",
    name: "Todo",
    component: () => import("../views/Todo.vue"),
  },

  {
    path: "/list",
    name: "List",
    component: () => import("../views/List.vue"),
  },
];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;