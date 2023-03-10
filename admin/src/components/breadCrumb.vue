<template>
  <el-breadcrumb class="breadCrumb-container">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="item.redirect == 'noRedirect' || index == levelList.length - 1">{{
        item.meta.title
      }}</span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp';
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadCrumb();
    },
  },

  mounted() {
    this.getBreadCrumb();
  },
  methods: {
    getBreadCrumb() {
      let matched = this.$route.matched.filter((item) => item.meta.title);

      let first = matched[0];
      if (!this.isIndexView(first)) {
        matched = [{ path: '/', redirect: '/indexView', meta: { title: '首页' } }].concat(matched);
      }
      this.levelList = matched.filter((item) => item.meta && item.meta.title);
    },
    isIndexView(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'indexView'.toLocaleLowerCase();
    },
    pathCompile(path) {
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      let { redirect, path } = item;
      console.log(redirect, item);
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.breadCrumb-container.el-breadcrumb {
  line-height: 50px;
}
</style>
