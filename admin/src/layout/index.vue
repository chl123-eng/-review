<template>
  <div class="app-wrapper">
    <Sidebar class="side-container" :class="classObj" />
    <div class="main-container">
      <Navbar />
      <App-main />
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components';
export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain,
  },
  computed: {
    classObj() {
      return {
        hideSideBar: !this.$store.state.app.sidebar.opened,
        openSideBar: this.$store.state.app.sidebar.opened,
        withoutAnimation: this.$store.state.app.sidebar.withoutAnimation,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .side-container {
    width: 200px;
  }
  .main-container {
    flex: 1;
  }
}

.hideSideBar {
  transition: width 0.28s;
  width: 54px !important;
}
.openSideBar {
  transition: width 0.28s;
  width: 210px !important;
}
</style>
