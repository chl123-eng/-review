<template>
  <div>
    <template v-if="hasOneChild(item.children, item)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
      </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
import item from './item.vue';
import { isExternal } from '@/utils/validate';
export default {
  name: 'sidebarItem',
  components: {
    item,
  },
  props: {
    item: {
      type: Object,
      require: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneChild(children = [], parent) {
      if (children.length == 1) {
        this.onlyOneChild = children[0];
        return true;
      }

      if (children.length == 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
