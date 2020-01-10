<template>
  <div>
    <div class="profile-wrapper">
      <el-card header="个人简介">
        <el-form ref="profile">
          <el-form-item label="个人资料">
            <el-input type="textarea" :rows="5" v-model.trim="profile.personal"></el-input>
          </el-form-item>
          <el-form-item label="前端技术">
            <el-input
              type="textarea"
              :rows="5"
              v-model.trim="profile.technology.frontend"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="服务端技术">
            <el-input
              type="textarea"
              :rows="5"
              v-model.trim="profile.technology.serverSide"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card header="联系方式" v-if="0">
        <el-form
          :rules="profileRule"
          label-width="auto"
          label-suffix=" : "
          :model="profile"
          ref="profile"
        >
          <el-form-item label="微信" prop="wechat">
            <el-input v-model.trim="profile.wechat" clearable></el-input>
          </el-form-item>

          <el-form-item label="Github" prop="github">
            <el-input v-model.trim="profile.github" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
const profileRule = {
  wechat: [
    {
      required: true,
      trigger: 'blur',
      message: '微信号不能为空'
    },
    {
      pattern: /^\w+$/,
      trigger: 'blur',
      message: '微信号格式不正确'
    }
  ]
}

export default {
  name: 'Profile',
  data() {
    return {
      personal: ''

      // profileRule: Object.freeze(profileRule)
    }
  },
  computed: {
    profile() {
      return this.$store.state.aboutus.profile
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.profile.validate()
      } catch (error) {
        return
      }

      const {
        personal,
        technology: { serverSide, frontend }
      } = this.profile
      console.log(frontend, serverSide)
      if (!personal) {
        this.$message.warning('请输入个人资料内容')
        return
      }
      if (!frontend) {
        this.$message.warning('请输入前端技术内容')
        return
      }

      if (!serverSide) {
        this.$message.warning('请输入服务端技术内容')
        return
      }

      const payload = {
        personal,
        technology: { frontend, serverSide }
      }

      this.$store.dispatch('updateAboutus', { profile: payload }).then(() => {
        this.$message.success('设置个人简介成功')
      })
    }
  }
}
</script>
