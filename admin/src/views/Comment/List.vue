<template>
  <panel class>
    <div class="header">
      <el-button type="danger" @click="sectionDelete">批量删除</el-button>
    </div>
    <el-table @selection-change="onSectionChange" :data="dataList" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="评论内容">
        <template v-slot="{row}">
          <cell-popover :content="row.content"></cell-popover>
        </template>
      </el-table-column>
      <el-table-column label="文章标题" show-overflow-tooltip prop="article.title"></el-table-column>
      <el-table-column label="文章是否发布">
        <template v-slot="{row}"><span v-if="row.article" :style="{color:row.article.isPublished?'green':'red'}">{{row.article.isPublished?'已发布':'未发布'}}</span></template>
      </el-table-column>
      <el-table-column label="点赞数" prop="thumbupCount"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row,$index}">
          <el-button type="danger" size="small" @click="deleteOne(row.id,$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </panel>
</template>
<script>
import CommentApi from '@/api/comments'
export default {
  data() {
    return {
      dataList: [],
      selectedList: []
    }
  },
  created() {
    const { articleID } = this.$route.params

    const action = articleID
      ? CommentApi.fetchArticleCommentList(articleID)
      : CommentApi.fetchAllCommentList()

    action
      .then(response => {
        this.dataList = response
      })
      .catch(err => {
        this.$message.error(err.message)
      })
  },
  methods: {
    async sectionDelete() {
      if (!this.selectedList.length) {
        this.$message.warning('请勾选您要删除的选项')
        return
      }

      try {
        await this.$confirm(
          '您选中的评论以经删除将无法恢复，是否删除?',
          '提示',
          { type: 'warning' }
        )
      } catch (err) {
        return
      }

      const idList = this.selectedList.map(item => item.id)
      return CommentApi.deleteMany({ idList })
        .then(() => {
          
          this.selectedList.forEach(item => {
            const index = this.dataList.indexOf(item)
            if (index > -1) {
              this.dataList.splice(index, 1)
            }
          })
        })
        .catch(err => {
          Promise.reject(err)
        })
    },
    onSectionChange(selection) {
      this.selectedList = selection
    },
    async deleteOne(id, index) {
      try {
        await this.$confirm('此评论以经删除将无法恢复，是否确定？', '提示', {
          type: 'warning'
        })
      } catch (e) {
        return
      }
      CommentApi.deleteOne(id)
        .then(() => {
          this.$message.success('删除成功')
          this.dataList.splice(index, 1)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>

