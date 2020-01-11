<template>
  <div class="about" v-if="1">
      <!-- <el-divider content-position="left">关于我们</el-divider> -->
    <div class="profile-wrapper">
      <el-card header="作者介绍">
        <el-collapse :value="[1,2,3]">
          <el-collapse-item :name="1">
            <template v-slot:title>
              <span class="collapse-item-title">个人简介</span>
            </template>
            <div class="profile-item">{{profile.personal.description}}</div>
          </el-collapse-item>
          <el-collapse-item :name="2">
            <template v-slot:title>
              <span class="collapse-item-title">前端技术</span>
            </template>
            <div class="profile-item">{{profile.technology.frontend}}</div>
          </el-collapse-item>
          <el-collapse-item :name="3">
            <template v-slot:title>
              <span class="collapse-item-title">服务端技术</span>
            </template>
            <div class="profile-item">{{profile.technology.serverSide}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div class="platform-wrapper">
      <!-- <el-divider content-position="left">博客简介</el-divider> -->
      <el-card header="博客项目介绍">
        <el-collapse :value="[1,2,3]">
          <el-collapse-item :name="1" title="WEB客户端">
            <div class="platform-item">{{platform.webClient}}</div>
          </el-collapse-item>
          <el-collapse-item :name="2" title="管理后台">
            <div class="platform-item">{{platform.serverUI}}</div>
          </el-collapse-item>

          <el-collapse-item :name="3" title="服务端">
            <div class="platform-item">{{platform.serverApi}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
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
.profile-wrapper {
  margin-top: 70px;
  margin-bottom:60px;
}
.profile-item,
.platform-item {
  white-space: pre-wrap;
  line-height: 2;
}
.collapse-item-title {
  color: #409eff;
}
</style>
