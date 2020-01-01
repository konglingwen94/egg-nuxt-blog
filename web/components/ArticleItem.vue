<template>
  <div class="wrapper">
    <div class="content">
      <nuxt-link
        class="nuxt-link"
        :to="{name:'articles-id',params:{id:data.id},query:{tagIdList:data.tagIdList}}"
      >{{data.title}}</nuxt-link>

      <div class="text" v-html="data.content.text "></div>

      <div class="bottom">
        <div class="left">
          <el-tag size="small" v-for="(item,index) in data.tagList" :key="index">{{item.name}}</el-tag>
        </div>
        <div class="right">
          <time>{{new Date(data.createdAt).toLocaleString()}}</time>
          <i class="el-icon-view">
            <span>{{data.pv}}</span>
          </i>
          <i class="el-icon-s-comment">
            <span>{{data.commentCount}}</span>
          </i>
          <i class="el-icon-star-on">
            <span>{{data.starCount}}</span>
          </i>
        </div>
      </div>
    </div>

    <div class="cover">
      <img alt="图片加载失败" :src="data.cover && data.cover.path" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  align-items: flex-end;
  // justify-content: space-between;
  .cover {
    width: 200px;
    margin-left: 30px;
    // margin-right: 0;
    img {
      height: 150px;
      width: 100%;
      object-position: center;
      object-fit: cover;
    }
  }
  .content {
    flex: 1;
    width: 0;
    .nuxt-link {
      padding: 20px 0;
      color: #303133;
      font-size: 20px;
      display: block;
      .nowrap-ellipsis(100%);
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
    .text {
      margin-top: 14px;
      color: #606266;
      .text-overflow-hidden(3);
      /deep/img {
        width: 100%;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      color: #909399;
      .left {
        .el-tag {
          margin-right: 9px;
        }
      }

      [class^='el-icon'] {
        vertical-align: middle;
        margin-left: 5px;
        span {
          margin-left: 4px;
        }
      }
      time {
        font-size: 12px;
        letter-spacing: 2px;
      }
    }
  }
}
</style>
