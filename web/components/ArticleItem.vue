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
      <el-image
        ref="image"
        style="height:160px;width:100%"
        fit="cover"
        :src="data.cover && data.cover.path"
        @error="onImageError"
      >
        <!-- <span slot="error">加载失败</span> -->
        <!-- <span slot="placeholder">暂未加载</span> -->
      </el-image>
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
  },
  methods: {
    async onImageError(e) {
      await this.$nextTick()
      const attrSrc = e && e.path && e.path[0].getAttribute('src')
      const el = this.$refs.image.$el.querySelector('.el-image__error')

      if (!attrSrc) {
        el.innerHTML = '暂无图片'
        return
      }

      try {
        new URL(attrSrc)
      } catch (e) {
        return
      }

      // el.innerHTML = '暂无图片'
      // console.log(e)
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
    /deep/ .el-image__error {
      &:after {
        // content: '暂无图片';
        color: #c0c4cc;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
      }
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
      }
    }
  }
}
</style>
