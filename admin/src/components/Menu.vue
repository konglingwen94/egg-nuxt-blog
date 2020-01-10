<template>
  <div class="menu-container">
    <el-menu :default-active="$route.path" router background-color="#304156" text-color="#f2f6fc">
      <el-submenu index="/aboutus">
        <template v-slot:title>博客设置</template>
        <el-menu-item index="/carousels">轮播图设置</el-menu-item>
        <el-menu-item index="/introduction">平台简介</el-menu-item>
        <el-menu-item index="/contact">作者简介</el-menu-item>
      </el-submenu>
      <el-menu-item index="/categories">分类管理</el-menu-item>
      <el-menu-item index="/tags">标签管理</el-menu-item>
      <el-submenu index="/articles">
        <template slot="title">文章管理</template>
        <el-menu-item index="/articles/new">添加文章</el-menu-item>
        <el-menu-item index="/articles">文章列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/comments">文章评论</el-menu-item>
      <el-menu-item index="/guestbooks">留言墙</el-menu-item>
      <el-submenu index="/settings">
        <template slot="title">安全</template>
        <el-menu-item index="/settings/security">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'Menu',
  data() {
    return {
      defaultActive: '/articles'
    }
  }
}
</script>

<style lang="less">
.menu-container {
  height: 100vh;
  .el-menu {
    height: 100%;
  }
}
</style>


