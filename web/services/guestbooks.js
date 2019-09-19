import request from './request'

export default {
  fetchList() {
    return request.get('/guestbooks')
  },
  createOne(params) {
    return request.post('/guestbooks', params)
  },
  responseToUser(id, params) {
    return request.post(`/guestbooks/${id}/dialogues`, params)
  },
  diggGuestbook(id) {
    return request.post(`/guestbooks/${id}/digg`)
  },
  diggResponse(id, responseID) {
    return request.post(`/guestbooks/${id}/responses/${responseID}/digg`)
  },
}
