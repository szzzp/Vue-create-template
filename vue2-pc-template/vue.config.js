module.exports = {
  // 配置图片压缩
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  publicPath: "/", //指定在运行时浏览器从哪里加载打包后的bundle文件
  outputDir: "dist", // "outputDir"被设置为"./dist"，表示输出目录是在当前目录下的"dist"文件夹中。
  assetsDir: "static", // 表示静态资源文件应该存放在项目根目录下名为 "static" 的文件夹中。
  // webpack中一个用于开发环境的服务器
  devServer: {
    port: port, // 端口
    open: true, // 自动打开浏览器
    // 下面表示在构建过程中是否显示警告和错误信息。在此例中，警告信息将被禁用，而错误信息将会被显示。
    overlay: {
      warnings: false,
      errors: true,
    },
    // 配置反向代理
    proxy: {
      "/api": {
        target: "", // 跨域请求的地址
        changeOrigin: true, // 是否跨域
        pathRewrite: { "^/api": "" }, // 路由重写规则
      },
    },
  },
};
