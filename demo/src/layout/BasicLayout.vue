<template>
  <div
    :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]"
    class="basic-style"
  >
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      collapsed: false,
      metaInfo: {
        title: "123",
      },
      parentRouter: [],
    };
  },
  watch: {
    "$route.path": function (val) {
      this.parentRouter = this.$route.matched.slice(1);
    },
    $route: function (val) {
      // console.log('=========', this.$route.query);
    },
  },
  created() {
    this.parentRouter = this.$route.matched.slice(1);
  },
  computed: {
    comName() {
      //缓存组件名
      return this.$route.name;
    },
    key() {
      //路由插槽key
      return this.$route.name;
    },
    navTheme() {
      return this.$route.query.navTheme || "light";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  methods: {
    // 获取meta
    getMetaInfo(val) {
      this.metaInfo = val;
    },
  },
};
</script>

<style lang="less" scoped>
.trigger-icon {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.trigger-icon :hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  margin-left: 24px;
  font-size: 18px;
}
.nav-theme-dark .logo {
  color: white;
}
.nav-theme-light .logo {
  font-size: 24px;
  color: #303233;
  font-weight: bold;
}
.spin-content {
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  grid-row: 1;
  margin: 0px;
  padding: 100px;
}
</style>
// antd布局样式
<style lang="less" scoped>
.basic-style {
  .ant-layout-header {
    padding: 0;
    border-bottom: 1px solid #e1e3e5;
    background: #fff;
  }
  .ant-layout-sider {
    height: calc(100vh - 64px);
    min-height: calc(100vh - 64px);
    border-right: 1px solid #e1e3e5;
    position: static;
    overflow-y: auto;
    background: #fff;
  }
  .ant-layout-content {
    height: calc(100vh - 124px);
    margin: 24px 24px 24px 24px !important;
    overflow-y: auto;
    background: #fff;
  }
  .ant-breadcrumb {
    margin: 8px 16px 8px 16px !important;
  }
}
</style>
