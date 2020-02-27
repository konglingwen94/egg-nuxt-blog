<template>
  <div class="editor-wrapper">
    <el-form label-width="auto">
      <el-form-item label="文章分类" required>
        <el-select clearable placeholder="请选择文章分类" v-model="form.categoryID">
          <el-option
            :value="item.id"
            :label="item.name"
            v-for="item in categoryList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select multiple clearable placeholder="请添加文章标签" v-model="form.tagIdList">
          <el-option :value="item.id" :label="item.name" v-for="item in tagList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章标题" required>
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="文章内容" required>
        <pell
          ref="markdown"
          @change="content=>Object.assign(form.content,content)"
          :initialMarkdown="form.content"
        ></pell>
      </el-form-item>

      <el-form-item label="缩略图">
        <upload
          @remove="onUploadRemove"
          @success="response=>Object.assign(form.cover,response)"
          :file-list="fileList"
        ></upload>
      </el-form-item>
      <el-form-item label="是否发布">
        <el-switch v-model="form.isPublished"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ArticleApi from '@/api/articles'
import CategoryApi from '@/api/categories'
import TagApi from '@/api/tags'
 

export default {
  name: 'article-editor',
  data() {
    return {
      form: {
        title: '',
        content: {
          html: '',
          text: ''
        },
        cover: { name: '', path: '' },
        categoryID: '',
        tagIdList: [],
        isPublished: false
      },

      categoryList: [],
      tagList: [],
      fileList: []
    }
  },
  computed: {
    action() {
      return this.currentId ? 'edit' : 'create'
    },
    currentId() {
      return this.$route.params.id
    }
  },

  beforeRouteLeave(from, to, next) {
    this.form = {
      title: '',
      content: {
        html: '',
        text: ''
      },
      cover: { name: '', path: '' },
      categoryID: '',
      tagIdList: [],
      isPublished: false
    }
    this.fileList=[]
    this.$refs.markdown.clearContent()
    next()
  },

  methods: {
    onUploadRemove() {
      this.form.cover = { name: '', path: '' }
    },
    handleSubmit() {
      const {
        isPublished,
        tagIdList,
        categoryID,
        title,
        content,
        cover
      } = this.form

      if (!categoryID) {
        this.$message.error('请选择文章分类')
        return
      }

      if (!title) {
        this.$message.error('请输入文章标题')
        return
      }

      if (!content.html) {
        this.$message.error('请输入文章内容')
        return
      }

      const payload = {
        title,
        content,
        cover,
        categoryID,
        tagIdList,
        isPublished
      }

      const action =
        this.action === 'create'
          ? ArticleApi.create(payload)
          : ArticleApi.updateWithId(this.currentId, payload)

      action
        .then(data => {
          if (this.action === 'create') {
            this.$message.success('添加文章成功')
          } else {
            this.$message.success('更新文章成功')
          }

          this.$router.push('/articles')
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
     
  },

  created() {
    
    if (this.action === 'edit') {
      ArticleApi.fetchOne(this.currentId)
        .then(response => {
          _.assign(this.form, _.pick(response, _.keys(this.form)))

          if (!response.cover.path) {
            return
          }
          this.fileList.push({
            name: response.cover.name,
            url: response.cover.path
          })
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    
    } 
    CategoryApi.fetchList()
      .then(response => {
        this.categoryList = response
      })
      .catch(err => {
        this.$message.error(err.message)
      })
    TagApi.fetchList()
      .then(response => {
        this.tagList = response
      })
      .catch(err => {
        this.$message.error(err.message)
      })
  }
}
</script>

<style lang="less" scoped>
.editor-wrapper {
  width: 700px;
}
/deep/.el-select {
  width: 100%;
}
</style>

 