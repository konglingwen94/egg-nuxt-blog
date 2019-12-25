<template>
  <div class="guestbook">
    <div class="header">
      <el-divider content-position="left">
        <i class="icon el-icon-edit-outline">
          <span class="text">留言板</span>
        </i>
      </el-divider>
    </div>

    <div class="guestbook-form">
      <el-alert
        show-icon
        :title="`@${responseTo.nickname}`"
        type="info"
        @close="onClose"
        v-show="action==='response'"
      ></el-alert>
      <el-form size="small">
        <el-form-item>
          <el-input
            clearable
            ref="input"
            :placeholder="form.placeholder"
            :autosize="{ minRows: 4, maxRows: 6}"
            type="textarea"
            v-model="form.content"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            clearable
            class="nickname-input"
            :maxLength="14"
            placeholder="输入您的昵称"
            v-model="form.nickname"
          ></el-input>
          <el-button @click="handleSend">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class>
      <el-divider content-position="left">
        <i class="icon el-icon-s-comment">
          <span class="text">留言墙</span>
        </i>
      </el-divider>
      <ul class="guestbook-list">
        <template v-for="(item,index) in dataList">
          <li class="guestbook-item" :key="index">
            <div class>
              <el-badge
                type="warning"
                :hidden="!item.dialogues.length"
                :value="item.dialogues.length"
              >
                <el-avatar size="medium" icon="el-icon-user-solid"></el-avatar>
              </el-badge>
              <span class="nickname">{{item.nickname}}</span>
              <time class="timer">{{new Date(item.createdAt).toLocaleString()}}</time>
            </div>
            <dl class="message">
              <dt>
                <span class="content">{{item.content}}</span>

                <div class="stat-reply">
                  <el-link type="primary" @click="handleResponse(item,index)" :underline="false">回复</el-link>
                </div>
              </dt>
              <dd v-for="response in item.dialogues" :key="response.id">
                <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
                <div class="nickname-wrapper">
                  <span class="nickname" :title="response.nickname">{{response.nickname}}</span>&nbsp;:&nbsp;
                </div>
                <div class="content-wrapper">
                  <span>{{response.content}}</span>
                  <span
                    v-if="response.responseTo && !response.responseTo.dialogues.length"
                  >//@{{response.responseTo.nickname}} : {{response.responseTo.content}}</span>
                  <div class="bottom-operation">
                    <div class="left">
                      <time>{{new Date(response.createdAt).toLocaleString()}}</time>
                    </div>
                    <div class="right">
                      <el-link
                        type="primary"
                        @click="handleResponse(item,index,response)"
                        :underline="false"
                      >
                        <i class="el-icon-chat-line-square"></i>回复
                      </el-link>
                      <i
                        @click="handleDigg(item.id,response)"
                        :class="getIsDiggClassName(response.id)"
                        class="el-icon-thumb"
                      >
                        <span class="count">{{response.diggCount?response.diggCount:'赞'}}</span>
                      </i>
                    </div>
                  </div>
                </div>
              </dd>
            </dl>
          </li>
          <el-divider :key="index"></el-divider>
        </template>
      </ul>
    </div>

    <div @click="$refs.input.focus()" class="floating-action-guestbook">
      <el-badge type="info" :value="dataList.length" :hidden="dataList.length===0">
        <div class="icon-wrapper">
          <i class="el-icon-s-comment"></i>
        </div>
      </el-badge>
    </div>
  </div>
</template>

