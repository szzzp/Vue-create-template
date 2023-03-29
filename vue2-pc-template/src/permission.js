// 权限拦截
import router from "./router";
import store from "./store";
import nprogress from "nprogress"; // 引入进度条
import "nprogress/nprogress.css"; // 引入进度条样式

const whiteList = ["/404", "/login"];

// 前置守卫
router.beforeEach(async (to, form, next) => {
  nprogress.start(); // 开启进度条
  if (store.getters.token) {
    // 只有有Token才能去获取用户资料
    if (to.path === "/login") {
      next("/");
    } else {
      // 判断当前是否有用户资料
      if (!store.getters.userId) {
        // 没有就需要去获取
        // 加上await 表示需要等待这个异步执行完，才可以去跳转页面
        await store.dispatch("user/getUserInfo");
      }
      next();
    }
  } else {
    // 没有token 是否跳转的是白名单
    if (whiteList.indexOf(to.path) > -1) {
      // 表示跳转的页面在白名单里
      next();
    } else {
      next("/login");
    }
  }
  nprogress.done(); // 强制关闭进度条
});

// 后置守卫
router.afterEach(() => {
  nprogress.done(); // 关闭进度条
});
