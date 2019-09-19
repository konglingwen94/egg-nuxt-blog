import request from './request'

export default {
  createOne(params) {
    return request.post('/article-categories', params)
  },
  updateOneWithId(id, params) {
    return request.patch(`/article-categories/${id}`, params)
  },
  deleteOneWithId(id) {
    return request.delete(`/article-categories/${id}`)
  },
  fetchList() {
    return request.get(`/article-categories`)
  },
}
