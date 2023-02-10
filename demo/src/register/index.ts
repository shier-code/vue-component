/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-04 09:40:04
 * @LastEditors: went
 * @LastEditTime: 2022-07-13 17:33:20
 */
import { App } from "vue";
import registerVant from "./register-uicpn";
import registerApi from "./register-api";
import registerComponents from "./register-cpns";
export function registerApp(app: App): void {
  registerVant(app);
  registerApi(app);
  registerComponents(app)
}
