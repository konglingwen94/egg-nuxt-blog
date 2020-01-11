<template>
  <div>
    <div class="profile-wrapper">
      <el-card header="个人简介" style="margin-bottom:19px;">
        <el-form label-suffix=":">
          <el-form-item label="个人资料">
            <el-input type="textarea" :rows="5" v-model.trim="profile.personal.description"></el-input>
          </el-form-item>
          <div class="contact-container">
            <label for>联系方式</label>
            <br />
            <br />
            <el-form-item
              label-width="60px"
              :label="item.label"
              v-for="(item ,key) in profile.personal.contact"
              :key="key"
            >
              <el-input
                ref="contactItems"
                style="width:80%;margin-right:10px;"
                v-model.trim="item.value"
              ></el-input>
              <el-button
                v-if="key===profile.personal.contact.length-1 && key>0"
                @click="profile.personal.contact.pop()"
                type="danger"
                size="mini"
              >删除</el-button>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button type="primary" @click="submitPersonal">保存</el-button>
            <el-button type="primary" @click="addContactItem">添加联系方式</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card header="技术介绍">
        <el-form ref="technology">
          <el-form-item label="前端技术">
            <el-input
              type="textarea"
              :rows="5"
              v-model.trim="profile.technology.frontend"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="服务端技术">
            <el-input
              type="textarea"
              :rows="5"
              v-model.trim="profile.technology.serverSide"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card header="联系方式" v-if="0">
        <el-form
          :rules="profileRule"
          label-width="auto"
          label-suffix=" : "
          :model="profile"
          ref="profile"
        >
          <el-form-item label="微信" prop="wechat">
            <el-input v-model.trim="profile.wechat" clearable></el-input>
          </el-form-item>

          <el-form-item label="Github" prop="github">
            <el-input v-model.trim="profile.github" clearable></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profile',
  data() {
    return {}
  },
  computed: {
    profile() {
      return this.$store.state.aboutus.profile
    }
  },
  methods: {
    addContactItem() {
      this.$prompt('请输入联系方式标签', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          if (!value) {
            return '联系方式标签不能为空'
          }
          return true
        }
      })
        .then(async ({ value }) => {
          this.profile.personal.contact.push({ label: value })
          await this.$nextTick()
          this.$refs.contactItems[
            this.profile.personal.contact.length - 1
          ].focus()
        })
        .catch(console.info)
    },
    submitPersonal() {
      const {
        personal: { description, contact }
      } = this.profile

      if (!description) {
        return this.$message.warning('个人介绍不能为空')
      }

      try {
        contact.forEach(item => {
          if (!item.value) {
            this.$message.warning(`${item.label}不能为空`)
            throw new Error(`${item.label}不能为空`)
          }
        })
      } catch (err) {
        console.error(err)
        return
      }

      const payload = { personal: { name, description, contact } }

      this.$store.dispatch('updateAboutus', { profile: payload }).then(() => {
        this.$message.success('修改个人介绍成功')
      })
    },
    async submit() {
      try {
        await this.$refs.profile.validate()
      } catch (error) {
        return
      }

      const {
        personal: {
          name,
          description,
          contact: { github }
        },
        technology: { serverSide, frontend }
      } = this.profile
      console.log(frontend, serverSide)
      if (!name) {
        this.$message.warning('请输入姓名')
        return
      }
      if (!description) {
        this.$message.warning('请输入个人描述')
        return
      }
      if (!github) {
        this.$message.warning('请输入联系方式')
        return
      }
      if (!frontend) {
        this.$message.warning('请输入前端技术内容')
        return
      }

      if (!serverSide) {
        this.$message.warning('请输入服务端技术内容')
        return
      }

      const payload = {
        personal: { name, description, contact: { github } },
        technology: { frontend, serverSide }
      }

      this.$store.dispatch('updateAboutus', { profile: payload }).then(() => {
        this.$message.success('设置个人简介成功')
      })
    }
  }
}
</script>
