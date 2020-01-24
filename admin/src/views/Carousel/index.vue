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
    </div>
  </panel>
</template>

<script>
export default {
  name: 'Carousel',
  computed: {
    carousel() {
      return this.$store.state.aboutus.carousel
    }
  },
  created() {
   
    this.$store.dispatch('getAboutus')
  },
  methods: {
    
    async submit() {
      this.$store
        .dispatch('updateAboutus', { carousel: this.carousel })
        .then(() => this.$message.success('设置成功'))
        .catch( )
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

