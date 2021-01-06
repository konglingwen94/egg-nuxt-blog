<template functional>
  <div>
    <header>
      <Header></Header>
    </header>
    
    <main class="body">
      <nuxt></nuxt>
    </main>
    <footer>
      <!-- <Footer></Footer> -->
    </footer>
    <el-backtop :right="20"></el-backtop>
  </div>
</template>
<script>
export default {
  name:'article-layout'
}
</script>

<style lang="less" scoped>
main {
  max-width: 1100px;
  margin: auto;
}
</style>
