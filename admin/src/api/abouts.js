import request from './request'

export default {
  fetchOne() {
    return request.get('/about')
  },
  updateOne(id, params) {
    return request.put(`/abouts/${id}`, params)
  },
  createOne(params) {
    return request.post('/abouts', params)
  },
  deleteOne(id) {
    return request.delete(`/abouts/${id}`)
  },
}
