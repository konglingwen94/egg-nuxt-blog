<template>
  <div class="container">
    <el-form label-width="auto">
      <el-form-item label="用户名">
        <el-input ref="userInput" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitHandler">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import authApi from '@/api/auth'

export default {
  data: () => ({
    form: {
      username: '',
      password: ''
    }
  }),
  mounted() {
    this.$refs.userInput.focus()
  },
  methods: {
    submitHandler() {
      const { username, password } = this.form

      if (!username) {
        this.$message.error('请输入用户名')
        return
      }

      if (!password) {
        this.$message.error('请输入密码')
        return
      }

      if (password.length < 6) {
        this.$message.error('密码的最小长度为六位')
        return
      }

      return authApi
        .login({ username, password })
        .then(data => {
          localStorage.setItem('adminInfo', JSON.stringify(data.adminInfo))
          localStorage.setItem('accessToken', data.token)

          this.$router.push('/')
        })
        .catch(err => {
        })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
