<template>
  <div class="comment" v-show="show">
    <div class="comment-wrapper">
      <div class="comment-content">
        <el-form :model="form" ref="form">
          <el-form-item prop="content">
            <el-input
              ref="contentInput"
              :autosize="{minRows:3,maxRows:5}"
              autofocus
              v-model="form.content"
              placeholder="请输入内容（必填）"
              :rows="4"
              type="textarea"
            ></el-input>
          </el-form-item>
          <div class="bottom">
            <el-form-item class="email-item" prop="email">
              <el-input v-model="form.email" clearable placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入昵称">
                <el-button slot="append" :loading="loading" type="primary" @click="submit">确定</el-button>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
const rules = {
  content: [{ required: true, message: '不能为空', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', trigger: 'blur', message: '请输入合法的邮箱地址' }
  ],
  nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }]
}
export default {
  name: 'Comment',
  data() {
    return {
      show: false,
      rules: Object.freeze(rules),
      loading: false,
      form: {
        content: '',
        nickname: '',
        email: ''
      }
    }
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    committing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showForm() {
      this.show = true
      return this
    },
    hideForm() {
      this.show = false
      return this
    },
    clearField() {
      this.form.content = ''
      this.form.email = ''
      this.form.nickname = ''
    },
    focus() {
      this.$refs.contentInput.focus()
    },
    reset() {
      // this.clearField()
      this.loading = false
      this.$refs.form.resetFields()
    },

    async submit() {
      const { email, content, nickname } = this.form

      if (!content) {
        return this.$message.warning('请输入内容')
      }

      if (!email) {
        return this.$message.warning('请输入邮箱')
      }

      if (!nickname) {
        return this.$message.warning('请输入昵称')
      }

      this.$emit('pass-validate', this.form)
    }
  }
}
</script>
<style lang="less">
.bottom {
  display: flex;
  /* justify-content:space-around; */
  .email-item {
    margin-right: 10px;
  }
}
</style>
