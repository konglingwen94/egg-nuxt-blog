import request from './request'

export default {
  fetchOwnerTagsList(params) {
    return request.get('/ownertags-articles', { params })
  },
  fetchOwnerCategoriesList(params) {
    return request.get('/ownercategories-articles', { params })
  },
  fetchList(params) {
    return request.get('/articles', { params })
  },
  fetchCarouselList(params) {
    return request.get('/article-carousels', { params })
  },
  fetchSuggestionList(id, params) {
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
