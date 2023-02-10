/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-09-02 10:45:03
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 10:45:17
 */
export interface IResultType<T = any> {
  code: string;
  data: T;
  message: string;
  version: string;
}
