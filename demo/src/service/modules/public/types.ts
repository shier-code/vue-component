/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 13:42:04
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 11:21:45
 */
export interface ILoginReq {
  username?: string;
  password?: string;
  orgCode?: string | number;
}
export interface ILoginResult {
  token: string;
  orgCode: string;
  grade: string;
  username: string;
  showType: string;
}
