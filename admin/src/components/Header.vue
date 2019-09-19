<template>
  <header class="headerbar">
    <div class>
      <el-page-header @back="$router.back()" :content="$route.meta.title"></el-page-header>
    </div>
    <div class="headerbar__menu">
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
  </header>
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
  .el-badge__content.is-fixed {
    // top: 20px;
  }
  .el-page-header {
    margin-top: 20px;
  }
}

.headerbar {
  display: flex;
  justify-content: space-between;
  // margin: 0 -20px;
  // overflow: hidden;
  background-color: #fff;

  &__menu {
    // float: right;
  }
}
</style>
