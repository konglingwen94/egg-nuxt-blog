<template>
  <div class="menu-container">
    <el-menu router background-color="#304156" text-color="#f2f6fc">
      <el-menu-item index="/"></el-menu-item>
      <el-menu-item index="/articles">文章列表</el-menu-item>
      <el-menu-item index="/article-categories">文章分类</el-menu-item>
      <el-menu-item index="/comments">文章评论</el-menu-item>
      <el-menu-item index="/guestbooks">留言墙</el-menu-item>
      <el-menu-item index="/tags">标签管理</el-menu-item>
      <el-submenu index="/settings">
        <template slot="title">安全</template>
        <el-menu-item index="/settings/security">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Menu'
}
</script>

<style lang="less">
.menu-container {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>


