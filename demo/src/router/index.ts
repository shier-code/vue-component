/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 15:01:34
 */
import { createRouter, createWebHashHistory } from "vue-router";
import LocalCache from "@/utils/cache";
import { getQueryString } from "@/utils/utils";
import { ENTER_WAY, SYS_TOKEN, SYS_ORGCODE } from "@/utils/global-constant";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layout/BasicLayout.vue"),
    children: [], //-> 根据userMenus来决定 -> children
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      title: "自习吧",
    },
  },
  {
    path: "/init",
    name: "init",
    component: () => import("@/views/Init.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/not-found/404.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 导航守卫
router.beforeEach((to) => {
  // debugger
  document.title = to.meta.title as string;
  const token = LocalCache.getSession(SYS_TOKEN);
  const localToken = LocalCache.getCache(SYS_TOKEN);
  const sysInfo = LocalCache.getSession("sysInfo");

  if (to.path === "/login") {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      return { path: "/" };
    } else {
      return undefined;
    }
  } else if (to.path === "/init") {
    return undefined;
  } else {
    if (!token || token === "null") {
      if (ENTER_WAY === "portal") {
        //携带地址栏的token和orgCode跳转到init页面进行初始化
        LocalCache.setSession(SYS_TOKEN, getQueryString("token"));
        LocalCache.setSession(SYS_ORGCODE, getQueryString("orgcode"));
        return { path: `/init` };
      } else {
        //跳转到登录界面
        if (localToken) {
          if (!sysInfo) {
            return { path: "/init" };
          } else {
            //首次登录
            return undefined;
          }
        }
        return { path: `/login` };
      }
    } else {
      return undefined;
    }
  }
});

export default router;
