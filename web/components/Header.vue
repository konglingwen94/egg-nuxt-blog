<template>
  <div class="header">
    <div class="header-content">
      <!-- <div class="theme-mode-wrapper">
        <a href="javascript:;">theme-mode</a>
      </div>-->

      <el-menu router :default-active="$route.path" mode="horizontal">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
        <el-menu-item index="/archives">归档</el-menu-item>
        <el-menu-item index="/guestbooks">留言墙</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header'
}
</script>

<style lang='less' scoped>
.header {
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-left: 200px;
}
.header-content {
  display: flex;
  .theme-mode-wrapper {
    width: 30%;
  }
}
</style>

