import request from './request'

export default {
  fetchOne() {
    return request.get('/about')
  },
  updateOne(id, params) {
    return request.patch(`/abouts/${id}`, params)
  },
  resetOne(id) {
    return request.put(`/abouts/${id}`)
  },
  createOne(payload) {
    return request.post('/abouts', payload)
  },
}
