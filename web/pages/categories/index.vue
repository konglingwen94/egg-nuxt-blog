<template>
  <div class>
    <el-divider content-position="left">
      <i class="el-icon-collection-tag">
        <span class="icon-inner-text">分类</span>
      </i>
    </el-divider>

    <ul class="category-list">
      <li class="category-item" v-for="item in dataList" :key="item.id">
        <el-badge :value="item.articleIdList.length">
          <el-tag type="info">
            <nuxt-link :to="{name:'articles',query:{ categoryID:item.id}}">{{item.name}}</nuxt-link>
          </el-tag>
        </el-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import CategoryService from '@/services/article-categories'

export default {
  layout: 'Public',
  async asyncData() {
    const dataList = await CategoryService.fetchList()

    return { dataList }
  }
}
</script>

<style lang="less" scoped>
.icon-inner-text {
  margin-left: 3px;
}
.category-list {
  margin-top: 30px;
  display: flex;
  .category-item {
    margin-left: 20px;
  }
}
</style>
