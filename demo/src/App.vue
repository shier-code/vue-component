<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2021-08-26 10:16:51
 * @LastEditors: went
 * @LastEditTime: 2022-09-02 15:09:29
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  props: {
    name: {
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less">
#app {
  height: 100vh;
}
</style>
