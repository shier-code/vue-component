/*
 * @Desc:创建request示例
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-07-13 16:40:33
 */
//service统一出口
import JFRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
const jfRequest = new JFRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercepter: (config) => {
      //携带token
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseIntercepter: (config) => {
      return config;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});
export default jfRequest;
