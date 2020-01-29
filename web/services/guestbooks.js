import request from './request'

export default {
  fetchList() {
    return request.get('/guestbooks')
  },
  createOne(params) {
    return request.post('/messages', params)
  },
  responseToUser(id, params) {
    return request.post(`/messages/${id}/dialogues`, params)
  },
  diggGuestbook(id) {
    return request.post(`/messages/${id}/digg`)
  },
}
