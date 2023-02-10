/*
 * @Desc:全局挂载（仅测试，不应用该方式）
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-07 09:30:09
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 10:40:22
 */
import * as login from "./modules/login/login";
const api = {
  login,
};
const install: any = (vue: any) => {
  if (install.installed) {
    return;
  }
  install.installed = true;
  //注册到全局
  vue.config.globalProperties.$api = api;
};
export default install;
