import request from './request'

export default {
  fetchList() {
    return request.get('/guestbooks')
  },
  deleteOne(id) {
    return request.delete(`/guestbooks/${id}`)
  },
  deleteOneResponse(id, responseID) {
    return request.delete(`/guestbooks/${id}/dialogues/${responseID}`)
  },
  deleteMany(data) {
    return request.delete(`/guestbooks`, { data })
  },
  deleteManyReply(data) {
    return request.delete('/responses', { data })
  },
}
