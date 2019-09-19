import request from './request'

export default {
  fetchList(params) {
    return request.get('/articles', { params })
  },
  fetchSuggestionList(params) {
    return request.get('/articles/suggestion', { params })
  },
  fetchOne(id) {
    return request.get(`/articles/${id}`)
  },
  incrementPv(id) {
    return request.put(`/articles/${id}/visit`)
  },
  starOne(id) {
    return request.patch(`/articles/${id}/star`)
  },
}
