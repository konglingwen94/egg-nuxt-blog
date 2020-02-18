<template>
  <panel class>
      <el-button slot="header" type="danger" @click="deleteMany">批量删除</el-button>

    <el-table
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
      :data="renderData"
      border
      @selection-change="selectionChange"
    >
      <el-table-column type="selection"></el-table-column>

      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="danger" size="mini" @click="deleteOne(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </panel>
</template>
<script>
import MessageApi from '@/api/messages'
export default {
  name: 'message',
  data() {
    return {
      originalList: []
    }
  },
  computed: {
    renderData() {
      const rootList = this.originalList.filter(item => !item.parentID)

      function findChildren(list, originalList) {
        list.map(item => {
          item.children = originalList.filter(sub => sub.parentID === item.id)
          findChildren(item.children, originalList)

          return item
        })
        return list
      }

      return findChildren(rootList, this.originalList)
    }
  },
  created() {
    MessageApi.fetchList().then(response => {
      this.originalList = response
    })
  },
  methods: {
    selectionChange(selection) {
      this.selection = selection
    },
    async deleteMany() {
      const idList = this.selection.map(item => item.id)
      if (!idList.length) {
        this.$message.error('请选择您要删除的选项')
        return
      }
      try {
        await this.$confirm('选项以经删除将无法恢复，是否确定?', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }


      MessageApi.deleteMany(idList).then(()=>{
        idList.forEach(id=>{
          const delIndex=this.originalList.findIndex(item=>item.id===id)
          this.originalList.splice(delIndex,1)
        })
      }).catch(err=>{
        this.$message.error(err.message)
      })
    },
    async deleteOne(id) {
      try {
        await this.$confirm('此选项以经删除将无法恢复，是否确定', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }
      // const delIndex = this.originalList.findIndex(item => item.id === id)

      // this.originalList.splice(delIndex, 1)

      MessageApi.deleteOne(id)
        .then(() => {
          const delIndex = this.originalList.findIndex(item => item.id === id)

          this.originalList.splice(delIndex, 1)
        })
        .catch(() => {})
    }
  }
}
</script>
