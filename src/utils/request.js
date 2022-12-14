import axios from 'axios'
import {
  baseURL
} from '@/utils/index'
import Vue from 'vue'
import store from '@/store/index'
import router from '@/router/index'

// 创建一个axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    token: store.state.token
  }
})

// 默认 post 请求，使用 application/json 形式
service.defaults.headers.post['Content-Type'] = 'application/json'

// 记录请求次数
let needLoadingRequestCount = 0
let loading
// 定时器
let timer

// loading样式
function startLoading () {
  loading = Vue.prototype.$loading({
    text: '服务器繁忙,请耐心等待₍ᐢ.ˬ.⑅ᐢ₎',
    background: 'rgba(0, 0, 0, 0.5)'
  })
}

function endLoading () {
  // 延迟500ms，防止网速特快加载中画面一闪而过
  if (loading) loading.close()
}

// 打开loading
function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    // 如果请求时间超过1s 再出现loading效果
    timer = setTimeout(() => {
      startLoading()
    }, 1000)
  }
  needLoadingRequestCount++
}
// 关闭loading
function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 请求拦截器
service.interceptors.request.use(config => {
  showFullScreenLoading()
  return config
}, err => {
  tryHideFullScreenLoading()
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 清除定时器
  clearTimeout(timer)
  tryHideFullScreenLoading()
  if (response.data.resultCode !== 200) {
    if (response.data.message) response.error(response.data.message)
    if (response.data.resultCode === 419) {
      router.push({
        path: '/login'
      })
    }
    return Promise.reject(response.data)
  }
  return response.data
}, err => {
  tryHideFullScreenLoading()
  if (err.code === 'ERR_NETWORK') {
    Vue.prototype.$message.error('网络出现异常,请刷新重试!')
  }
  return Promise.reject(err)
})

export default service
