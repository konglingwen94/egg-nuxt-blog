import request from './request'

export default {
  fetchList() {
    return request.get('/categories')
  },
  fetchOne(id) {
    return request.get(`/categories/${id}`)
  },
  fetchListWithCatetoryID(id) {
    return request.get(`/categories/${id}/articles`)
  },
}
