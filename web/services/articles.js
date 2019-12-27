import request from './request'

export default {
  fetchList(params) {
    return request.get('/articles', { params })
  },
  fetchCarouselList(params) {
    return request.get('/articles/carousels', { params })
  },
  fetchSuggestionList(id,params) {
    return request.get(`/articles/${id}/suggestion`, { params })
  },
  fetchOne(id) {
    return request.get(`/articles/${id}`)
  },
  incrementPv(id) {
     
    return request.patch(`/articles/${id}/visit`)
  },
  starOne(id) {
    return request.patch(`/articles/${id}/star`)
  },
}
