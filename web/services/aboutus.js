import request from './request'
export default {
  fetchData() {
    return request.get('/aboutus')
  },
}
