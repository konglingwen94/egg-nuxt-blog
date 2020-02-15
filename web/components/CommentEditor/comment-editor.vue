<template>
  <div class="comment" v-show="visible">
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
                <el-button
                  slot="append"
                  :loading="processStatus==='loading'"
                  type="primary"
                  @click="submit"
                >{{editingType==='Comment'?'评论':'回复'}}</el-button>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import extendOption from './baseOption'
export default {
  extends: extendOption,
  data() {
    return {
    }
  },

  computed: {
    editorTitle() {
      return this.editorType === 'message'
        ? '评论'
        : this.editorType === 'reply'
        ? '回复'
        : ''
    }
  },
  mounted() {
    // this.$el.addEventListener('DOMNodeRemovedFromDocument', (...args) => {
    //   console.log('DOMNodeRemovedFromDocument', args)
    // })
  },
  methods: {
    // remove() {
    //   this.$el.remove()
    // },
    // append() {
    //   // this.visible = false
    //   this.$emit('update:visible', false)
    // },
    clearForm() {
      this.form.content = ''
      this.form.email = ''
      this.form.nickname = ''
    },
    focus() {
      this.$refs.contentInput.focus()
    },
    reset() {
      // this.clearField()
      // this.loading = false
      // this.$refs.form.resetFields()
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

      return { content, email, nickname }
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
