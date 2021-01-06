<template>
  <div class="container">
    <h1 class="header">博客管理后台</h1>
    <div class="body">
      <router-view></router-view>
    </div>
    <!-- <div class="footer">footer</div> -->
  </div>
</template>
<style lang="less" scoped>
.header {
  margin-top: 300px;
  text-align: center;
}

.body {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 380px;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  text-align: center;
}
</style>

