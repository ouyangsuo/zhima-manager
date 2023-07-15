const path = require("path");
// const fs = require("fs");

const env = process.env.REACT_APP_ENV;

// 四年前的一个破插件 早就没法用了 很坑！！！
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// const CracoLessPlugin = require("craco-less");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const { addBeforeLoaders, loaderByName, getLoaders, removeLoaders } = require("@craco/craco");
// const { addBeforeLoaders } = require("@craco/craco");

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devServer: {
    port: 4000, // 设置新的端口号
  },

  /* 覆盖WP配置 */
  webpack: smp.wrap({

    /* 新增配置 */
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: env !== "development" ? "server" : "disabled",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888,
        openAnalyzer: true,
        reportFilename: path.resolve(__dirname, `analyzer/index.html`),
      }),

      new WebpackBar({
        profile: true,
        color: "green",
      }),
    ],

    alias: {
      //   layouts: path.resolve(__dirname, "./src/app/layouts"),
      //   containers: path.resolve(__dirname, "./src/app/containers"),
      //   components: path.resolve(__dirname, "./src/app/components"),
      //   utils: path.resolve(__dirname, "./src/utils"),
      //   routers: path.resolve(__dirname, "./src/routers"),
      "@": path.resolve(__dirname, "./src"),
      "antd/es": path.resolve(__dirname, "node_modules/antd/es"),
    },

    /* 覆盖原有配置 完完全全就是操作对象和数组的方式去覆盖原来的配置 */
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
      console.log("env=", env);

      /* ===== START ===== */

      /* 开启多线程打包 */
      const rule = webpackConfig.module.rules.find((rule) => rule.oneOf);
      if (rule) {
        addBeforeLoaders(rule.oneOf, 'babel-loader', [
          {
            loader: 'thread-loader',
          },
        ]);
      }

      /* 开启持久化缓存 */
      webpackConfig.cache.type = "filesystem";

      /* 缩小loaders处理范围 */
      webpackConfig.module.rules.forEach((rule) => {
        rule.include = path.resolve(__dirname, "src");
      });

      /* 开启并行压缩 */
      webpackConfig.optimization.minimizer.push(
        new TerserPlugin({
          parallel: true,  //开启并行压缩，可以加快构建速度
        })
      )

      /* 生产环境移除 source-map-loader */
      removeLoaders(webpackConfig, loaderByName("source-map-loader"));

      /* 输出WP原始配置到文件中 */
      // console.log("webpackConfig=", webpackConfig);
      // fs.writeFileSync(
      //   path.resolve(__dirname, "./webpackConfig.original.json"),
      //   JSON.stringify(webpackConfig)
      // );
      // console.log("write webpackConfig out ok!!!");

      /* 分包配置 */
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {

          // 开发环境下不能使用all！！！坑！！！
          chunks: env === 'development' ? "initial" : "all",

          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
            name: "react-vendors",
            // chunks: "all",
            priority: 20,
          },

          otherVendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "other-vendors",
            // chunks: "all",
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },

          /* 假设还有本地其它轮子 */
          common: {
            test: /[\\/]src[\\/]common[\\/]/,
            name: "common",
            // chunks: "all",
            priority: 10,
          },

        },
      };

      return webpackConfig;
    },

    /* ===== END ===== */

  }),

};
