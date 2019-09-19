<template>
  <div class="suggestion">
    <dl>
      <dt v-for="item in dataList" :key="item.id" class="suggestion-item">
        
          <nuxt-link
            :title="item.title"
            :to="{name:'articles-id',params:{id:item.id},query:{categoryIdList:item.categoryIds}}"
          >
          <el-link  type="primary">{{item.title}}</el-link>
          </nuxt-link>
        
      </dt>
    </dl>
  </div>
</template>
<script>
import ArticleService from '@/services/articles'
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.suggestion {
  dd {
    margin-bottom: 20px;
    margin-left: 0;
  }
}
.suggestion-item {
  line-height: 2;
  color: lightcoral;
}
</style>
