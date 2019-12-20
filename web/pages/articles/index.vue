<template>
  <div class="article">
    <article-list :dataList="dataList"></article-list>
  </div>
</template>

<script>
import ArticleService from '@/services/articles'
export default {
  layout: 'Public',

  async asyncData({ query, params }) {
    const { category, tagID } = query
    const payload = category ? { category } : tagID ? { tagID } : {}
    
    try {
      var dataList = await ArticleService.fetchList(payload)
    } catch (error) {
      return { dataList: [] }
    }
    return { dataList }
  }
}
</script>

