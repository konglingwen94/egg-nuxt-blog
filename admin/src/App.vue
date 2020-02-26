<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {

    this.$store.dispatch('initData').catch(err => {})
    // this.$store.dispatch('fetchProjectIntro').catch(err => {})
    // this.$store.dispatch('fetchProfile').catch(err => {})
  }
}
</script>
<style lang="less">
</style>


 
