import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/api", // 可代理配置地址
  timeout: 5000, //
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取token , 将其携带到请求头上
    if (store.getters.token) {
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 2 * 1000,
      });
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
