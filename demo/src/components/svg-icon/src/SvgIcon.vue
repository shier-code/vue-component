<!--
 * @Descripttion: 
 * @version: 
 * @Author: JiaLe
 * @Date: 2021-09-03 10:08:07
 * @LastEditors: JiaLe
 * @LastEditTime: 2021-09-23 10:10:16
-->
<template>
  <component
    :is="iconName"
    v-if="local"
    class="svg-icon"
  />
  <svg
    v-else-if="svg"
    :class="svgClass"
    aria-hidden="true"
    :style="{'fill':color,transform: 'scale('+scale+')'}"
  >
    <use :xlink:href="iconName" />
  </svg>
  <i
    v-else
    class="svg-icon"
    :class="`${iconName}`"
  />

</template>
<script>
export default {
  name: "svgIcon",
  props: {
    // 是否使用地化的svg图标
    local: {
      type: Boolean,
      default: false
    },
    // svg图标
    svg: {
      type: Boolean,
      default: true
    },
    iconClass: {
      required: true
    },
    className: {
      type: String,
      default: ""
    },
    color: {
      type: String
    },
    scale: {
      type: Number
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
  /* margin-right: 0.5em; */
}
</style>
