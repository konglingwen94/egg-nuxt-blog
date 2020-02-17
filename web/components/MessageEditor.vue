<template>
  <el-collapse-transition>
    <div class v-show="visible">
      <el-form :status-icon="true" ref="form" :model="form" :rules="rules">
        <el-form-item prop="content">
          <el-input
            ref="content"
            placeholder="请输入内容"
            @focus="triggerFocus($event,'content')"
            @blur="triggerBlur($event,'content')"
            v-model="form.content"
            type="textarea"
            resize="vertical"
          ></el-input>
        </el-form-item>
        <div class="footer-input">
          <el-form-item prop="nickname" class="nickname-form-item">
            <el-input
              ref="nickname"
              @blur="triggerBlur($event,'nickname')"
              @focus="triggerFocus($event,'nickname')"
              v-model="form.nickname"
              placeholder="请输入昵称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              ref="email"
              v-model="form.email"
              clearable
              placeholder="请输入邮箱"
              @blur="triggerBlur($event,'email')"
              @focus="triggerFocus($event,'email')"
            >
              <el-button slot="append" @click="submit">{{labelTitle}}</el-button>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-collapse-transition>
</template>
<script>
const rules = {
  content: [{ required: true, message: '内容不能为空', trigger: 'submit' }],
  nickname: [{ required: true, message: '昵称不能为空', trigger: 'submit' }],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'submit' },
    { type: 'email', message: '请输入合法的邮箱', trigger: 'submit' }
  ]
}
export default {
  name: 'message-editor',
  data() {
    return {
      visible: true,
      form: {
        content: '',
        nickname: '',
        email: ''
      },
      rules
    }
  },
  watch: {
    visible() {
      this.clearValidate()
    }
  },
   props: {
    type: {
      type: String,
      default: 'comment'
    }
  },
  computed: {
    labelTitle() {
      return this.type === 'comment'
        ? '评论'
        : this.type === 'reply'
        ? '回复'
        : ''
    }
  },

  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    resetFields() {
      this.form.nickname = ''
      this.form.content = ''
      this.form.email = ''
    },
    clearValidate(prop) {
      if (prop) {
        this.$refs.form.clearValidate(prop)
      } else {
        this.$refs.form.clearValidate()
      }
    },
    triggerFocus(...args) {
      this.$emit('on-focus', ...args)
    },
    triggerBlur(e, prop) {
      // console.log(e.target)
      this.$emit('on-blur', e, prop)
      this.clearValidate(prop)
      setTimeout(() => {})
    },
    focus(prop) {
      this.$nextTick(() => {
        this.$refs[prop].focus()
      })
    },
    async submit() {
      try {
        var validation = await this.$refs.form.validate()
      } catch (error) {
        this.$emit('on-invalid',error)
        return
      }

      if (!validation) {
        this.$emit('error', validation)
        return
      }

      this.$emit(
        'on-submit',
        _.pick(this.form, ['content', 'nickname', 'email'])
      )
    }
  }
}
</script>
<style scoped lang="less">
.footer-input {
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  .el-form-item {
    width: 50%;
  }

  .nickname-form-item {
    margin-right: 14px;
  }
}
</style>

