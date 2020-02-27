<template>
  <el-container>
    <el-aside :width="$store.state.menuCollapsed?'auto':'200px'">
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
.el-header {
  box-shadow: 0 9px 13px -5px #ccc;
}
</style>


