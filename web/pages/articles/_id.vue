<template>
  <div class="article">
    <div
      ref="banner"
      v-if="data.cover.path"
      class="banner"
      :style="bannerStyle"
    >{{data.tagList.map(item=>item.name).join(' ')}}</div>

    <div class="main">
      <section class="content-wrapper">
        <!-- 文章内容 -->
        <div class="content">
          <h1>{{data.title}}</h1>
          <div v-html="data.content.html"></div>
        </div>
      </section>
      <section class="suggestion-wrapper">
        <el-divider content-position="left">相关推荐</el-divider>
        <side-bar :dataList="suggestionList"></side-bar>
      </section>

      <!-- 评论 -->
      <section class="comment">
        <h4>评论</h4>
        <el-form>
          <el-form-item class="comment-textarea">
            <el-input
              ref="input"
              type="textarea"
              :cols="30"
              placeholder="请输入评论内容"
              :rows="7"
              v-model="commentForm.content"
              :autosize="{ minRows: 5, maxRows: 5}"
              :maxlength="200"
            ></el-input>
          </el-form-item>
          <el-form-item class="comment-nickname">
            <el-input
              :maxlength="10"
              type="text"
              v-model="commentForm.nickname"
              placeholder="请输入您的昵称"
            >
              <el-button @click="handleSave" slot="append" type="button">保存</el-button>
            </el-input>
          </el-form-item>
        </el-form>

        <ul class="comment-board">
          <li class="comment-board-item" v-for="item in data.commentList" :key="item.id">
            <div class="icon-user-wrapper">
              <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
            </div>
            <div class="comment-text">
              <el-link type="primary" :underline="false" class="nickname">{{item.nickname}}</el-link>
              <div class="comment-detail">{{item.content}}</div>
              <div class="comment-footer">
                <time>{{new Date(item.createdAt).toLocaleString()}}</time>
                <i
                  @click="handleThumbUp(item.id,item)"
                  :class="{'is-like':item.thumbupCount>0}"
                  class="el-icon-thumb el-icon"
                >
                  <span class="thumbup-count">{{item.thumbupCount>0?item.thumbupCount:'赞'}}</span>
                </i>
              </div>
            </div>
          </li>
        </ul>
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
          :value="data.commentList.length"
          type="info"
          :hidden="data.commentList.length===0"
        >
          <div class="icon-wrap icon-wrap-comment">
            <i @click="$refs.input.focus()" class="el-icon-s-comment"></i>
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
  layout: 'Article',
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
        ArticleService.fetchSuggestionList({ tagIdList }),
        ArticleService.fetchOne(id)
      ])
    } catch (error) {
      return { suggestionList: [], data: {} }
    }

    const index = suggestionList.findIndex(item => item.id === id)
    suggestionList.splice(index, 1)

    return { suggestionList, data }
  },
 
  data() {
    return {
      showSideBar: true,
      commentForm: {
        content: '',
        nickname: ''
      }
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
        background: `url(${this.data.cover.path})no-repeat top/100%`,
        height: '300px',
        color: 'red',
        fontSize: '50px',
        textAlign: 'center',
        lineHeight: 3
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
          this.$message.success('感谢您的小星星')
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
    handleSave() {
      const { content, nickname } = this.commentForm
      if (!content) {
        this.$message.error('请输入评论内容!')
        return
      }

      if (!nickname) {
        this.$message.error('请输入您的邮箱!')
        return
      }

      const { id: articleID } = this.$route.params
      const payload = { content, nickname }

      CommentService.createOne(articleID, payload)
        .then(response => {
          this.data.commentList.unshift(response)
          this.commentForm.content = ''
          this.commentForm.nickname = ''
        })
        .catch(err => this.$message.error(err.message))
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  max-width: 1100px;
  margin: auto;
  padding-top: 100px;

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

  .suggestion-wrapper {
    margin-top: 50px;
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

