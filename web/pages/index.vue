<template>
  <div class="home">
    <el-carousel height="300px" :autoplay="false">
      <el-carousel-item :label="index+1" v-for="(item,index) in carouselList" :key="item.id">
        <nuxt-link
          :to="{name:'articles-id',params:{id:item.id,},query:{tagIdList:item.tagIdList}}"
          class="carousel-content"
        >
          <img :src="item.cover.path" />
          <div class="description">
            <h1>{{item.title}}</h1>
            <time>{{new Date(item.createdAt).toLocaleDateString()}}</time>
          </div>
        </nuxt-link>
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

.el-carousel {
  margin: 0 -74px;
}

.el-carousel__item {
  .carousel-content {
    display: flex;
    align-items: center;
    height: 100%;
    background-color: lightblue;
    img {
      // object-position: center -250px;
      margin-right: 80px;
      width: 50%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    div.description {
      padding-right: 50px;
      flex: 1;
      h1 {
        .text-overflow-hidden(2);
      }
      // margin-left:
    }
  }
}
</style>
