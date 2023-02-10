/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 14:19:13
 * @LastEditors: went
 * @LastEditTime: 2022-07-29 10:13:40
 */
import jfRequest from "../../index";
import { ILoginReq, ILoginResult } from "./types";
import { IResultType } from "types/request";
export function accountLoginRequest(data: ILoginReq) {
  return jfRequest.post<IResultType<ILoginResult>>({
    url: "/public/login",
    data,
  });
}
export function requestSysInfo(data:any) {
  return jfRequest.post<IResultType>({
    url: "/stuEnd/getSysInfo",
    data,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return jfRequest.get<IResultType>({
    url: "/public/getMenuList",
    showLoading: false,
  });
}
