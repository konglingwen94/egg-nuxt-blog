<template>
  <div class="header">
    <div class="header-content">
      <!-- <div class="theme-mode-wrapper">
        <a href="javascript:;">theme-mode</a>
      </div>-->

      <ul class="nav-list">
        <li class="nav-item">
          <nuxt-link to="/">首页</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">关于</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/archives">归档</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/guestbooks">留言墙</nuxt-link>
        </li>
      </ul>
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
  padding: 45px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.header-content {
  display: flex;
  .theme-mode-wrapper {
    width: 30%;
  }
  .nav-list {
    margin-left: auto;
    flex: 1;
    color: #333;
    display: flex;
    font-size: 22px;
    li {
      margin-left: 20px;
      :hover {
        color: red;
      }
      .nuxt-link-exact-active.nuxt-link-active {
        color: green;
        border-bottom: solid green;
      }
    }
  }
}
</style>

