import request from './request'

export default {
  fetchList() {
    return request.get('/messages')
  },

  replyOne(id,payload) {
    return request.post(`/messages/${id}/reply`, payload)
  },
  createOne(params) {
    return request.post('/messages', params)
  },
  responseToUser(id, params) {
    return request.post(`/messages/${id}/dialogues`, params)
  },
  thumbup(id) {
    return request.post(`/messages/${id}/digg`)
  },
}
