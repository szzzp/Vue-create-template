import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/MenuMaintenance",
    children: [
      {
        path: "MenuMaintenance",
        name: "MenuMaintenance",
        component: () => import("@/views/MenuMaintenance/index"),
        meta: { title: "菜单维护", icon: "form" },
      },
    ],
  },

  {
    path: "/TableNumber",
    component: Layout,
    redirect: "/TableNumber",
    children: [
      {
        path: "index",
        name: "TableNumber",
        component: () => import("@/views/TableNumber/index"),
        meta: { title: "桌号维护", icon: "el-icon-s-help" },
      },
    ],
  },

  {
    path: "/operator",
    component: Layout,
    children: [
      {
        path: "index",
        name: "operator",
        component: () => import("@/views/operator/index"),
        meta: { title: "操作人维护", icon: "user" },
      },
    ],
  },

  {
    path: "/checkStatus",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/checkStatus/index"), // Parent router-view
        name: "checkStatus",
        meta: { title: "预定状态", icon: "eye-open" },
      },
    ],
  },
  {
    path: "/Turnover",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Turnover",
        component: () => import("@/views/Turnover/index"),
        meta: { title: "营业额统计", icon: "form" },
      },
    ],
  },

  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
