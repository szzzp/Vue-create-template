import Vue from "vue";
import App from "./App.vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "./style/index.css";

Vue.config.productionTip = false;
import router from '@/router/index.js'
import store from '@/store/index.js'
// 路由守卫
// import '@/permission.js'  // 后续取消注释
// import "reset.css/reset.css"; // 样式初始化,移除默认样式

Vue.use(ElementUI, { locale });
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
