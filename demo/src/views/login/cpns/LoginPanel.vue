<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-19 11:19:55
 * @LastEditors: went
 * @LastEditTime: 2022-10-21 11:27:20
-->
<template>
  <div class="wt-login-panel">
    <van-form ref="“loginForm”" @submit="handleLogin">
      <van-cell-group class="wt-ip-item">
        <van-field
          ref="accountRef"
          v-model="username"
          placeholder="请输入账号"
          minlength="6"
          maxlength="36"
          name="validator"
          :rules="[{ validator, message: '请输入账号' }]"
        >
          <template #left-icon>
            <svg-icon icon-class="account"></svg-icon>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="wt-ip-item">
        <van-field
          v-model="password"
          :type="passwordType ? 'password' : 'text'"
          placeholder="请输入密码"
          maxlength="20"
          name="validator"
          :rules="[{ validator, message: '请输入密码' }]"
        >
          <template #left-icon>
            <svg-icon icon-class="password"></svg-icon>
          </template>
          <template #right-icon>
            <svg-icon
              :icon-class="passwordType ? 'hide_password' : 'show_password'"
              @click="showPws()"
            ></svg-icon>
          </template>
        </van-field>
      </van-cell-group>
      <div class="wt-identify">
        <van-cell-group style="width: 192px">
          <van-field
            v-model="identify"
            class="wt-ip-identify"
            maxlength="20"
            placeholder="请输入验证码"
            :rules="[
              { validator: validatorVertify, message: '验证码错误' },
              { required: true, message: '请输入验证码' },
            ]"
          >
            <template #left-icon>
              <svg-icon icon-class="vertify"></svg-icon>
            </template>
          </van-field>
        </van-cell-group>

        <IdentifyImg
          :identify-code="identifyCode"
          :content-height="42"
          @click="changeCode"
        ></IdentifyImg>
      </div>
      <van-button
        class="wt-login-btn"
        block
        type="primary"
        native-type="submit"
      >
        登录
      </van-button>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import LocalCache from "@/utils/cache";
import { SYS_TOKEN, SYS_ORGCODE } from "@/utils/global-constant";
import { Toast } from "vant";

import IdentifyImg from "@/components/identify-img";
import { accountLoginRequest } from "@/service/modules/public/public";

const router = useRouter();
const username = ref("");
const password = ref("");
const identify = ref("");
let passwordType = ref(true);
//验证码
let identifyCode = ref(""); //随机生成的验证码
// 验证码的随机取值范围
let identifyCodes = "123456789abcdefghjkmnpqrstuvwxyz";
//切换密码明文密文
const showPws = () => {
  passwordType.value = !passwordType.value;
};
// 随机生成验证码字符串
const makeCode = (data: string, len: number) => {
  for (let i = 0; i < len; i++) {
    identifyCode.value += data[randomNum(0, data.length - 1)];
  }
};
// 点击验证码刷新验证码
const changeCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
};
// 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
const randomNum = (min: number, max: number) => {
  max = max + 1;
  return Math.floor(Math.random() * (max - min) + min);
};
//账号密码校验
const validator = (val: string) => {
  return !!val;
};
//验证码校验
const validatorVertify = (val: string) => {
  if (val === identifyCode.value) {
    return true;
  } else {
    return false;
  }
};
//登录
const handleLogin = async () => {
  const params = {
    username: username.value,
    password: password.value,
    orgCode: LocalCache.getCache(SYS_ORGCODE),
  };
  const res = await accountLoginRequest(params);
  if (res.code === "200") {
    LocalCache.setCache(SYS_TOKEN, res.data.token);
    LocalCache.setCache(SYS_ORGCODE, res.data.orgCode);
    router.push("/init");
  } else {
    Toast(res.message);
  }
};

onMounted(() => {
  changeCode();
});
</script>

<style scoped lang="less">
.wt-login-panel {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 30%;
  width: 346px;
  margin: 0 auto;
  margin-top: 40%;
  padding: 32px 12px 0;
  box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;

  .wt-ip-item {
    margin-bottom: 22px;
  }

  .wt-identify {
    display: flex;
    justify-content: space-between;
  }

  .wt-ip-identify {
    width: 200px;
  }

  /deep/.van-cell {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    overflow: hidden;
    color: var(--van-cell-text-color);
    font-size: var(--van-cell-font-size);
    line-height: var(--van-cell-line-height);
    background: #f5f5f5;
    border-radius: 4px;
  }

  .wt-login-btn {
    margin: 10px auto 22px;
  }
}
</style>
