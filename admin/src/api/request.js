import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from '@/router.js'

let loading

const instance = axios.create({
  baseURL: '/api/admin',
})

const configuration = {
  useToken: true,
  getToken() {
    return localStorage.accessToken
  },
}

instance.interceptors.request.use(
  config => {
    if (configuration.useToken) {
      let token = configuration.getToken()
      if (token) {
        config.headers['Authorization'] = token
      }
    }

    loading = Loading.service()
    return Promise.resolve(config)
  },
  err => {
    loading.close()
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    loading.close()
    const requestMethod = response.config.method
    console.log(response)
    if (requestMethod === 'patch' || requestMethod === 'delete') {
      if (requestMethod === 'patch') {
        if (response.data.ok === 1) {
          Message.success(`更新${response.data.nModified}条数据`)
        } else {
          Message.error('更新失败')
        }
      } else if (requestMethod === 'delete') {
        if (response.data.ok === 1) {
          Message.success(`删除${response.data.deletedCount}条数据`)
        } else {
          Message.error('删除失败')
        }
      }

      if (response.data.ok !== 1) {
        return Promise.reject(response.data)
      }
    }
    return Promise.resolve(response.data)
  },
  err => {
    loading.close()
    if (err.response.status === 401) {
      router.push('/auth/login')
      localStorage.removeItem('adminInfo')
      localStorage.removeItem('accessToken')
      return
    }

    if (err.response) {
      Message.error(err.response.data.message)
      return Promise.reject(err.response.data)
    } else {
      Message.error(err.message)
      return Promise.reject(err)
    }
  }
)

export default instance
