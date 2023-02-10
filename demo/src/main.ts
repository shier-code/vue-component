/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-07-14 10:27:58
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icon";
import { registerApp } from "./register";
import { setupStore } from "./store";
//全局初始化样式
import "normalize.css";
import "@/assets/css/base.less";
const app = createApp(App);
setupStore();
app.use(store).use(router).use(registerApp).mount("#app");
