import request from './request'

export default {
  fetchOne(){
    return request.get('/platform')
  },
  updateOne(id,payload){
    return request.patch( `/platforms/${id}`,payload)
  }
}