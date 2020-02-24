import request from './request'

export default {
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
