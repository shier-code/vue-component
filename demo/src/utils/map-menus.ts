/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-13 14:47:13
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 13:43:58
 */
import { RouteRecordRaw } from "vue-router";
type RouteMenuObj = {
  fullRoutes: RouteRecordRaw[];
  fullMenus: any[];
};
export function mapMenusToRoutes(userMenus: any[]): RouteMenuObj {
  const routes: RouteRecordRaw[] = [];
  //1、先加载默认所有routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/modules", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/modules" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  console.log("allRoutes====", allRoutes);
  //2、根据菜单获取需要添加的routes

  //2、根据菜单获取需要添加的routes
  const _recurseGetRouter = (menus: any[]) => {
    menus.forEach((menu) => {
      if (menu.children && menu.children.length) {
        _recurseGetRouter(menu.children);
      } else {
        const route = allRoutes.find(
          (route) => route?.meta?.spyCode === menu.spyCode
        );
        if (route) {
          routes.push(route);
          menu.path = route.path;
          menu.name = route.name;
        }
      }
    });
  };

  const fullMenus = JSON.parse(JSON.stringify(userMenus));
  _recurseGetRouter(fullMenus);
  //3、加入子页面的路由（不与菜单关联的页面路由）
  const isHideRouteList = allRoutes.filter((route) => route?.meta?.isHideRoute);
  const hideRoute = [];
  //子页面鉴权
  const tempRoutes = JSON.parse(JSON.stringify(routes));
  tempRoutes.forEach((item: any) => {
    isHideRouteList.forEach((jtem) => {
      if (item.meta.spyCode === jtem?.meta?.parentSpyCode) {
        hideRoute.push(jtem);
      }
    });
  });

  const fullRoutes: RouteRecordRaw[] = [...routes, ...isHideRouteList];

  return { fullRoutes, fullMenus };
}
