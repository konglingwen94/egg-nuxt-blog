import request from './request'

export default {
  fetchList() {
    return request.get('/messages')
  },
  deleteOne(id) {
    return request.delete(`/messages/${id}`)
  },
  deleteOneResponse(id) {
    return request.delete(`/messages/${id}`)
  },
  deleteMany(idList) {
    return request.delete(`/messages`, { data:{idList} })
  },
  deleteManyReply(id, data) {
    return request.delete(`/messages/${id}/dialogues`, { data })
  },
}
