<template>
  <div class="profile-wrapper">
    <el-form :model="profile" label-suffix=" : " ref="intro">
      <el-form-item
        label="作者介绍"
        prop="description"
        :rules="{required:true,trigger:'blur',message:'博主简介不能为空'}"
      >
        <el-input type="textarea" clearable :rows="8" v-model.lazy.trim="profile.description"></el-input>
      </el-form-item>
      <el-form-item
        label="平台介绍"
        prop="description"
        :rules="{required:true,trigger:'blur',message:'描述信息不能为空'}"
      >
        <el-input type="textarea" clearable :rows="7" v-model.trim.lazy="platform.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit('profile')" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  computed: {
    profile() {
      return this.$store.state.aboutus.profile
    },
    platform() {
      return this.$store.state.aboutus.platform
    }
  },
  methods: {
    submit() {
      const { profile, platform } = this

      if (!profile.descrition) {
        return this.$message.error('作者简介不能为空')
      }
      if (!platform.descrition) {
        return this.$message.error('平台简介不能为空')
      }

      this.$store
        .dispatch('updateAboutus', {
          profile: this.profile,
          platform: this.platform
        })
        .then(() => {
          this.$message.success('设置简介成功')
        })
    }
  }
}
</script>
