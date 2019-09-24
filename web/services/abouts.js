import request from './request'
export default {
  fetchData() {
    return request.get('/about')
  },
}
