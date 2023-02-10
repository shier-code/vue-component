/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-13 17:19:37
 * @LastEditors: went
 * @LastEditTime: 2021-12-31 15:02:04
 */
type IFormType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: any;
  // 针对select
  options?: any[];
  // // 针对特殊的属性
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  colLayout?: any;
  itemStyle?: any;
}
