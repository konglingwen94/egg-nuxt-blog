import request from './request'

export default {
  fetchOne() {
    return request.get('/aboutus')
  },
  updateOne(id, params) {
    return request.patch(`/aboutus/${id}`, params)
  },
  resetOne(id) {
    return request.put(`/aboutus/${id}`)
  },
  createOne(payload) {
    return request.post('/aboutus', payload)
  },
}
