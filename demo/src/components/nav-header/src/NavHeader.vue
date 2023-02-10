<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-12-21 14:32:20
 * @LastEditors: went
 * @LastEditTime: 2022-07-13 14:43:26
-->
<template>
  <div class="nav-header">
    <span class="nav-header-title"> {{ SYS_TITLE }}</span>

    <span
      v-if="$route.path.includes('ProcessEngine')"
      class="nav-header-center"
    >
      <span class="item" @click="$router.push('/ProcessEngine/ProcessEngine')"
        ><b>1.</b>基础信息</span
      >
      <span class="item" @click="$router.push('/ProcessEngine/FormDesign')"
        ><b>2.</b>表单设计</span
      >
      <span class="item" @click="$router.push('/ProcessEngine/ProcessDesign')"
        ><b>3.</b>流程设计</span
      >
    </span>
    <div class="nav-header-right">
      <span>{{ schoolName }}</span>
      <span class="header-avatar">
        <svg-icon
          icon-class="t_touxiang"
          :scale="2"
          style="margin: 0 4px 0 54px"
        />
      </span>
      <a-dropdown :trigger="['click']">
        <span class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          <span style="font-size: 16px; font-weight: 400; margin-left: 10px">
            {{ userName }}</span
          >
          <a-icon
            type="down"
            class="caret-down"
            style="verticel-align: middle"
          />
        </span>
        <template #overlay>
          <a-menu class="header-logout">
            <a-menu-item>
              <a href="javascript:;" @click="logout">退出系统</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { SYS_TITLE } from "@/config/global-constant.js";
import { readSion } from "@/utils/util";

export default {
  name: "",
  components: {},
  data() {
    return {
      userName: "",
      schoolName: "",
      SYS_TITLE,
    };
  },
  computed: {},
  mounted() {
    this.userName = readSion("userInfo").personName;
    this.schoolName = readSion("userInfo").schoolName;
  },
  methods: {
    logout() {
      if (
        navigator.userAgent.indexOf("Firefox") !== -1 ||
        navigator.userAgent.indexOf("Chrome") !== -1
      ) {
        window.location.href = "about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },
  },
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  justify-content: space-between;
  margin: 0 20px 0 0;
  .nav-header-title {
    font-size: 28px;
    padding-left: 16px;
    font-family: "微软雅黑";
    font-weight: 500;
    text-align: LEFT;
    color: #303233;
  }
  .nav-header-center {
    .item {
      display: inline-block;
      width: 168px;
      height: 32px;
      line-height: 32px;
      margin-right: 10px;
      background: @primary-btn;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
  }
  .nav-header-right {
  }
  .caret-down {
    vertical-align: middle;
    margin: 0 6px;
  }
}
</style>
