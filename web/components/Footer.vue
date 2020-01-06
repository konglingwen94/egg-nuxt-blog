<template>
  <div class="footer" v-if="1">
    <!-- {{contact}} -->
    <div class="contact-wrapper">
      <el-divider content-position="left">联系方式</el-divider>
      <div class="contact-content">
        
        <div class="wechat">
          <label for>微信</label> :
          <span>{{contact.wechat}}</span>
        </div>
        <div class="qq">
          <label for>QQ</label> :
          <span>{{contact.qq}}</span>
        </div>
        <div class="github">
          <label for>Github</label> :
          <el-link target="_blank" :href="contact.github">{{contact.github}}</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  computed:{
    contact(){
      // console.log(this.$store.state.aboutus)
      return this.$store.state.aboutus.contact
    }
  },
  async created() {
    // console.log(service)
  }
}
</script>

<style lang="less" scoped>
.footer {
  // text-align: center;
}
</style>
