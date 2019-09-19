import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
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
