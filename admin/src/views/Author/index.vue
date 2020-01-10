<template>
  <div>
    <div class="author-wrapper">
      <el-card header="个人简介">
        <el-form>
          <el-form-item label="个人资料">
            <el-input type="textarea" :rows="5" v-model="personal"></el-input>
          </el-form-item>
          <el-form-item label="前端技术">
            <el-input type="textarea" :rows="5" clearable></el-input>
          </el-form-item>
          <el-form-item label="服务端技术">
            <el-input type="textarea" :rows="5" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card header="联系方式" v-if="0">
        <el-form
          :rules="authorRule"
          label-width="auto"
          label-suffix=" : "
          :model="author"
          ref="author"
        >
          <el-form-item prop="phone" label="电话">
            <el-input v-model.trim="author.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input v-model.trim="author.wechat" clearable></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model.trim="author.qq" clearable></el-input>
          </el-form-item>
          <el-form-item label="Github" prop="github">
            <el-input v-model.trim="author.github" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('author')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
const authorRule = {
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
  data() {
    return {
      personal: '',
      // authorRule: Object.freeze(authorRule)
    }
  },
  computed: {
    author() {
      return this.$store.state.aboutus.author
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.author.validate()
      } catch (error) {
        return
      }

      this.$store
        .dispatch('updateAboutus', { author: this.author })
        .then(() => {
          this.$message.success('设置联系方式成功')
        })
    }
  }
}
</script>
