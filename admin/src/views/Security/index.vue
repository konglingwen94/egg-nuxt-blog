<template>
  <div class>
    <div class="password-container">
      <el-card>
        <el-form>
          <el-form-item label="原密码">
            <el-input v-model="form.oldPassword" :minlength="6" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword" :minlength="6" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.checkPassword" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="savePassHandle">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <el-card>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userForm.nickname" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfoHandle">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import AuthApi from '@/api/auth'

export default {
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      userForm: {
        nickname: '',
        username: ''
      }
    }
  },
  created() {
    try {
      var adminInfo = JSON.parse(localStorage.adminInfo)
    } catch (error) {
      return
    }

    _.assign(this.userForm, _.pick(adminInfo, ['username', 'nickname']))
  },
  methods: {
    saveUserInfoHandle() {
      const { nickname, username } = this.userForm
      if (!username) {
        this.$message.error('请输入用户名')
        return
      }
      if (!nickname) {
        this.$message.error('请输入昵称')
        return
      }
      try {
        var adminInfo = JSON.parse(localStorage.adminInfo)
      } catch (error) {
        return
      }
      const payload = { username, nickname }
      AuthApi.updateAccount(adminInfo.id, payload)
        .then(() => {
          this.$message.success('账户修改成功')
          
          document.getElementById('nickname').innerHTML = nickname

          localStorage.setItem(
            'adminInfo',
            JSON.stringify(_.assign(adminInfo, payload))
          )
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    savePassHandle() {
      const { oldPassword, newPassword, checkPassword } = this.form

      if (!oldPassword) {
        this.$message.error('请输入原密码')
        return
      }

      if (oldPassword.length < 6) {
        this.$message.error('原密码长度不得小于六位')
        return
      }

      if (!newPassword) {
        this.$message.error('请输入新密码')
        return
      }

      if (oldPassword.length < 6) {
        this.$message.error('请输入大于六位的新密码')
        return
      }

      if (!checkPassword) {
        this.$message.error('请再次输入密码')
        return
      }

      if (checkPassword !== newPassword) {
        this.$message.error('两次输入密码不一致')
        return
      }
      try {
        var { id } = JSON.parse(localStorage.adminInfo)
      } catch (error) {
        return
      }
      const payload = {
        oldPassword,
        newPassword
      }

      AuthApi.changePassword(id, payload)
        .then(() => {
          this.$message.success('密码修改成功')
          for (let key in this.form) {
            if (this.form.hasOwnProperty(key)) {
              this.form[key] = ''
            }
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.password-container {
  margin-bottom: 30px;
}
</style>
