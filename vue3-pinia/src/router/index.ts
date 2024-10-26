import { createRouter,createWebHistory } from "vue-router";
import { useUserStore } from "../stores/useUser";

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
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
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
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { fetchUser } = userStore;
  await fetchUser(); // 每次路由变化时，获取最新用户信息
  next(); // 继续路由跳转
});

  export default router;