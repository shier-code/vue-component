/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 14:19:13
 * @LastEditors: went
 * @LastEditTime: 2022-10-24 10:23:30
 */
import jfRequest from "../../index";
import { IAccount, ILoginResult } from "./types";
import { IResultType } from "types/request";
const LoginAPI = {
  AccountLogin: "/login",
  LoginUserInfo: "/users/", // 用法: /users/1
  UserMenus: "/role/", // 用法: role/1/menu
};
export function accountLoginRequest(account: IAccount) {
  return jfRequest.post<IResultType<ILoginResult>>({
    url: "LoginAPI.AccountLogin",
    data: account,
  });
}

export function getUserInfo(data = {}) {
  return jfRequest.post<IResultType>({
    url: "/public/getUserInfo",
    data: data,
    showLoading: true,
    interceptors: {
      requestIntercepter: (config) => {
        console.log("单独请求的getUserInfo");
        return config;
      },
      responseIntercepter: (res) => {
        return res;
      },
    },
  });
}
export function requestUserInfoById(id: number) {
  return jfRequest.get<IResultType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return jfRequest.get<IResultType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false,
  });
}
