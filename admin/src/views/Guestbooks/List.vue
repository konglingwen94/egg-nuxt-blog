<template>
  <panel class="guestbook">
    <div slot="header">
      <el-button type="danger" @click="deleteMany">批量删除</el-button>
    </div>
    <el-table
      @expand-change="onExpandChange"
      ref="table"
      :row-key="row=>row.id"
      :expand-row-keys="expandRowKeys"
      :data="dataList"
      border
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="expand">
        <template v-slot="{row}">
          <el-table
            ref="tableChildren"
            @selection-change="replySelectionChange"
            :data="row.dialogues"
          >
            <el-table-column type="selection"></el-table-column>

            <el-table-column label="用户昵称" prop="nickname"></el-table-column>
            <el-table-column label="回复内容">
              <template v-slot="{row}">
                <cell-popover :content="row.content"></cell-popover>
              </template>
            </el-table-column>
            <el-table-column prop="responseToUser.nickname" label="@用户"></el-table-column>
            <el-table-column prop="diggCount" label="点赞数量"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="{row:response,$index}">
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteOneResponse(row.id,response.id,row.dialogues,$index)"
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

export default {
  data() {
    return {
      dataList: [],
      selection: [],
      replySelectedList: [],
      expandRowKeys: []
    }
  },
  created() {
    GuestbookApi.fetchList()
      .then(response => (this.dataList = response))
      .catch(err => this.$message.error(err.message))
  },
  methods: {
    onExpandChange(row, expandedRows) {
      this.guestbook = row
      const index = expandedRows.indexOf(row)
      if (index > -1) {
        this.expandRowKeys = [row.id]
      }
    },

    replySelectionChange(selection) {
      this.replySelectedList = selection

      this.action = 'reply'
    },
    async deleteMany() {
      if (!this.selection.length && !this.replySelectedList.length) {
        this.$message.warning('请选择要删除的选项')
        return
      }
      const idList = this.selection.map(item => item.id)

      const replyIdList = this.replySelectedList.map(item => item.id)
      try {
        await this.$confirm(
          `${
            this.action === 'repay' ? '回复' : '留言'
          }以经删除将无法恢复，是否删除?`,
          '提示',
          {
            type: 'warning'
          }
        )
      } catch (error) {
        return
      }

      const action =
        this.action === 'reply'
          ? GuestbookApi.deleteManyReply({ idList: replyIdList })
          : GuestbookApi.deleteMany({ idList })

      action
        .then(() => {
          if (this.action === 'reply') {
            this.$message.success(`共删除${replyIdList.length}条回复`)
          } else {
            this.$message.success(`共删除${idList.length}条留言`)
          }

          this.replySelectedList.forEach(item => {
            const index = this.guestbook.dialogues.indexOf(item)
            if (index > -1) {
              this.guestbook.dialogues.splice(index, 1)
            }
          })

          this.selection.forEach(item => {
            const index = this.dataList.indexOf(item)

            if (index > -1) {
              this.dataList.splice(index, 1)
            }
          })
        })
        .catch(err => this.$message.error(err.message))
    },
    onSelectionChange(selection) {
      this.selection = selection
      this.action = 'guestbook'
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
    async deleteOneResponse(id, responseID, dialogues, index) {
      console.log(arguments)
      try {
        await this.$confirm('此条回复以经删除将无法恢复,是否删除?', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      GuestbookApi.deleteOneResponse(id, responseID)
        .then(() => {
          this.$message.success('回复删除成功')
          dialogues.splice(index, 1)
        })
        .catch(err => this.$message.error(err.message))
    }
  }
}
</script>

