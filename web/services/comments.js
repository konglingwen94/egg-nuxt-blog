import request from './request'

export default {
  createOne(articleID, params) {
    return request.post(`/articles/${articleID}/comments`, params)
  },
  fetchList(articleID) {
    return request.get(`/articles/${articleID}/comments`)
  },
  deleteOne(id) {
    return request.delete(`/comments/${id}`)
  },
  giveThumbUp(id) {
    return request.post(`/comments/${id}/like`)
  },
}
