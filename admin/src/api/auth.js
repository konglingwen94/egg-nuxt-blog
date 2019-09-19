import request from './request.js'

export default {
  login(params) {
    return request.post('/auth/login', params)
  },
  changePassword(params) {
    return request.patch('/auth/change-password', params)
  },
  changeNickname(params) {
    return request.patch('/auth/change-account', params)
  },
}
