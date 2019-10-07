import axios from 'axios'
import qs from 'qs'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://106.54.230.205:7001/api'
    : 'http://127.0.0.1:7001/api'

const instance = axios.create({
  baseURL,
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
