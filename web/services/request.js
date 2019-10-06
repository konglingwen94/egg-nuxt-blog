import axios from 'axios'
import qs from 'qs'

const baseURL = process.env.BASE_URL + '/api'
// const baseURL = 'http://106.54.230.205:7001' + '/api'

// console.log('process.env.BASE_URL\t', process.env.BASE_URL)

const instance = axios.create({
  baseURL: '/api',
})

instance.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    return Promise.resolve(config)
  },
  err => {
    if (err) {
      return Promise.reject(err)
    }
    return Promise.resolve(config)
  }
)
instance.interceptors.response.use(
  response => {
    return Promise.resolve(response.data)
  },
  err => {
    if (err.response) {
      return Promise.reject(err.response.data)
    }
  }
)

export default instance
