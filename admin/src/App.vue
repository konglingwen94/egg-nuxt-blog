<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {

    this.$store.dispatch('fetchSiteConfig').catch(err => {})
    this.$store.dispatch('fetchProjectIntro').catch(err => {})
  }
}
</script>
<style lang="less">
</style>


 
