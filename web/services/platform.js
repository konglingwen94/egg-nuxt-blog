import request from './request'

export default {
  fetchOne(){
    return request.get('/platform')
  }
}