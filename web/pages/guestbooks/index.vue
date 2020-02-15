<template>
  <div class="message">
    message
    <client-only>
      <message-tree :data-list="renderData"></message-tree>
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
    renderData() {
      const rootList = this.dataList.filter(item => !item.parentID)
      const dataList = this.dataList
      function findChildren(parentList) {
        parentList = parentList.map(item => {
          item.children = dataList.filter(sub => sub.parentID === item.id)

          findChildren(item.children)

          return item
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
  }
}
</script>

