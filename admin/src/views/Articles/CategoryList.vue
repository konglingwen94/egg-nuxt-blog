<template>
  <panel>
    <div slot="header">
      <el-button @click="handleAdd" type="primary">添加文章分类</el-button>
    </div>

    <el-table :data="dataList" border>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="分类名称" prop="name"></el-table-column>
      <el-table-column label="文章数量" prop="articleIdList.length"></el-table-column>
      <el-table-column label="已发布文章数量" prop="publishedArticleCount"></el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="{row}">{{new Date(row.createdAt).toLocaleString()}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row,$index}">
          <el-button @click="editOne(row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteOne(row.id,$index)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible="dialogVisible" @close="closeDialog" :title="dialogTitle">
      <el-form label-width="auto">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button slot="footer" @click="handleSubmit">确定</el-button>
    </el-dialog>
  </panel>
</template>

<script>
import ArticleCategoryService from '@/api/categories'

export default {
  data() {
    return {
      form: {
        name: ''
      },
      dialogVisible: false,
      dataList: [],
      action: ''
    }
  },
  created() {
    ArticleCategoryService.fetchList()
      .then(response => {
        this.dataList = response
      })
      .catch(err => {
        this.$message.error(err.message)
      })
  },
  computed: {
    dialogTitle() {
      return this.action === 'create' ? '添加文章分类' : '编辑文章分类'
    }
  },
  methods: {
    openDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
      this.resetDialog()
    },
    resetDialog() {
      this.form.name = ''
    },
    handleAdd() {
      this.action = 'create'
      this.openDialog()
    },
    async deleteOne(id, index) {
      try {
        await this.$confirm('此文章分类以经删除将无法恢复，是否删除?', '警告', {
          type: 'warning'
        })
      } catch (error) {
        return
      }

      ArticleCategoryService.deleteOneWithId(id)
        .then(() => {
          this.dataList.splice(index, 1)
          this.$message.success('删除成功')
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    editOne(item) {
      this.action = 'edit'
      this.editingItem = item
      _.assign(this.form, _.pick(item, _.keys(this.form)))
      this.openDialog()
    },
    handleSubmit() {
      const { name } = this.form

      if (!name) {
        this.$message.error('请输入文章分类名称')
        return
      }

      const payload = { name }

      const action =
        this.action === 'create'
          ? ArticleCategoryService.createOne(payload)
          : ArticleCategoryService.updateOneWithId(this.editingItem.id, payload)

      action
        .then(response => {
          if (this.action === 'create') {
            this.dataList.unshift(response)
          } else {
            _.assign(this.editingItem, payload)
          }

          this.$message.success(`${this.dialogTitle}成功`)
          this.closeDialog()
        })
        .catch(err => {
          this.closeDialog()
          this.$message.error(err.message)
        })
    }
  }
}
</script>

