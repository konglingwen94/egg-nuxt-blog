import request from './request'

export default {
  fetchOneSiteConfig() {
    return request.get('/configuration-siteconfig')
  },
  updateOneSiteConfig(id, params) {
    return request.patch(`/configuration-siteconfigs/${id}`, params)
  },
  fetchOneProjectIntro(){
    return request.get('/configuration-projectintro')
  },
  updateOneProjectIntro(id,payload){
    return request.patch(`/configuration-projectintros/${id}`,payload)
  },
  
}
