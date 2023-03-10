<template>
  <section>
    <transition>
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style></style>
