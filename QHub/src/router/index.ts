// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import QuestionList from "../components/index.vue";
import QuestionDetail from "../components/QuestionDetail.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "QuestionList",
    component: QuestionList,
  },
  {
    path: "/question/:id",
    name: "QuestionDetail",
    component: QuestionDetail,
    props: true, // 将路由参数作为组件的 props 传递
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
