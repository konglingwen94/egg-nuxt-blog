<template>
  <div class="article">
    <div class="banner" :style="bannerStyle">
      <h1>{{archiveInfo.name}}</h1>
      <span>{{archiveInfo.articlePublishedCount}}</span>
    </div>

    <article-list :dataList="archiveInfo.articleList"></article-list>
  </div>
</template>

<script>
// import ArticleService from '@/services/articles'
import TagService from '@/services/tags'
import CategoryService from '@/services/categories'
export default {
  layout: 'Public',

  async asyncData({ query, params }) {
    const { categoryID, tagID } = query

    const action = categoryID
      ? CategoryService.fetchOne(categoryID)
      : tagID
      ? TagService.fetchOne(tagID)
      : null

    try {
      var archiveInfo = await action
    } catch (error) {
      return { archiveInfo: {} }
    }

    return { archiveInfo }
  },
  data() {
    return {
      archiveInfo: { cover: {} }
    }
  },
  computed: {
    bannerStyle() {
      return {
        background: `url(${this.archiveInfo.cover.path})no-repeat center/100%`
      }
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -74px;
  flex-direction: column;
  color: white;
  h1 {
    margin-bottom: 20px;
  }
}
</style>

