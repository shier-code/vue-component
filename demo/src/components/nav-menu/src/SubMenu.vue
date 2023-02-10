<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-18 10:26:59
 * @LastEditors: went
 * @LastEditTime: 2021-12-20 14:06:01
-->

<template functional>
  <a-sub-menu :key="props.menuInfo.id">
    <span slot="title">
      <svg-icon
        :icon-class="props.menuInfo.icon"
        :scale="1"
      ></svg-icon>
      <span>{{ props.menuInfo.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.id"
        @click="() =>parent.$router.push({ name: item.name })"
      >
        <span style="margin-left:10px">{{ item.title }}</span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.id"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo"]
};
</script>
