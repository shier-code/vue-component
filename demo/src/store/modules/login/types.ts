/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-09 13:42:04
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 16:52:33
 */
export interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}
