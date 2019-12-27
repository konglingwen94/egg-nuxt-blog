<template>
  <div class>
    <el-tabs @tab-click="toggleTab" v-model="activeName">
      <el-tab-pane name="list" label="标签列表">
        <el-table :data="dataList" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="articleCount" label="文章数量"></el-table-column>
          <el-table-column prop="articlePublishedCount" label="已发布文章数量"></el-table-column>
          <el-table-column label="更新时间">
            <template v-slot="{row}">{{new Date(row.updatedAt).toLocaleTimeString()}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row,$index}">
              <el-button type="primary" @click="editOne(row.id,row)" size="small">编辑</el-button>
              <el-button type="danger" @click="deleteOne(row.id,$index)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="action" :label="tagAction">
        <el-form>
          <el-form-item label="名称">
            <el-input ref="input" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TagApi from '@/api/tags'
export default {
  name: 'Tag',
  data() {
    return {
      dataList: [],
      activeName: 'list',
      action: 'create',
      form: {
        name: ''
      }
    }
  },
  computed: {
    tagAction() {
      return this.action === 'edit' ? '编辑标签' : '添加标签'
    }
  },
  watch: {
    activeName() {
      setTimeout(this.$refs.input.focus)
    }
  },
  created() {
    TagApi.fetchList()
      .then(response => {
        this.dataList = response
      })
      .catch(err => this.$message.error(err.message))
  },
  methods: {
    handleSubmit() {
      const { name } = this.form
      if (!name) {
        this.$message.error('请输入标签名称')
        return
      }

      const action =
        this.action === 'edit'
          ? TagApi.updateOne(this.editingItem.id, { name })
          : TagApi.createOne({ name })

      action
        .then(response => {
          if (this.action === 'edit') {
            this.editingItem.name = name
            this.$message.success('标签编辑成功')
          } else {
            this.$message.success('标签添加成功')
            this.dataList.unshift(response)
          }
          this.resetTab()
        })
        .catch(err => this.$message.error(err.message))
    },
    resetTab() {
      this.activeName = 'list'
      this.action = 'create'
      this.form.name = ''
    },
    toggleTab(activeInstance) {
      if (activeInstance.name === 'list') {
        this.resetTab()
      }
    },
    async deleteOne(id, index) {
      try {
        await this.$confirm('此标签以经删除将无法恢复, 是否继续 ?', '提示', {
          type: 'warning'
        })
      } catch (err) {
        return
      }

      TagApi.deleteOne(id)
        .then(() => {
          this.$message.success('删除成功')
          this.dataList.splice(index, 1)
        })
        .catch(err => this.$message.error(err.message))
    },
    editOne(id, row) {
      this.editingItem = row
      this.activeName = 'action'
      this.action = 'edit'
      _.assign(this.form, _.pick(row, ['name']))
    }
  }
}
</script>
