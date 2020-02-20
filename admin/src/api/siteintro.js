import request from './request'

export default {
  fetchOne() {
    return request.get('/siteintro')
  },
  updateOne(id, params) {
    return request.patch(`/siteintro/${id}`, params)
  },
}
