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
    const { categoryID } = query

    try {
      var dataList = await ArticleService.fetchList({ categoryID })
    } catch (error) {
      return { dataList: [] }
    }
    return { dataList }
  }
}
</script>

