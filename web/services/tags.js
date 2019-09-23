import request from './request'

export default {
  fetchList() {
    return request.get('/tags')
  },

  fetchOne(id) {
    return request.get(`/tags/${id}`)
  },
}
