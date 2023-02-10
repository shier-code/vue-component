<!--
 * @Desc: 
 * @Version: v1.00
 * @Author: went
 * @Date: 2022-07-12 11:31:50
 * @LastEditors: went
 * @LastEditTime: 2023-02-10 13:29:41
-->
<template>
  <div class="container">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
    <Button></Button>
    <svg-icon class="add" icon-class="add" />
  </div>
</template>
<script lang="ts" setup>
import { Button } from 'jf-ui-design'
</script>
<style lang="less">
.add {
  color: @font-color-gray;
}
</style>
