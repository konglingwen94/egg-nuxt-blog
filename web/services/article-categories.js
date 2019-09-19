import request from './request'

export default {
  fetchList() {
    return request.get('/article-categories')
  },
  fetchOne(id) {
    return request.get(`/article-categories/${id}`)
  },
  fetchListWithCatetoryID(id) {
    return request.get(`/categories/${id}/articles`)
  },
}
