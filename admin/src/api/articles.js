import request from './request'

export default {
  create(params) {
    return request.post('/articles', params)
  },
  fetchList(params) {
    return request.get('/articles', { params })
  },
  fetchOne(id) {
    return request.get(`/articles/${id}`)
  },
  updateWithId(id, params) {
    return request.patch(`/articles/${id}`, params)
  },
  deleteWithId(id) {
    return request.delete(`/articles/${id}`)
  },
  deleteMany(idList) {
    return request.delete('/articles', { params: { idList } })
  },
  updatePublishStatus(id, params) {
    return request.patch(`/articles/${id}/status`, params)
  },
}
