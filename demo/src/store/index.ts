/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-07-14 11:32:54
 */
import { createStore, Store, useStore as useVuexStore } from "vuex";

import login from "./modules/login/login";
import addRoutes from "./modules/addRoutes/addRoutes";
import { IRootState, IStoreType } from "./types";
import createPersistedState from "vuex-persistedstate";
const store = createStore<IRootState>({
  modules: {
    login,
    addRoutes,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      //加入要持久化的vuex模块
      reducer(val: IRootState) {
        return {
          login: val.login,
          addRoutes: val.addRoutes,
        };
      },
    }),
  ],
});

export function setupStore() {
  store.dispatch("addRoutes/loadLocalLogin");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
