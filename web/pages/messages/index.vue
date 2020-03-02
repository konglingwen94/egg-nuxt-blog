<template>
  <div class="message">
    <el-divider content-position="left">
      <i class="el-icon-edit-outline"></i>&nbsp;留言板
    </el-divider>
    <message-editor
      @on-focus="$refs.editor.hide()"
      @on-submit="submit('comment',$event)"
      @on-invalid="invalid('comment',$event)"
      ref="commentEditor"
    ></message-editor>
    <el-divider content-position="left">
      <i class="el-icon-s-comment"></i>&nbsp;
      留言墙</el-divider>
    
    <client-only>
      <message-tree @on-thumbup="thumbup($event.id)" @on-reply="reply" :data-list="renderData" :render-layer="options.renderLayer" :default-expand-layer="options.expandLayer">
        <message-editor
          @on-focus="$refs.commentEditor.clearValidate()"
          @on-submit="submit('reply',$event)"
          @on-invalid="invalid('reply',$event)"
          type="reply"
          slot="editor"
          ref="editor"
        ></message-editor>
      </message-tree>
    </client-only>
  </div>
</template>
<script>
import MessageService from '@/services/messages'
export default {
  layout: 'public',
  name: 'message',
  data() {
    return {
      dataList: []
    }
  },
  computed: {
    options(){
      return this.$store.state.configuration.siteConfig.message
    },
    renderData() {
      const dataList = JSON.parse(JSON.stringify(this.dataList))

      const rootList = dataList.filter(item => !item.parentID)
      function findChildren(parentList) {
        parentList.forEach(item => {
          item.children = dataList.filter(sub => sub.parentID === item.id)

          findChildren(item.children || [])

          // return item
        })

        return parentList
      }

      return findChildren(rootList)
    }
  },
  created() {
    MessageService.fetchList().then(response => {
      this.dataList = response
    })
  },
  methods: {
    invalid(type) {
      this.type = type
      this.collapseEditor()
    },
    collapseEditor() {
      
      if (this.type === 'comment') {
        this.$refs.editor.hide()
        
      } else {
        this.$refs.commentEditor.clearValidate()
      }
    },
    reply(payload) {
      // console.log(payload)
      this.$refs.editor.show()
      this.replyParentID = payload.id
      this.$refs.editor.clearValidate()
      this.$refs.editor.focus('content')
    },
    thumbup(id) {
      


      if (this.$store.state.message.diggedIdList.includes(id) || this.thumbupLoading) {
        return
      }
      this.thumbupLoading = true

      MessageService.thumbup(id).then(() => {
        this.$store.commit('message/pushDiggId', id)
        this.dataList.find(item => item.id === id).thumbupCount++
        this.thumbupLoading=false
      })
    },
    submit(type, payload) {
      this.type = type

      const action =
        type === 'comment'
          ? MessageService.createOne(payload)
          : MessageService.replyOne(this.replyParentID, payload)
      // console.log(payload)
this.collapseEditor()
      action
        .then(response => {
          this.dataList.unshift(response)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

