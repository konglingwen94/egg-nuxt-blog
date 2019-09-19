import request from './request'

export default {
  createOne(params) {
    return request.post('/tags', params)
  },
  fetchList(params) {
    return request.get('/tags', { params })
  },
  deleteOne(id) {
    return request.delete(`/tags/${id}`)
  },
  updateOne(id, params) {
    return request.put(`/tags/${id}`, params)
  },
}
