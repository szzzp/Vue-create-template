"use strict";
const port = process.env.port || process.env.npm_config_port || 9528;

module.exports = {
  publicPath: "/", //指定在运行时浏览器从哪里加载打包后的bundle文件
  outputDir: "dist", // "outputDir"被设置为"./dist"，表示输出目录是在当前目录下的"dist"文件夹中。
  assetsDir: "static", // 表示静态资源文件应该存放在项目根目录下名为 "static" 的文件夹中。
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port, // 端口
    open: true, // 自动打开浏览器
    overlay: {
      warnings: false,
      errors: true,
    },
    // 配置反向代理
    // proxy: {
    //   "/api": {
    //     target: "", // 跨域请求的地址
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: { "^/api": "" }, // 路由重写规则
    //   },
    // },
  },
};
