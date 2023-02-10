/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-11 15:34:30
 * @LastEditors: went
 * @LastEditTime: 2022-07-15 09:31:35
 */
import { ILoginState } from "./modules/login/types";
import { IAddRoutesState } from "./modules/addRoutes/types";
export interface IRootState {
  login: ILoginState;
  addRoutes: IAddRoutesState;
}
export type IStoreType = IRootState;
