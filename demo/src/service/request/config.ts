/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-11-15 16:53:25
 */
let BASE_URL = "";
let SOURCE_URL = "";
const TIME_OUT = 1000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://10.20.5.35:3000/mock/1463/";
  SOURCE_URL = `http://10.20.5.81/oss/`;
} else if (process.env.NODE_ENV === "production") {
  let origin = window.location.origin;
  BASE_URL = `${origin}`;
  SOURCE_URL = `${origin}/oss/`;
} else {
  BASE_URL = "";
}
export { BASE_URL, SOURCE_URL, TIME_OUT };
