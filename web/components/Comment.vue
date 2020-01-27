<template>
  <div class="comment">
    <div class="comment-wrapper">
      <div class="comment-content">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="content">
            <el-input
              :autosize="{minRows:3,maxRows:5}"
              autofocus
              v-model="form.content"
              placeholder="请输入内容"
              :rows="4"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" clearable placeholder="请输入邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
// import Vue from 'vue'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ElementUI)

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
      rules: Object.freeze(rules),
      // loading: false,
      form: {
        content: '',
        nickname: '',
        email: ''
      }
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clearField() {
      this.form.content = ''
      this.form.email = ''
      this.form.nickname = ''
    },
    async submit() {
      try {
        var validationResult = await this.$refs.form.validate()
      } catch (err) {
        return err
      }

      if (!validationResult) {
        return
      }
      this.$emit('pass-validate', this.form)
    }
  }
}
</script>
<style>
</style>
