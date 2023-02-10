/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-04 09:40:04
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 14:14:04
 */
const home = () => import("@/views/Home/Home.vue");
export default {
  path: "/home",
  name: "home",
  component: home,
  children: [],
  meta: {
    spyCode: "zxb_01",
    icon: "zxb_01",
    title: "页面Title",

    // isHideRoute: true,
  },
};