<script>
import GuestbookService from '@/services/guestbooks'
export default {
  layout: 'Public',
  asyncData({ redirect }) {
    return GuestbookService.fetchList()
      .then(response => {
        return { dataList: response }
      })
      .catch(err => {
        redirect({ statusCode: 404, message: 'NotFound' })
      })
  },
  computed: {
    diggIdList() {
      return this.$store.state.guestbookDiggIdList
    }
  },
  mounted() {
    this.$refs.input.focus()
  },
  data() {
    return {
      action: 'message',
      index: -1,
      guestbookID: '',
      form: {
        kind: '',
        nickname: '',
        content: '',
        placeholder: '欢迎留言!',
        responseTo: ''
      },
      responseTo: {}
    }
  },
  methods: {
    handleDigg(id, response) {
      if (this.diggIdList.includes(response.id)) {
        return
      }

      GuestbookService.diggGuestbook(response.id)
        .then(() => {
          this.$store.commit('pushDiggId', response.id)
          this.$message.success('点赞成功')
          response.diggCount++
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    getIsDiggClassName(id) {
      const is_digg = this.diggIdList.includes(id)
      return {
        is_digg
      }
    },
    onClose() {
      this.$refs.input.focus()
      this.action = 'message'
      this.form.placeholder = '欢迎您留言'
      this.form.content = ''
      this.responseTo = {}
      this.guestbookID = ''
      this.index = -1
      this.form.kind = ''
    },
    handleResponse(item, index, response) {
      window.scrollTo(0, 0)
      this.index = index
      this.action = 'response'
      this.guestbookID = item.id

      if (response) {
        this.form.placeholder = `回复${response.nickname}`
        this.responseTo = response
        this.form.kind = 'Dialogue'
      } else {
        this.form.kind = 'Guestbook'

        this.form.placeholder = `回复${item.nickname}`
        this.responseTo = item
      }

      this.form.content = ''
      this.$refs.input.focus()
    },
    handleSend() {
      const { nickname, content, responseTo, kind } = this.form

      if (!content) {
        this.$message.warning('请输入您的留言内容!')
        return
      }
      if (!nickname) {
        this.$message.warning('请输入您的昵称!')
        return
      }

      const payload = { nickname, content }

      payload.responseTo = this.responseTo.id
      if (this.form.kind) {
        payload.kind = this.form.kind
      }

      const action =
        this.action === 'response'
          ? GuestbookService.responseToUser(this.guestbookID, payload)
          : GuestbookService.createOne(payload)

      action
        .then(response => {
          if (this.action === 'response') {
            this.$message.success('回复留言成功')
            this.dataList.splice(this.index, 1, response)
          } else {
            this.dataList.unshift(response)
            this.$message.success('添加留言成功')
          }

          this.guestbookID = ''
          this.form.nickname = ''
          this.form.placeholder = '欢迎留言!'
          this.form.content = ''
          this.action = ''
          this.responseTo = {}
          this.index = -1
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.guestbook {
  padding: 40px 30px;
  line-height: 1.5;
  color: #222;
  .icon {
    .text {
      margin-left: 4px;
    }
  }
}

.header {
  display: flex;
  align-items: center;
}

.guestbook-form {
  .el-alert {
    margin-bottom: 12px;
  }
  .nickname-input {
    width: 200px;
  }
}

.guestbook-list {
  .guestbook-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
    .nickname {
      color: #406599;
    }
    .message {
      margin-left: 40px;

      .stat-reply {
        margin-top: 3px;
      }

      dd,
      dt {
        margin-bottom: 10px;
      }

      dd {
        display: flex;
        align-items: baseline;
        margin-bottom: 16px;
        .nickname-wrapper {
          margin-left: 3px;
          .nowrap-ellipsis(80px);
        }
        .content-wrapper {
          flex: 1;
          line-height: 1.5;
          color: #333;
          .bottom-operation {
            display: flex;
            justify-content: space-between;

            .right {
              width: 100px;
              .el-icon-chat-line-square {
                margin-right: 3px;
                vertical-align: -1px;
              }
              .el-icon-thumb {
                cursor: pointer;
                margin-right: 2px;
                margin-left: 4px;
              }
              .is_digg {
                color: blue;
              }
              .count {
                margin-left: 4px;
                font-size: 14px;
              }
            }
          }
        }
      }

      .el-link {
        color: #406599;
        vertical-align: baseline;
      }
    }
    time {
      font-size: 12px;
      color: #333;
    }
  }
}
.floating-action-guestbook {
  position: fixed;
  right: 24px;
  bottom: 90px;
  .icon-wrapper {
    padding: 7px 8px;
    background: #fff;

    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    &:hover {
      color: blue;
    }
  }
}
</style>
