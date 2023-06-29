const path = require("path");
const fs = require("fs");

// const CracoLessPlugin = require("craco-less");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const env = process.env.REACT_APP_ENV;

module.exports = {
  devServer: {
    port: 4000, // 设置新的端口号
  },

  webpack: {
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
      console.log("webpackConfig=", webpackConfig);

      fs.writeFileSync(
        path.resolve(__dirname, "./webpackConfig.original.json"),
        JSON.stringify(webpackConfig)
      );
      console.log("write webpackConfig out ok!!!");

      webpackConfig.optimization.splitChunks = {
        cacheGroups: {

          reactVendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|redux|react-redux)[\\/]/,
            name: "react-vendors",
            chunks: "all",
            priority: 20,
          },

          otherVendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "other-vendors",
            chunks: "all",
            priority: 10,
          },

          common: {
            test: /[\\/]src[\\/]common[\\/]/,
            name: "common",
            chunks: "all",
            priority: 10,
          },

        },
      };

      return webpackConfig;
    },
  },
};
