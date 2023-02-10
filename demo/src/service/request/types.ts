/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 15:17:48
 */
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface JFRequestInterceptors<T = AxiosResponse> {
  requestIntercepter?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  // responseIntercepter?: (res: any) => any;
  responseIntercepter?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
export interface JFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JFRequestInterceptors<T>;
  showLoading?: boolean;
}
