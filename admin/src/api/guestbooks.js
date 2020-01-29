import request from './request'

export default {
  fetchList() {
    return request.get('/guestbook-messages')
  },
  deleteOne(id) {
    return request.delete(`/messages/${id}`)
  },
  deleteOneResponse(id) {
    return request.delete(`/guestbooks/${id}`)
  },
  deleteMany(data) {
    return request.delete(`/guestbooks`, { data })
  },
  deleteManyReply(id, data) {
    return request.delete(`/guestbooks/${id}/dialogues`, { data })
  },
}
