<template>
  <div class="collection">
    <article-list :dataList="dataList"></article-list>
  </div>
</template>


<script>
import ArticleService from '@/services/articles'
export default {
  layout: 'Public',
  async created() {
    const idList = this.$store.state.article.starIdList
    // console.log(store)

    if (!idList.length) {
      return
    }

    try {
      this.dataList = await ArticleService.fetchList({ idList })
    } catch (error) {
      this.dataList = []
    }
  },
  data() {
    return {
      dataList: []
    }
  }
}
</script>

