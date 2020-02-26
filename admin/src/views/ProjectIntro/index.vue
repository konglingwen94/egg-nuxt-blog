<template>
  <div class="profile-wrapper">
    <el-form :model="platform" label-suffix=" : ">
      <el-form-item label="客户端简介" prop="webClient">
        <el-input type="textarea" clearable :rows="5" v-model.lazy="platform.webClient"></el-input>
      </el-form-item>
      <el-form-item label="管理后台简介" prop="serverUI">
        <el-input type="textarea" clearable :rows="5" v-model.lazy="platform.serverUI"></el-input>
      </el-form-item>
      <el-form-item label="服务端简介" prop="serverApi">
        <el-input type="textarea" clearable :rows="5" v-model.lazy="platform.serverApi"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name:'project-intro',
  computed: {
    platform() {
      return this.$store.state.configuration.projectIntro.platform
    },
    projectIntro(){
      return this.$store.state.configuration.projectIntro
    }
  },
  methods: {
    submit() {
      const { webClient, serverUI, serverApi } = this.platform

      if (!webClient) {
        return this.$message.error('请输入客户端简介')
      }
      if (!serverUI) {
        return this.$message.error('请输入管理后台简介')
      }

      if (!serverApi) {
        return this.$message.error('请输入服务端简介')
      }

      this.$store
        .dispatch('updateProjectIntro',  {
          platform: { webClient, serverUI, serverApi },
          
        })
        .then(() => {
          this.$message.success('项目简介设置成功')
        })
    }
  }
}
</script>
