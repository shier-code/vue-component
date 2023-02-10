/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-11-30 09:53:59
 * @LastEditors: went
 * @LastEditTime: 2022-12-06 13:37:17
 */

const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const path = require("path");
let timeStamp = new Date().getTime();
function resolve(dir) {
  return path.join(__dirname, ".", dir);
}
module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: "./build",
  publicPath: "./",
  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:4000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },

  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  //配置全局主题色
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#3399ff",
        },
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 16,
            minPixelValue: 2,
            propList: ["*"],
          }),
        ],
      },
    },
    extract: {
      // 打包后css文件名称添加时间戳
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/[id].${timeStamp}.css`,
    },
  },
  chainWebpack: (config) => {
    //配置svg全局组件
    config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/icon")) // 处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    // 配置文件别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@http", resolve("src/http"))
      .set("@utils", resolve("src/utils"));
    //配置打包分析工具
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();
      config.plugins.delete("prefetch");
    }
    //配置全局使用less变量
    const oneOfsMap = config.module.rule("less").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("style-resources-loader")
        .loader("style-resources-loader")
        .options({
          patterns: "./src/assets/css/theme.less",
        })
        .end();
    });
  },
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并
  configureWebpack: {
    output: {
      // 输出重构 打包编译后的js文件名称,添加时间戳.
      filename: `js/js[name].${timeStamp}.js`,
      chunkFilename: `js/[id].${timeStamp}.js`,
    },
    resolve: {
      alias: {
        components: "@/components",
      },
    },
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // 3.配置方式三:
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
};
