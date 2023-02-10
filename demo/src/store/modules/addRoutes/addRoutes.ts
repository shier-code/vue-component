/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-01 14:32:01
 * @LastEditors: went
 * @LastEditTime: 2022-07-14 11:37:06
 */

/**
 * 动态添加路由
 * author:qlx
 */
import { mapMenusToRoutes } from "@/utils/map-menus";
import { Module } from "vuex";
import router from "@/router";
import localCache from "@/utils/cache";
import { IAddRoutesState } from "./types";

const addRoutes: Module<IAddRoutesState, any> = {
  namespaced: true,
  state: {
    fullMenus: [],
  },
  getters: {},
  mutations: {
    /**
     *
     * @param {*} state
     * @param {*} userMenus  从接口获取到的用户菜单信息（不含path,icon）
     */
    changeUserMenus(state, userMenus) {
      //通过菜单生成拥有完整属性的路由和菜单
      let { fullRoutes, fullMenus } = mapMenusToRoutes(userMenus);
      state.fullMenus = fullMenus;
      // debugger;
      fullRoutes.forEach((route) => {
        router.addRoute("index", route);
      });
      //由于addRoute动态添加路由，router.options.routes数据不会更新，故手动添加
      // router.options.routes[0].children =
      //   router?.options?.routes[0]?.children.concat(fullRoutes);
    },
  },
  actions: {
    actionMenu({ commit }, userMenus) {
      commit("changeUserMenus", userMenus);
      localCache.setSession("userMenus", userMenus);
    },

    loadLocalLogin({ commit }) {
      const userMenus = localCache.getSession("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
  },
};
export default addRoutes;
