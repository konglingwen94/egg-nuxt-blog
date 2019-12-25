<template>
  <panel class="guestbook">
    <div slot="header">
      <el-button type="danger" @click="deleteMany">批量删除</el-button>
    </div>
    <el-table
      ref="table"
      :row-key="row=>row.id"
      :expand-row-keys="expandRowKeys"
      :data="dataList"
      border
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-table ref="tableChildren" v-if="row.dialogues.length" :data="row.dialogues">
            <el-table-column ref="selectionColumn" type="selection"></el-table-column>

            <el-table-column label="用户昵称" prop="nickname"></el-table-column>
            <el-table-column label="回复内容">
              <template v-slot="{row}">
                <cell-popover :content="row.content"></cell-popover>
              </template>
            </el-table-column>
            <el-table-column prop="responseTo.nickname" label="@用户"></el-table-column>
            <el-table-column prop="diggCount" label="点赞数量"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{row:response,$index}">
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteOneResponse(response.id,row.dialogues,$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" prop="nickname"></el-table-column>
      <el-table-column label="留言内容">
        <template v-slot="{row}">
          <cell-popover :content="row.content"></cell-popover>
        </template>
      </el-table-column>
      <el-table-column label="回复数量" prop="dialogues.length"></el-table-column>
      <el-table-column prop="diggCount" label="点赞数量"></el-table-column>

      <el-table-column label="创建时间">
        <template v-slot="{row}">{{new Date(row.createdAt).toLocaleString()}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row,$index}">
          <el-button size="mini" type="danger" @click="deleteOne(row.id,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </panel>
</template>

<script>
import GuestbookApi from '@/api/guestbooks'
import _ from 'lodash'

export default {
  data() {
    return {
      selection: [],
      replySelectedList: [],
      expandRowKeys: [],
      action: '',
      originalDataList: []
    }
  },
  computed: {
    dataList() {
      const originalDataList = this.originalDataList

      let guestbookList = originalDataList.filter(item => !item.responseTo)

      guestbookList = guestbookList.map(guestbook => {
        const item = _.omit(guestbook, 'dialogues')

        item.dialogues = []
        guestbook.dialogues.forEach(dialogueID => {
          const response = originalDataList.find(item => item.id === dialogueID)

          if (response && response.responseTo) {
            response.responseTo = originalDataList.find(
              item => item.id === response.responseTo
            )

            item.dialogues.push(response)
          }
        })
        item.dialogues = _.uniq(item.dialogues)
        return item
      })

      return guestbookList
    }
  },
  created() {
    GuestbookApi.fetchList()
      .then(response => (this.originalDataList = response))
      .catch(err => this.$message.error(err.message))
  },
  methods: {
    onExpandChange(row, expandedRows) {
      this.guestbook = row
      const index = expandedRows.indexOf(row)

      if (index > -1) {
        this.expandRowKeys = [row.id]
      }
      // console.log('onExpandChange')
    },

    async deleteMany() {
      const tableComponents = []

      ;(function recursive(component) {
        if (component.$options.name === 'ElTable') {
          tableComponents.push(component)
        }
        component.$children.forEach(childComp => {
          recursive(childComp)
        })
      })(this.$refs.table)

      const selection = tableComponents
        .map(tableComp => tableComp.selection)
        .flat()

      if (!selection.length) {
        this.$message.warning('请选择要删除的选项')
        return
      }

      try {
        await this.$confirm(`留言以经删除将无法恢复，是否删除?`, '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      const idList = selection.map(item => item.id)

      GuestbookApi.deleteMany({ idList })
        .then(() => {
          this.$message.success(`共删除${idList.length}条留言`)
          console.log(this.originalDataList, selection)
          selection.forEach(item => {
            const delIndex = this.originalDataList.indexOf(item)
            this.originalDataList.splice(delIndex, 1)
          })
          // _.pullAll(this.originalDataList, selection)
        })
        .catch(err => this.$message.error(err.message))
    },

    async deleteOne(id, index) {
      try {
        await this.$confirm('此条留言以经删除将无法恢复,是否删除?', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      GuestbookApi.deleteOne(id)
        .then(() => {
          this.$message.success('留言删除成功')
          this.dataList.splice(index, 1)
        })
        .catch(err => this.$message.error(err.message))
    },
    async deleteOneResponse(responseID, dialogues, index) {
      try {
        await this.$confirm('此条回复以经删除将无法恢复,是否删除?', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      GuestbookApi.deleteOneResponse(responseID)
        .then(() => {
          this.$message.success('回复删除成功')
          dialogues.splice(index, 1)
        })
        .catch(err => this.$message.error(err.message))
    }
  }
}
</script>

