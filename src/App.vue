<template>
  <div id="app">
    <!-- <h1>table导航</h1>
    <div class="link-group">
      <el-button type="primary" @click="linkDefaultTable">默认表格</el-button>
      <el-button type="primary" @click="linkExpandTable"
        >可以展开行的表格</el-button
      >
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    // 基础table
    linkDefaultTable() {
      // if (this.$router.path == path) return;
      this.$router.push({
        name: "HomeView",
      });
    },
    // 展开行表格
    linkExpandTable() {
      this.$router.push({
        name: "ExpandTable",
      });
    },
  },
};
</script>
<style lang="scss">
#app {
  width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
}
.link-group {
  margin-bottom: 30px;
}
</style>
