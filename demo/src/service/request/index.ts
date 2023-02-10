import axios from "axios";
import type { AxiosInstance } from "axios";
import type { JFRequestInterceptors, JFRequestConfig } from "./types";
import { Toast } from "vant";
import "vant/es/toast/style";
const DEFAULT_LOADING = true;
class JFRequest {
  instance: AxiosInstance;
  interceptors?: JFRequestInterceptors;
  showLoading?: boolean;
  loadiing?: any;
  constructor(config: JFRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config);
    //保存基本信息
    this.showLoading = config.showLoading && DEFAULT_LOADING;
    this.interceptors = config.interceptors;
    //使用拦截器
    //1、从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestIntercepter,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercepter,
      this.interceptors?.responseInterceptorCatch
    );
    //2、添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loadiing = Toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res: any) => {
        //移除loading,网络请求401要做单独的loading处理
        if (res.response?.status !== 401) {
          this.loadiing?.close();
        }
        if (res.data?.code === -1) {
          console.log("错误处理");
        } else {
          return res.data;
        }
      },
      (err) => {
        //移除loading
        if (err.response?.status !== 401) {
          this.loadiing?.close();
        }
        return err;
      }
    );
  }
  request<T>(config: JFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //由于修改了config的类型，所以某个接口单独可以进行自己拦截操作
      if (config.interceptors?.requestIntercepter) {
        config = config.interceptors.requestIntercepter(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading || true;
      }
      config = {
        ...config,
        data: {
          data: config.data,
        },
      };
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseIntercepter) {
            res = config.interceptors.responseIntercepter(res);
          }
          resolve(res);
          //将showLoading设为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
        })
        .catch((err) => {
          //将showLoading设为true,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }
  get<T>(config: JFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: JFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: JFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: JFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}
export default JFRequest;
