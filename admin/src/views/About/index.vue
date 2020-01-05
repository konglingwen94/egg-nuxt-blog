<template>
  <panel class="about">
    <div v-if="id" slot="header">
      <el-button type="primary" @click="resetConfig">重置</el-button>
    </div>

    <div class="carousel-wrapper">
      <el-card header="轮播图配置">
        <el-form :model="carousel" label-suffix=" : ">
          <el-form-item label="轮播图个数">
            <el-input-number
              :step="1"
              :max="10"
              :min="1"
              :step-strictly="true"
              :precision="0"
              v-model.number="carousel.number"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="轮播图排序">
            <el-radio-group v-model="carousel.sort">
              <el-radio label="pv">浏览量</el-radio>
              <el-radio label="starCount">收藏个数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="自动切换时间 (毫秒)">
            <el-input-number
              :min="500"
              :step="500"
              :precision="0"
              label="ddd"
              v-model="carousel.interval"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="是否自动播放">
            <el-switch v-model="carousel.autoplay"></el-switch>
          </el-form-item>
          <el-form-item label="是否循环播放">
            <el-switch v-model="carousel.loop"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('carousel')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="profile-wrapper">
      <el-card header="博主简介">
        <el-form :model="profile" ref="profile">
          <el-form-item prop="profile" :rules="{required:true,trigger:'blur',message:'博主简介不能为空'}">
            <el-input type="textarea" clearable :rows="4" v-model="profile.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('profile')" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div>
      <el-card header="博客简介">
        <el-form :model="platform" ref="platform">
          <el-form-item
            prop="description"
            :rules="{required:true,trigger:'blur',message:'描述信息不能为空'}"
          >
            <el-input type="textarea" clearable :rows="4" v-model="platform.description"></el-input>
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
const mapStateKey = {
  profile: '博主简介',
  platform: '博客简介',
  carousel: '轮播图'
}
export default {
  name: 'About',
  data: () => ({
    profile: {
      // description: ''
    },
    platform: {
      // description: ''
    },
    id: '',
    carousel: {
      // number: -1,
      // sort: '',
      // autoplay: false,
      // loop: false,
      // interval: -1
    }
  }),
  created() {
    AboutApi.fetchOne().then(response => {
      _.assign(this.$data, response)
    })
  },
  methods: {
    async resetConfig() {
      try {
        await this.$confirm('您确定要恢复默认设置吗', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      AboutApi.resetOne(this.id)
        .then(result => {
          this.$message.success('重置配置成功')
          // invokeDeepObject(this.state)
          _.merge(this.$data, result)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    async submit(key) {
      console.log(key)
      const validationResult = await this.$refs[key].validate()

      console.log(validationResult)

      const { id } = this
      const payload = { [key]: this.$data[key] }
      const action = id
        ? AboutApi.updateOne(id, payload)
        : AboutApi.createOne(payload)
      action
        .then(response => {
          if (response.id) {
            this.id = response.id
          }
          this.$message.success(`设置${mapStateKey[key]}成功`)
        })
        .catch(err => this.$message.error(err.message))
    }
  }
}
</script>
<style lang="less" scoped>
.profile-wrapper {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>

