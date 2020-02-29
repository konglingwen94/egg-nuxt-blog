<template>
  <div class="article">
    <div ref="banner" v-if="data.cover && data.cover.path" class="banner" :style="bannerStyle">
      <div class="tag-box">
        <el-tag
          size="medium"
          type="info"
          v-for="(tag,index)  in data.tagList"
          :key="index"
        >{{tag.name}}</el-tag>
      </div>

      <h1>{{data.title}}</h1>

      <time>{{new Date(data.createdAt).toLocaleString()}}</time>
    </div>

    <div class="main">
      <section class="content-wrapper">
        <!-- 文章内容 -->
        <div class="content">
          <h1>{{data.title}}</h1>
          <div v-html="data.content && data.content.html"></div>
        </div>
      </section>
      <div class="tag-box">
        <i class="el-icon-collection-tag"></i>
        <nuxt-link
          :to="{name:'articles',query:{tagID:item.id}}"
          v-for="(item,key) in data.tagList"
          :key="key"
        >
          <span class="tag-item">{{item.name}}</span>
        </nuxt-link>
      </div>

      <section class="suggestion-wrapper">
        <el-divider content-position="left">相关推荐</el-divider>
        <suggestion :dataList="suggestionList"></suggestion>
      </section>

      <!-- 评论 -->
      <section class="comment">
        <h4>评论</h4>
        <message-editor
          ref="messageEditor"
          @on-focus="$refs.replyEditor.hide()"
          @on-submit="replyHandler"
        ></message-editor>

        <client-only>
          <message-tree :data-list="data.commentList" @on-reply="onReply">
            <message-editor @on-submit="replyHandler" ref="replyEditor" type="reply" slot="editor"></message-editor>
          </message-tree>
        </client-only>
      </section>
    </div>
    <div class="floating-action-window">
      <el-badge :hidden="data.starCount===0" type="info" :value="data.starCount">
        <div
          @mouseenter="handleMouseEnter($event)"
          @mouseleave="handleMouseLeave($event)"
          class="icon-wrap"
        >
          <i
            @click="handleStarArticle(data.id,data)"
            :class="starArticleIdList.includes(data.id)?'el-icon-star-on':'el-icon-star-off'"
          ></i>
        </div>
        <el-badge
          :value="data.commentList && data.commentList.length"
          type="info"
          :hidden="data.commentList && data.commentList.length===0"
        >
          <div class="icon-wrap icon-wrap-comment">
            <i @click="$refs.messageEditor.focus()" class="el-icon-s-comment"></i>
          </div>
        </el-badge>
      </el-badge>
    </div>
  </div>
</template>


<script>
import ArticleService from '@/services/articles'
import CommentService from '@/services/comments'

export default {
  layout: 'article',
  name: 'ArticleDetail',
  head() {
    const { title } = this.data

    return {
      title
    }
  },

  async asyncData({ params, query }) {
    const { id } = params
    const { tagIdList } = query

    try {
      var [suggestionList, data] = await Promise.all([
        ArticleService.fetchSuggestionList(id, { tagIdList }),
        ArticleService.fetchOne(id)
      ])
    } catch (error) {
      return { suggestionList: [], data: {} }
    }

    return { suggestionList, data }
  },

  data() {
    return {
      buttonLoading: false
    }
  },

  computed: {
    diggCommentIdList() {
      return this.$store.state.article.diggCommentIdList
    },
    starArticleIdList() {
      return this.$store.state.article.starIdList
    },
    bannerStyle() {
      return {
        background: `  url(${this.data.cover.path})no-repeat center/100%`,
        height: '340px',

        textAlign: 'center'
      }
    }
  },
  key(route) {
    return route.fullPath
  },

  mounted() {
    this.recordPv()
  },

  methods: {
    async onReply() {
      await this.$nextTick()

      this.$refs.replyEditor.show()
      this.$refs.replyEditor.resetFields()
      this.$refs.replyEditor.clearValidate()
      this.$refs.replyEditor.focus('content')
    },
    handleMouseLeave(e) {
      if (this.starArticleIdList.includes(this.data.id)) {
        return
      }

      e.target
        .querySelector('.el-icon-star-on')
        .classList.replace('el-icon-star-on', 'el-icon-star-off')
    },
    handleMouseEnter(e) {
      if (this.starArticleIdList.includes(this.data.id)) {
        return
      }
      const el = e.target.querySelector('.el-icon-star-off')
      el.classList.replace('el-icon-star-off', 'el-icon-star-on')
    },
    handleStarArticle(id, item) {
      if (this.starArticleIdList.includes(id)) {
        return
      }

      ArticleService.starOne(id)
        .then(() => {
          this.$message.success('收藏成功')
          item.starCount++
          this.$store.commit('article/addStarId', id)
        })
        .catch(err => this.$message.error(err.message))
    },
    handleThumbUp(id, item) {
      if (this.diggCommentIdList.includes(id)) {
        return
      }
      CommentService.giveThumbUp(id)
        .then(() => {
          item.thumbupCount++
          item.isLike = true
          this.$store.commit('article/addCommentId', id)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    recordPv() {
      return ArticleService.incrementPv(this.$route.params.id).catch(err => {
        this.$message.error(err.message)
      })
    },
    replyHandler(payload) {
      CommentService.createOne(payload).then(() => {})
    },
    handleSave(payload) {
      const articleID = this.$route.params.id

      this.buttonLoading = true

      CommentService.createOne(articleID, payload)
        .then(response => {
          this.data.commentList.unshift(response)
          this.$message.success('评论成功')
          this.buttonLoading = false
          this.$refs.comment.clearField()
        })
        .catch(err => {
          this.$message.error(err.message)

          this.buttonLoading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  max-width: 1100px;
  margin: auto;
  padding-top: 40px;
}

.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  color: white;
  position: relative;
  &:before {
    content: '';
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .el-tag {
    margin-right: 7px;
    border-radius: 13px;
    padding: 0 20px;
  }
  h1 {
    .text-overflow-hidden(1);
  }
}

.content-wrapper {
  h1 {
    text-align: center;
  }
}

.comment {
  margin-top: 30px;
  &-nickname {
    width: 400px;
  }
  .comment-board {
    margin-top: 40px;
    &-item {
      color: #444;
      justify-content: space-between;
      padding-bottom: 40px;
      margin: 35px 0;
      border-bottom: 1px solid #ccc;
      display: flex;
      .icon-user-wrapper {
        font-size: 1.3em;
        margin-right: 20px;
      }
      .comment-text {
        line-height: 1.4;
        flex: 1;
        .nickname {
          color: #409eff;
        }
        .comment-detail {
          margin: 14px 0;
        }
        .comment-footer {
          time {
            font-size: 14px;
            letter-spacing: 2px;
          }
          .el-icon-thumb {
            cursor: pointer;
            float: right;
          }
          .is-like {
            color: blue;
          }
          .thumbup-count {
            margin-left: 4px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
.tag-box {
  margin-top: 40px;
  margin-bottom: 30px;
  .tag-item {
    color: #409eff;
    font-size: 14px;
    margin: 0 4px;
    &:hover {
    padding-bottom: 3px;
    border-bottom:1px solid;
    color:#66b1ff;
    }
  }
}

.floating-action-window {
  position: fixed;
  right: 0px;
  bottom: 100px;
  width: 50px;
  font-size: 22px;

  .icon-wrap {
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    margin-bottom: -3px;
    padding: 4px;
    &-comment:hover {
      color: blue;
    }
  }
}
</style>

