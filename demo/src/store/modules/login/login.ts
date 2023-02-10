/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 13:37:26
 * @LastEditors: went
 * @LastEditTime: 2022-12-06 13:42:34
 */
import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../../types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/modules/login/login";
import localCache from "@/utils/cache";
import { mapMenusToRoutes } from "@/utils/map-menus";
import router from "@/router";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus;
      //userMenus => routes
      const { fullRoutes } = mapMenusToRoutes(userMenus);
      fullRoutes.forEach((route) => {
        router.addRoute("index", route);
      });
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      //实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      // 4.跳到首页
      router.push("/main");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
        // 发送初始化的请求(完整的role/department)
        // dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};

export default loginModule;
