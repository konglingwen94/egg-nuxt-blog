<template>
  <div class="about" v-if="1">
    <div class="profile-wrapper">
      <el-divider content-position="left">作者简介</el-divider>
      <div class="profile-content">{{profile.personal.description}}</div>
    </div>
    <div class="platform-wrapper">
      <el-divider content-position="left">博客简介</el-divider>
      <div class="platform-content">{{platform.description}}</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'

export default {
  name: 'Aboutus',
  layout: 'Public',
  computed: {
    profile() {
      return this.$store.state.aboutus.profile
    },
    platform() {
      return this.$store.state.aboutus.platform
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="less">
[class$='wrapper'] {
  margin: 90px 0;
}

.profile-content {
  white-space: pre-wrap;
  line-height: 2;
  margin-left: 30px;
}

.contact-wrapper {
  .contact-content div {
    margin: 20px 0;
  }
}
</style>
