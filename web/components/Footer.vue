<template>
  <div class="footer" v-if="1">
    <!-- {{contact}} -->
    <el-divider content-position="left"></el-divider>
    <div class="contact-wrapper">
      <div class="contact-content" v-if="1">
        <div class="contact-item" v-for="(item,key) in contact" :key="key">
          <label for>{{item.label}}</label> :
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  computed: {
    contact() {
      // console.log(this.$store.state.aboutus)
      return (
        (this.$store.state.aboutus.profile &&
          this.$store.state.aboutus.profile.personal &&
          this.$store.state.aboutus.profile.personal.contact) ||
        {}
      )
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
