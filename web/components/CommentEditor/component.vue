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
                >{{editorTitle}}</el-button>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import extendOption from './extendOption.js'

export default {
  extends: extendOption,
  data() {
    return {
      loading: false
    }
  },

  watch: {
     
  },

  computed: {
    processStatusText() {
      return mapStatus[this.processStatus]
    },
     
  },
  methods: {
    validate() {
      const { email, content, nickname } = this.form

      if (!content && this.requiredItemFields.includes('content')) {
        return this.$message.warning('请输入内容')
      }

      if (!email && this.requiredItemFields.includes('email')) {
        return this.$message.warning('请输入邮箱')
      }

      if (!nickname && this.requiredItemFields.includes('nickname')) {
        return this.$message.warning('请输入昵称')
      }
      const payload = { content, nickname, email }
      this.$emit('success-validate', payload)
      return { content, email, nickname }
    }
  }
}
</script>
<style lang="less" scoped>
.bottom {
  display: flex;
  /* justify-content:space-around; */
  .email-item {
    margin-right: 10px;
  }
}
</style>
