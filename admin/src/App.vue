<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch('getAboutus')
  }
}
</script>
<style lang="less">
</style>


 
