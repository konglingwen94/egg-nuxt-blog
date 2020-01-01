<template>
  <div class="article">
    <div class="banner" :style="bannerStyle">
      <h1>{{archiveInfo.name}}</h1>
      <span>{{archiveInfo.articleCount}}</span>
    </div>

    <article-list :dataList="dataList"></article-list>
  </div>
</template>

<script>
import ArticleService from '@/services/articles'
import TagService from '@/services/tags'
import CategoryService from '@/services/categories'
export default {
  layout: 'Public',

  async asyncData({ query, params }) {
    const { categoryID, tagID } = query
    let payload, fetchArchiveData
    if (categoryID) {
      payload = { categoryID }
      fetchArchiveData = CategoryService.fetchOne(categoryID)
    } else if (tagID) {
      payload = { tagID }
      fetchArchiveData = TagService.fetchOne(tagID)
    }

    // const archive
    try {
      var [dataList, archiveInfo] = await Promise.all([
        ArticleService.fetchList(payload),
        fetchArchiveData
      ])
    } catch (error) {
      return { dataList: [], archiveInfo: {} }
    }

    return { dataList, archiveInfo }
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

