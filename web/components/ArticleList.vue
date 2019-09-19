<template>
  <div class="wrapper">
    <div class="content">
      <article-item :data="data" v-for="(data ,index) in dataList" :key="index"></article-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  created() {},
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding: 20px;
}
</style>
