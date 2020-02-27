<template>
  <div class="menu-container">
    <el-menu :default-active="$route.path" router background-color="#304156" text-color="#f2f6fc">
      <el-submenu>
        <template v-slot:title>
          <i class="el-icon-eleme"></i> 博客管理
        </template>
        <el-menu-item index="/configuration/site-config">
          <i class="el-icon-more"></i> 网站设置
        </el-menu-item>
        <el-menu-item index="/configuration/project-intro">
          <i class="el-icon-s-platform"></i> 项目介绍
        </el-menu-item>
        <el-menu-item index="/author">
          <i class="el-icon-user"></i> 作者简介
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/categories">
        <i class="el-icon-folder"></i> 分类管理
      </el-menu-item>
      <el-menu-item index="/tags">
        <i class="el-icon-collection-tag"></i> 标签管理
      </el-menu-item>
      <el-submenu index="/articles">
        <template slot="title">
          <i class="el-icon-document"></i> 文章管理
        </template>
        <el-menu-item index="/articles/new">
          <i class="el-icon-document-add"></i>添加文章
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-s-data"></i> 文章列表
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/comments">
        <i class="el-icon-s-comment"></i> 文章评论
      </el-menu-item>
      <el-menu-item index="/messages">
        <i class="el-icon-message"></i> 留言墙
      </el-menu-item>
      <el-submenu index="/settings">
        <template slot="title">
          <i class="el-icon-setting"></i> 安全
        </template>
        <el-menu-item index="/settings/security">
          <i class="el-icon-s-custom"></i> 账户设置
        </el-menu-item>
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
 