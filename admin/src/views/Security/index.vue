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
        <el-form-item label="昵称">
          <el-input v-model="nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveNicknameHandle">保存</el-button>
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
      nickname: ''
    }
  },
  created() {
    try {
      var adminInfo = JSON.parse(localStorage.adminInfo)
    } catch (error) {
      return
    }

    this.nickname = adminInfo.nickname
  },
  methods: {
    saveNicknameHandle() {
      if (!this.nickname) {
        this.$message.error('请输入昵称')
        return
      }
      try {
        var adminInfo = JSON.parse(localStorage.adminInfo)
      } catch (error) {
        return
      }
      AuthApi.updateAccount(adminInfo.id, { nickname: this.nickname })
        .then(() => {
          this.$message.success('修改昵称成功')
          document.getElementById('nickname').innerHTML = this.nickname
          adminInfo.nickname = this.nickname

          localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
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
