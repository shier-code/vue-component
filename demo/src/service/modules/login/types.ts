/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 13:42:04
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 17:00:17
 */
export interface IAccount {
  name: string;
  password: string;
}
export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}
