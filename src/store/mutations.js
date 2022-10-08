import * as types from './mutations-types'

const mutations = {
  [types.SET_ACTIVEPATH] (state, value) {
    state.activeIndex = value
  },
  [types.SET_ACTIVENAME] (state, value) {
    state.activeName = value
  },
  [types.SET_LOGINSTATUS] (state, value) {
    state.isLogin = value
  }
}

export default mutations
