<template>
  <div class="home">
    <!-- <el-carousel
      :interval="carousel.configOptions && carousel.configOptions.interval"
      :loop="carousel.configOptions&&carousel.configOptions.loop"
      height="380px"
      :autoplay="carousel.configOptions&&carousel.configOptions.autoplay"
    >
      <el-carousel-item :label="index+1" v-for="(item,index) in carousel.data" :key="item.id">
        <nuxt-link
          :to="{name:'articles-id',params:{id:item.id,},query:{tagIdList:item.tagIdList}}"
          class="carousel-content"
        >
          <img v-if="item.cover.path" :src="item.cover.path" />
          <div class="description">
            <h1>{{item.title}}</h1>
            <div class="pv">
              <label for>浏览量:</label>
              <span>{{item.pv}}</span>
            </div>
            <div class="starCount">
              <label for>收藏数:</label>
              <span>{{item.starCount}}</span>
            </div>
            <time>{{new Date(item.createdAt).toLocaleString()}}</time>
          </div>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel> -->
    <article-list :dataList="articleList"></article-list>
  </div>
</template>

<script>
import ArticleService from '@/services/articles'
export default {
  layout: 'public',
  data(){
    return {
      articleList:[],
      carousel:{}
    }
  },
   
  async asyncData({ req, query }) {
    try {
      var [articleList, carousel = {}] = await Promise.all([
        // req.service.article.queryList()
        ArticleService.fetchList(),
        ArticleService.fetchCarouselList()
      ])
    } catch (error) {
      return { articleList: [], carousel: {} }
    }

    return { articleList, carousel }
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
    // padding:0 30px;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: lightblue;
    img {
      // object-position: center -250px;
      // margin-left: -30px;
      // margin-right:40px;
      width: 50%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }

    div.description {
      margin-left: 30px;
      margin-right: 30px;
      text-align: center;
      flex: 1;
      h1 {
        text-align: center !important;
        .text-overflow-hidden(2);
      }
      // margin-left:
    }
  }
}
</style>
