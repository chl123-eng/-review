<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="hamburger-container" @click="hamburgerClick">
        <i :class="hamburgerIcon" style="font-size: 25px"></i>
      </div>
      <bread-crumb></bread-crumb>
    </div>

    <div class="navbar-right">
      <el-dropdown trigger="click">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <i class="el-icon-caret-bottom"></i>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in menuList"
            :key="index"
            @click.native="clickMenuItem(item)"
            >{{ item.title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import breadCrumb from '../../components/breadCrumb.vue';
export default {
  components: { breadCrumb },
  data() {
    return {
      hamburgerIcon: 'el-icon-s-fold',
      menuList: [{ title: '退出' }],
    };
  },
  computed: {
    ...mapGetters(['sidebar']),
  },
  mounted() {},
  methods: {
    hamburgerClick() {
      this.$store.dispatch('app/toggleSideBar');
      this.hamburgerIcon = this.sidebar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold';
    },
    clickMenuItem(i) {
      switch (i.title) {
        case '退出':
          this.logOut();
      }
    },
    async logOut() {
      await this.$store.dispatch('user/logout');
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .navbar-left {
    display: flex;
    .hamburger-container {
      margin-top: 5px;
      padding-right: 20px;
      cursor: pointer;
    }
  }

  .right-menu {
  }
}
</style>
