/*
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-08 09:55:41
 * @LastEditors: went
 * @LastEditTime: 2023-02-10 14:55:39
 */
import { defineUserConfig, defaultTheme, viteBundler } from 'vuepress'
import { codeBlockPlugin } from "@yanyu-fe/vuepress-plugin-code-block";
import * as navbar from './configs/navbar'
import * as sidebar from './configs/sidebar'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from 'path'
export default defineUserConfig({
  title: "前端组件库",
  base: process.env.NODE_ENV === "production" ? "/vue-component" : "/",
  plugins: [codeBlockPlugin()],
  locales: {
    "/": {
      lang: "zh-CN",
      title: "jf-ui111111"
    }
  },
  lang: "zh-CN",
  theme: defaultTheme({
    locales: {
      "/": {
        navbar: navbar.zh,
        sidebar: sidebar.zh
      }
    },
  }
  ),
  bundler: viteBundler({
    viteOptions: {
      plugins: [vueJsx()],
      resolve: {
        alias: {
          "ui-design/style": resolve(__dirname, "../../packages/ui/src/style.ts"),
          "jf-ui-design": resolve(__dirname, "../../packages/ui/src/index.ts"),
        }
      }
    },
  })
})
