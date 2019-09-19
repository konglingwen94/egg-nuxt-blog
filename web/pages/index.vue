<template>
  <div class="home">
    <article-list :dataList="dataList"></article-list>
  </div>
</template>

<script>
import ArticleService from '@/services/articles'

export default {
  layout: 'Public',
  async asyncData() {
    try {
      var dataList = await ArticleService.fetchList()
    } catch (error) {}

    return { dataList }
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
