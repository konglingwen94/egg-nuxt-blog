<template>
  <div class>
    <el-tabs @tab-click="toggleTab" v-model="activeName">
      <el-tab-pane name="list" label="标签列表">
        <el-table :data="dataList" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column label="封面">
            <template v-slot="{row}">
              <el-image :src="row.cover.path" style="height:60px" :preview-src-list="[row.cover.path]" fit="cover"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="articleCount" label="文章数量"></el-table-column>
          <el-table-column prop="articlePublishedCount" label="已发布文章数量"></el-table-column>
          <el-table-column label="更新时间">
            <template v-slot="{row}">{{new Date(row.updatedAt).toLocaleTimeString()}}</template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template v-slot="{row}">{{new Date(row.createdAt).toLocaleTimeString()}}</template>
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
          <el-form-item label="封面">
            <upload
              :file-list="fileList"
              @remove="form.cover={path:'',name:''} "
              @success="response=>Object.assign(form.cover,response)"
            ></upload>
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
      fileList: [],
      activeName: 'list',
      action: 'create',
      form: {
        name: '',
        cover: { path: '', name: '' }
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
      const { name, cover } = this.form
      if (!name) {
        this.$message.warning('请输入标签名称')
        return
      }

      if (!cover.path) {
        this.$message.warning('请上传图片')
        return
      }

      const payload = { name, cover }

      const action =
        this.action === 'edit'
          ? TagApi.updateOne(this.editingItem.id, payload)
          : TagApi.createOne(payload)

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
      this.form.cover = { name: '', path: '' }
      this.fileList = []
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
      _.assign(this.form, _.pick(row, ['name', 'cover']))
      const { path, name } = this.form.cover
      if (path) {
        this.fileList = [{ url: path, name }]
      }
    }
  }
}
</script>
