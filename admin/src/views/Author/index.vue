<template>
  <div>
    <div class="contact-wrapper">
      <el-card header="联系方式">
        <el-form
          :rules="contactRule"
          label-width="auto"
          label-suffix=" : "
          :model="contact"
          ref="contact"
        >
          <el-form-item prop="phone" label="电话">
            <el-input v-model.trim="contact.phone" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
            <el-input v-model.trim="contact.wechat" clearable></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="qq">
            <el-input v-model.trim="contact.qq" clearable></el-input>
          </el-form-item>
          <el-form-item label="Github" prop="github">
            <el-input v-model.trim="contact.github" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('contact')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
const contactRule = {
  phone: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
      message: '手机号不能为空'
    },
    {
      pattern: /^\d{11}$/,
      trigger: 'blur',
      message: '手机号格式不正确'
    }
  ],
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
  ],
  github: [
    {
      type: 'url',

      message: 'Github账号格式不正确',
      trigger: 'blur'
    }
  ],
  qq: [
    {
      pattern: /^\w{5,14}$/,

      message: 'QQ格式不正确',
      trigger: 'blur'
    }
  ]
}

export default {
  data() {
    return {
      contactRule: Object.freeze(contactRule)
    }
  },
  computed: {
    contact() {
      return this.$store.state.aboutus.contact
    }
  },
  methods: {
    async submit() {
      try {
        await this.$refs.contact.validate()
      } catch (error) {
        return
      }

      this.$store
        .dispatch('updateAboutus', { contact: this.contact })
        .then(() => {
          this.$message.success('设置联系方式成功')
        })
    }
  }
}
</script>
