<template>
  <div id="wrapper">
    <!-- <el-container>
      <el-aside width="200px">
        <el-menu
            default-active="home"
            class="aside"
            :router="true"
          >
            <el-menu-item index="home">
              <i class="el-icon-monitor"></i>
              <span slot="title">Home</span>
            </el-menu-item>
            <el-menu-item index="12">
              <i class="el-icon-zoom-in"></i>
              <span slot="title">查找</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">设置</span>
            </el-menu-item>
            <el-divider></el-divider>
            <el-menu-item index="note">
              <i class="el-icon-location"></i>
              <span slot="title">随笔</span>
            </el-menu-item>
            <el-menu-item index="todo">
              <i class="el-icon-document"></i>
              <span slot="title">待办</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container> -->
  </div>
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    change() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style>
.aside {
  width: 150px;
  height: calc(100vh - 20px);
}
</style>
