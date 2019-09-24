<template>
  <panel class="about">
    <div v-if="state.id" slot="header">
      <el-button type="primary" @click="resetConfig">重置</el-button>
    </div>
    <div class="profile-wrapper">
      <el-card header="博主简介">
        <el-form>
          <el-form-item>
            <el-input type="textarea" clearable :rows="4" v-model="state.profile.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('profile')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div>
      <el-card header="博客简介">
        <el-form>
          <el-form-item>
            <el-input type="textarea" clearable :rows="4" v-model="state.platform.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('platform')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </panel>
</template>

<script>
import AboutApi from '@/api/abouts'
import { invokeDeepObject } from '@/utils/helper'

export default {
  name: 'About',
  data: () => ({
    state: {
      profile: {
        description: ''
      },
      platform: {
        description: ''
      }
    }
  }),
  created() {
    AboutApi.fetchOne().then(response => {
      for (let key in response) {
        this.$set(this.state, key, response[key])
      }
    })
  },
  methods: {
    resetConfig() {
      AboutApi.deleteOne(this.state.id)
        .then(() => {
          this.$message.success('重置配置成功')
          invokeDeepObject(this.state)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    submit(key) {
      const { id } = this.state
      const payload = { [key]: this.state[key] }
      const action = id
        ? AboutApi.updateOne(id, payload)
        : AboutApi.createOne(payload)
      action
        .then(response => {
          if (id) {
          } else {
            this.$set(this.state, 'id', response.id)
          }
          this.$message.success(`设置${key}成功`)
        })
        .catch(err => this.$message.error(err.message))
    }
  }
}
</script>
<style lang="less" scoped>
.profile-wrapper {
  margin-bottom: 20px;
}
</style>

