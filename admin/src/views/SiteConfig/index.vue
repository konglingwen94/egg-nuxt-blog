<template>
  <panel class="about">
    <!-- <div v-if="id" slot="header">
      <el-button type="primary" @click="resetConfig">重置</el-button>
    </div>-->

    <div class="carousel-wrapper">
      <el-card header="轮播图配置">
        <el-form :model="carousel" label-suffix=" : " label-position="left">
          <el-form-item label="轮播图个数">
            <el-input-number
              :step="1"
              :max="carousel.isPublishedArticleCount"
              :min="1"
              :step-strictly="true"
              :precision="0"
              v-model.lazy.number="carousel.number"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="轮播图排序">
            <el-radio-group v-model="carousel.sort">
              <el-radio label="pv">浏览量</el-radio>
              <el-radio label="starCount">收藏个数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label-width="150px" label="自动切换时间 (毫秒)">
            <el-slider
              :min="500"
              :max="5000"
              :step="500"
              :precision="0"
              show-input
              show-stops
              v-model="carousel.interval"
            ></el-slider>
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
      <br />
      <br />
      <el-card header="评论配置">
        <el-form>
          <el-form-item label="渲染层级">
            <el-input-number v-model="message.renderLayer" :min="1" :max="4"></el-input-number>
          </el-form-item>
          <el-form-item label="默认展开层级">
            <el-input-number v-model="message.expandLayer" :min="1" :max="4"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit('message')">保存</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </panel>
</template>

<script>
 
export default {
  name: 'SiteConfig',
  
  computed: {
    siteConfig() {
      return this.$store.state.configuration.siteConfig
    },
    message() {
      return this.siteConfig.message
    },
    carousel() {
      return this.siteConfig.carousel
    }
  },
   
  methods: {
    submit(type) {
      const payload = { [type]: this[type] }
this.$store.dispatch('updateSiteConfig',payload).catch(err=>{})

      
    }
  }
}
</script>
<style lang="less" scoped>
[class$='wrapper'] {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>

