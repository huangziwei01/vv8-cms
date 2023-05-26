import MYRequest from './request'
import { API_BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
import { ElNotification } from 'element-plus'

export default new MYRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    requestSuccessFns: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestFailFns: (err) => {
      return err
    },
    responseSuccessFns: (res) => {
      return res.data
    },
    responseFailFns: (err) => {
      ElNotification({
        title: 'Title',
        message: err.msg
      })
      return err
    }
  }
})
