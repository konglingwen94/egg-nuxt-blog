<template functional>
  <div class="container">
    <header>
      <Header></Header>
    </header>

    <main class="body">
      <nuxt></nuxt>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
    
    <el-backtop :right="10"></el-backtop>
  </div>
</template>
 
 <script>
 export default {
   name:'article-layout'
 }
 </script>
 
