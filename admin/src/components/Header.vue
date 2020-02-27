<template>
  <div class="headerbar">
    <div class="headerbar-breadcrumb">
      <div class="collapse-button" @click="$store.commit('reverseMenuCollapsed')">
        <i :class="$store.state.menuCollapsed?'el-icon-s-unfold':'el-icon-s-fold'"></i>
      </div>&nbsp;&nbsp;
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->

        <el-breadcrumb-item
          :to="item.path"
          v-for="(item,index) in breadcrumbList"
          :key="index"
        >{{item.meta.title}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>
          <a href="/">活动管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
    </div>
    <div class="headerbar-menu">
      <el-menu mode="horizontal" router>
        <el-submenu index="username">
          <template slot="title">
            <span id="nickname">{{ nickname }}</span>
          </template>
          <el-menu-item index="/settings/security">安全设置</el-menu-item>
          <el-menu-item index="/auth/login" @click="handleLogout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      get nickname() {
        try {
          var { nickname } = JSON.parse(window.localStorage.adminInfo)
        } catch (err) {}

        return nickname || '你好'
      }
      // breadcrumbList:[]
    }
  },
  computed: {
    breadcrumbList() {
      console.log(this.$route.matched)
      return this.$route.matched.filter(item => item.path)
    }
  },
  watch: {
    $route() {
      // console.log(this.$route.matched)
    }
  },
  methods: {
    handleLogout() {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('adminInfo')

      this.$router.push('/auth/login')
    }
  }
}
</script>

<style lang="less">
.headerbar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-breadcrumb {
    display: flex;
    align-items: center;
  }
}
</style>
