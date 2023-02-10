<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 15:32:50
-->
<template>
  <div class="login">
    <LoginHead />
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/LoginPanel.vue";
import LoginHead from "./cpns/LoginHead.vue";
export default defineComponent({
  components: {
    LoginPanel,
    LoginHead,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang="less">
.login {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login_bg.png");
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
