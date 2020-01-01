<template>
  <div class="archive">
    <div class="category">
      <el-divider content-position="left">
        <i class="el-icon-collection-tag">
          <span class="icon-inner-text">分类</span>
        </i>
      </el-divider>

      <ul class="category-list">
        <template v-for="item in categoryList">
          <li class="category-item" :key="item.id">
            <el-badge :value="item.articlePublishedCount">
              <nuxt-link :to="{name:'articles',query:{ categoryID:item.id}}">
                <el-tag  type="info">{{item.name}}</el-tag>
              </nuxt-link>
            </el-badge>
          </li>
        </template>
      </ul>
    </div>
    <div class="tag">
      <el-divider content-position="left">
        <i class="el-icon-collection-tag">
          <span class="icon-inner-text">标签</span>
        </i>
      </el-divider>
      <ul class="category-list">
        <template v-for="item in tagList">
          <li class="category-item" :key="item.id">
            <el-badge :value="item.articlePublishedCount">
              <nuxt-link :to="{name:'articles',query:{ tagID:item.id}}">
                <el-tag type="info">{{item.name}}</el-tag>
              </nuxt-link>
            </el-badge>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
 
<script>
import CategoryService from '@/services/categories'
import TagService from '@/services/tags'

export default {
  layout: 'Public',
  async asyncData() {
    try {
      var [categoryList, tagList] = await Promise.all([
        CategoryService.fetchList(),
        TagService.fetchList()
      ])
    } catch (error) {
      return { categoryList: [], tagList: [] }
    }

    return { categoryList, tagList }
  },
   
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
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
