<template>
  <div id="app">
    <router-view v-if="isShow"></router-view>
  </div>
</template>

<script>
export default {
  name: "shiyi",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
  },
};
</script>

<style>
/* CSS */
</style>
