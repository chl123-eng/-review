<template>
  <div class="side-wrapper">
    <el-menu
      :router="true"
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse="isCollapse"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :basePath="route.path"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import sidebarItem from './sidebarItem';
import variables from '@/styles/variables.scss';
import { mapGetters } from 'vuex';
export default {
  components: {
    sidebarItem,
  },
  computed: {
    ...mapGetters(['sidebar']),
    variables() {
      return variables;
    },
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-wrapper {
  overflow: scroll;
  height: 100vh;
  background: #304156;
}
:deep.el-menu {
  border: none;
}
</style>
