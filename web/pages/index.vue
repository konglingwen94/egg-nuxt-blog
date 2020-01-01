<template>
  <div class="home">
    <el-carousel height="300px">
      <el-carousel-item :label="item.title" v-for="item in carouselList" :key="item.id">
        <img :src="item.cover.path" width="100%" />
      </el-carousel-item>
    </el-carousel>
    <article-list :dataList="articleList"></article-list>
  </div>
</template>

<script>
import ArticleService from '@/services/articles'
export default {
  layout: 'Public',
  async asyncData({ req }) {
    try {
      var [articleList, carouselList = []] = await Promise.all([
        // req.service.article.queryList()
        ArticleService.fetchList(),
        ArticleService.fetchCarouselList()
      ])
    } catch (error) {
      return { articleList: [], carouselList: [] }
    }
     
    return { articleList, carouselList }
  },
  data() {
    return {}
  },
  head() {
    return {
      title: 'home'
    }
  },

  methods: {
    jumpDetail(params) {
      this.$router.push({ name: 'articles-id', params })
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // display:flex;
  .article-item {
    margin-bottom: 20px;
  }
}
</style>
