<template>
  <el-container>
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
@media screen and (min-width: 600px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .el-aside {
    width: 200px !important;
  }
}
@media screen and (max-width: 800px) {
  /*当屏幕尺寸小于600px时，应用下面的CSS样式*/
  .el-aside {
    width: 120px !important;
  }
}


.el-aside {
  min-height: 100vh;
  background-color: #304156;
}
</style>


