import request from './request'

export default {
  fetchList() {
    return request.get('/configurations')
  },

  fetchSiteConfig() {
    return request.get('/configuration-siteconfig')
  },
  fetchProfile() {
    return request.get('/configuration-profile')
  },
  fetchProjectIntro() {
    return request.get('/configuration-projectintro')
  },
}
