import request from './request'

export default {
  fetchArticleCommentList(articleID) {
    return request.get(`/articles/${articleID}/comments`)
  },
  fetchAllCommentList() {
    return request.get('/comments')
  },
  deleteOne(id) {
    return request.delete(`/comments/${id}`)
  },
  deleteList(params) {
    return request.delete('/comments', { params })
  },
}
