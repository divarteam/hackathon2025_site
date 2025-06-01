import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { deleteCookie, getCookie } from 'cookies-next/client'
import { toast } from 'sonner'

class ApiBase {
  private axios: AxiosInstance
  private baseUrl: string
  apiKey: string

  constructor() {
    // if (typeof window == "undefined") {
    //   console.log('init base api server')
    //   this.apiKey = process.env.BACKEND_API_KEY
    // } else {
    //   console.log('init base api client')
    //   this.apiKey = process.env.NEXT_PUBLIC_BACKEND_API_KEY
    // }
    // console.log('apiBase init')
    // this.baseUrl = BACKEND_URL
    // this.apiKey = BACKEND_API_KEY
    // this.apiKey = getEnvVariable('BACKEND_API_KEY') || '',
    this.baseUrl =
      process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''
    this.apiKey =
      process.env.BACKEND_API_KEY || process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''
    this.axios = axios.create({
      baseURL: `${this.baseUrl}/api`,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
        apikey: this.apiKey,
      },
    })
    this.axios.interceptors.request.use(
      (request) => {
        const token = getCookie('token')
        if (token) {
          request.headers['usertoken'] = token
        }
        return request
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('ERROR', error.response.data)
        console.error(error.response.data.error_description)
        toast(
          error.response.data.error_description
            ? error.response.data.error_description
            : 'Что-то пошло не так :(',
        )
        if (error.response.data.error_code === 'CANNOT_AUTHORIZE') {
          deleteCookie('token')
          setTimeout(() => (window.location.href = '/login'), 1000)
        }
        // const token = getCookie('token')
        // console.log('token', token)
        // if (error.response.status === 401) {
        //     window.location.href = '/auth'
        // }
        // if (error.response.status === 403) {
        //     window.location.href = '/403'
        // }
        // if (error.response.status === 404) {
        //     if (token) {
        //         window.location.href = '/404'
        //     }
        // }
      },
      // { synchronous: true },
    )
  }

  v = (x: number) => `v${x}`
  admin = () => 'admin'

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    // if (typeof window == 'undefined') {
    //   console.log('api server', endpoint)
    // } else {
    //   console.log('api client', endpoint)
    // }

    const response: AxiosResponse<T> = await this.axios.get(endpoint, options)
    return response?.data
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(
      endpoint,
      data,
      options,
    )
    return response?.data
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.patch(
      endpoint,
      data,
      options,
    )
    return response?.data
  }

  async put<T>(
    endpoint: string,
    data: unknown,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(
      endpoint,
      data,
      options,
    )
    return response?.data
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(
      endpoint,
      options,
    )
    return response?.data
  }
}

const apiBase = new ApiBase()
export { apiBase, ApiBase }
// export { ApiBase } TODO: rewrite apiBase logic for availibing in client and server
