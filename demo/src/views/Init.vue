<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-11 14:19:18
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 11:44:48
-->
<template>
  <div class="container">
    <a-spin size="large" :tip="tip">
      <div class="container"></div>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import LocalCache from "@/utils/cache";
// import { ENTER_WAY, SYS_TOKEN, SYS_ORGCODE } from "@/utils/global-constant";
import { requestSysInfo } from "@/service/modules/public/public";
import { useStore } from "vuex";
import router from "@/router";
import { Toast } from "vant";

const tip = "加载中...";
const store = useStore();
//模拟接口菜单数据
const menuList = [
  {
    spyCode: "zxb_01",
    name: "菜单一",
  },
];
//系统初始化
initIdentity();
/**
 * @desc: 初始化
 * @author: went
 */
function initIdentity() {
  getMenu();
}
/**
 * @desc: 获取用户信息
 * @author: went
 */
async function getSysInfo() {
  const res = await requestSysInfo({});
  if (res?.code === "200") {
    LocalCache.setSession("sysInfo", res.data);
    router.push("/home");
  } else {
    Toast(res?.message);
  }
}
function getMenu() {
  store.dispatch("addRoutes/actionMenu", menuList);
  getSysInfo();
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
}
</style>
