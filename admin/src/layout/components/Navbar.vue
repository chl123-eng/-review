<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="hamburger-container" @click="hamburgerClick">
        <i :class="hamburgerIcon" style="font-size: 25px"></i>
      </div>
      <div class="breadcrumb-container">breadcrumb-container</div>
    </div>

    <div class="navbar-right">right-menu</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      hamburgerIcon: 'el-icon-s-fold',
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
