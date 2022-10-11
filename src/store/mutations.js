import * as types from './mutations-types'

const mutations = {
  // 保留激活地址
  [types.SET_ACTIVEPATH] (state, value) {
    state.activeIndex = value
  },
  // 保村激活的页面名称
  [types.SET_ACTIVENAME] (state, value) {
    state.activeName = value
  },
  // 保存登录状态
  [types.SET_LOGINSTATUS] (state, value) {
    state.isLogin = value
  }
}

export default mutations
