import request from './request'

export default {
  createOne(params) {
    return request.post('/categories', params)
  },
  updateOneWithId(id, params) {
    return request.patch(`/categories/${id}`, params)
  },
  deleteOneWithId(id) {
    return request.delete(`/categories/${id}`)
  },
  fetchList() {
    return request.get(`/categories`)
  },
}
