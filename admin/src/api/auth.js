import request from './request.js'

export default {
  login(params) {
    return request.post('/auth/login', params)
  },
  changePassword(id, params) {
    return request.put(`/accounts/${id}/change-password`, params)
  },
  updateAccount(id, params) {
    return request.put(`/accounts/${id}`, params)
  },
}
