import axios from 'axios'
// import { Message } from 'element-ui'

// 创建一个axios实例
const service = axios.create({
  baseURL: '',
  timeout: 5000
})

// 默认 post 请求，使用 application/json 形式
service.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default service
