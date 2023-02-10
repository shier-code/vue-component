/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-11 14:22:36
 * @LastEditors: went
 * @LastEditTime: 2022-07-11 17:35:59
 */
// 获取查询参数
const getQueryString = (name: String) => {
  // if (name === "token" && sessionStorage.sjgdxgxt_token) {
  //   return sessionStorage.sjgdxgxt_token
  // }
  name = name.toLowerCase();
  // let href = 'index.html?token=Q0ZGMTFEQ0IzRTIxNDQ1M0E3MTdGQTlCOEREQkE4RTY=.MjAyMC0wNC0yMSAxOToyMzo1Nw==.EAFAF931345DF5CBBCC8115BA37B9904&orgcode=86.45&server=http://10.10.1.183:8080/jf_exwsp/'
  let href = window.location.href;
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  let w = href.slice(href.indexOf("?"));
  let r = w.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return "";
};

export { getQueryString };
