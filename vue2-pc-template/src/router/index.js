import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/pages/index.vue"),
    },
    {
      path: "/login",
      component: () => import("@/pages/login/index.vue"),
    },
    { path: "*", redirect: "/404", hidden: true },
  ],
});

export default router;
