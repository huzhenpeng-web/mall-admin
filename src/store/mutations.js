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
  // 保存登录信息
  [types.SAVE_ADMIN] (state, [value1, value2]) {
    state.token = value2
    state.user = value1
    localStorage.setItem('token', value2)
    localStorage.setItem('admin', value1)
  },
  // 清空登录信息
  [types.CLEAR_ADMIN] (state) {
    state.user = {}
    state.token = ''
  },
  // 修改用户昵称
  [types.UPDATE_ADMIN] (state, value) {
    state.user.nickName = value
  }
}

export default mutations
