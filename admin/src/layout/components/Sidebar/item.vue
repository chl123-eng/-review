<template>
  <div class="container">
    <div class="icon">
      <i :class="icon"></i>
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  .title {
    font-size: 16px;
    margin-left: 10px;
    margin-top: 1px;
  }
}
</style>
