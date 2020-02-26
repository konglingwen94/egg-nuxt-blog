<template>
  <div class>
    <Panel>
      <el-button slot="header"   type="danger" @click="deleteMany">批量删除</el-button>
      <el-table :data="dataList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template v-slot="{row}">
            <el-row :gutter="40" type="flex" justify="space-between">
              <el-col>
                <el-card :header="row.title">
                  <div class="article-content">{{row.content.text}}</div>
                  <el-image
                    :src="row.cover && row.cover.path"
                    style="height:100px;width:100px"
                    fit="cover"
                  >
                    <div slot="error">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </el-card>
              </el-col>
              <el-col>
                <el-card>
                  <div class="comments-card-header" slot="header">
                    <div>文章评论</div>
                    <div class>
                      <el-button
                        v-if="selectedCommentList.length"
                        type="danger"
                        size="mini"
                        @click="removeComments(row.comments)"
                      >删除选中评论</el-button>
                    </div>
                  </div>
                  <el-checkbox-group v-model="selectedCommentList">
                    <el-timeline>
                      <el-timeline-item
                        placement="top"
                        v-for="item in row.comments"
                        :key="item.id"
                        :timestamp="new Date(item.createdAt).toLocaleString()"
                      >
                        <div slot="dot">
                          <el-checkbox :label="item.id">{{''}}</el-checkbox>
                        </div>
                        <div class="nickname">{{item.nickname}}</div>
                        <div class="content">{{item.content}}</div>
                      </el-timeline-item>
                    </el-timeline>
                  </el-checkbox-group>
                </el-card>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="所属类别" show-overflow-tooltip>
          <template v-slot="{row}">{{row.category && row.category.name }}</template>
        </el-table-column>
        <el-table-column label="标签" show-overflow-tooltip>
          <template v-slot="{row}">
            <span
              v-if="Array.isArray(row.tagList)"
            >{{row.tagList.map(item=> item && item.name).join(' , ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" show-overflow-tooltip prop="title"></el-table-column>

        <el-table-column label="评论数量" prop="commentCount"></el-table-column>
        <el-table-column prop="pv" label="浏览量(次)"></el-table-column>
        <el-table-column prop="starCount" label="星星个数"></el-table-column>
        <el-table-column prop="pv" label="是否发布">
          <template v-slot="{row}">
            <span
              :style="{color:row.isPublished?'rgb(58, 136, 20)':'#E6A23C'}"
            >{{row.isPublished?'已发布':'未发布'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template v-slot="{row}">{{new Date(row.createdAt).toLocaleString()}}</template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" min-width="190px">
          <template v-slot="{row,$index}">
            <p>
              <el-button type="primary" size="small" @click="updateOne(row)">更新</el-button>
              <el-button
                :type="row.isPublished?'warning':'success'"
                size="small"
                @click="togglePublishStatus(row)"
              >{{row.isPublished?'下线':'发布'}}</el-button>
              <el-button type="danger" size="small" @click="deleteOne(row.id,$index)">删除</el-button>
            </p>

            <!-- <p>
              <el-button type="success" size="small">{{row.isCarousel?'取消轮播图':'设置为轮播图'}}</el-button>
            </p>-->
          </template>
        </el-table-column>
      </el-table>
    </Panel>
  </div>
</template>
<script>
import ArticleApi from '@/api/articles'
import CommentApi from '@/api/comments'

export default {
  data() {
    return {
      dataList: [],
      selectedCommentList: [],
      selection: []
    }
  },

  created() {
    ArticleApi.fetchList()
      .then(response => {
        this.dataList = response
      })
      .catch(err => {
        console.error(err)
        try{
          this.$message.error(err.message)

        }catch(err){

        }

      })
  },
  methods: {
    async removeComments(comments) {
      try {
        await this.$confirm('此数据以经删除将无法恢复，是否删除？', '提示', {
          type: 'warning'
        })
      } catch (error) {
        return
      }
      const idList = this.selectedCommentList
      CommentApi.deleteList({ idList })
        .then(() => {
          this.selectedCommentList = []
          this.$message.success(`共删除${idList.length}条评论`)
          idList.forEach(id => {
            const index = comments.findIndex(item => id === item.id)
            comments.splice(index, 1)
          })
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    async deleteMany() {
      const idList = this.selection.map(item => item.id)
      if (!idList.length) {
        this.$message.info('请选择您要删除的选项')
        return
      }

      try {
        await this.$confirm(
          '您选择的文章以经删除将无法恢复,是否确定 ?',
          '提示',
          {
            type: 'warning'
          }
        )
      } catch (error) {
        return
      }
      ArticleApi.deleteMany(idList)

        .then(() => {
          this.selection.forEach(item => {
            const index = this.dataList.indexOf(item)
            if (index > -1) {
              this.dataList.splice(index, 1)
            }
          })

          this.$message.success(`${idList.length}篇文章删除成功`)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    handleSelectionChange(selection) {
      this.selection = selection
    },
    togglePublishStatus(item) {
      ArticleApi.updatePublishStatus(item.id, {
        isPublished: !item.isPublished
      })
        .then(() => {
          this.$message.success(
            !item.isPublished ? '发布文章成功' : '下线文章成功'
          )

          item.isPublished = !item.isPublished
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    addOne() {
      this.$router.push('/articles/new')
    },

    updateOne({ id }) {
      this.$router.push({
        name: 'ArticleEditor',
        params: { id }
      })
    },
    async deleteOne(id, index) {
      try {
        var confirm = await this.$confirm('您确定要删除此文章吗?', '提示', {
          type: 'warning'
        })
      } catch (err) {
        return
      }

      ArticleApi.deleteWithId(id)
        .then(() => {
          this.dataList.splice(index, 1)
          this.$message.success('文章删除成功')
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.nickname {
  margin-bottom: 9px;
}
time {
  font-size: 12px;
}
.article-content {
  margin-bottom: 12px;
}

.comments-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

