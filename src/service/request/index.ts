import axios from 'axios'
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse
} from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

//定义拦截器接口
interface InterceptorHooks {
  requestSuccessFns?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestFailFns?: (error: any) => any
  responseSuccessFns?: (response: AxiosResponse) => AxiosResponse
  responseFailFns?: (error: any) => any
}

//定义初始化axios实例的配置接口
interface MYRequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  interceptorHooks?: InterceptorHooks
}

interface MYData<T> {
  data: T
  returnCode: string
  success: boolean
}

class MYRequest {
  config: AxiosRequestConfig
  interceptorHooks?: InterceptorHooks
  showLoading: boolean
  loading?: LoadingInstance
  instance: AxiosInstance

  constructor(config: MYRequestConfig) {
    this.config = config
    this.interceptorHooks = config.interceptorHooks
    this.showLoading = config.showLoading ?? true
    this.instance = axios.create(config)
    this.setupInterceptor()
  }

  setupInterceptor() {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestSuccessFns,
      this.interceptorHooks?.requestFailFns
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseSuccessFns,
      this.interceptorHooks?.responseFailFns
    )

    this.instance.interceptors.request.use((config) => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T = any>(config: MYRequestConfig): Promise<T> {
    if (!config.showLoading) {
      this.showLoading = false
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, MYData<T>>(config)
        .then((res) => {
          resolve(res.data)
          // this.showLoading = true
        })
        .catch((err) => {
          reject(err)
          // this.showLoading = true
        })
    })
  }

  get<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: MYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default MYRequest
