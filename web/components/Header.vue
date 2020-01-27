<template>
  <div class="header">
    <div class="header-content">
      <!-- <div class="theme-mode-wrapper">
        <a href="javascript:;">theme-mode</a>
      </div>-->

      <el-menu router :default-active="$route.path" mode="horizontal">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/aboutus">关于</el-menu-item>
        <el-menu-item index="/archives">归档</el-menu-item>
        <el-menu-item index="/guestbooks">留言墙</el-menu-item>
        <el-menu-item index="/collections">我的收藏</el-menu-item>
      </el-menu>
    </div>
    <div class="weather-container">
      <client-only>
      <vue-weather title :enableCredits="false" :forecast="[]" units="ca" :currentDay="currentDay"></vue-weather>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  computed: {
    currentDay() {
      return this.$store.state.weather.currentDay
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 160px;
  padding: 20px;
  padding-top: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-left: 200px;
}
.header-content {
  display: flex;
  .theme-mode-wrapper {
    width: 30%;
  }

  .el-menu-item {
    font-size: 18px;
  }
}
.weather-container {
  height: 200px;
  position: absolute;
  top: 20px;
  right: 20px;
  /deep/ #header {
    display: none;
  }
}
</style>

