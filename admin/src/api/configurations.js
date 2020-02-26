import request from './request'

export default {
  fetchAllConfigurations(payload){
    return request.get('/configurations',{params:payload})
  },
  updateSiteConfig(id,payload){
    return request.patch(`/configurations/${id}/site-config`,payload)
  },
  updateProjectIntro(id,payload){
    return request.patch(`/configurations/${id}/project-intro`,payload)
  },
  updateProfile(id,payload){
    return request.patch(`/configurations/${id}/profile`,payload)
  }
}
