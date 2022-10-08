import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 引入持久化插件
import createPersistedstate from 'vuex-persistedstate'

const PERSIST_PATHS = state

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedstate({
      key: 'vuex', // 保存的key值
      storage: window.sessionStorage,
      paths: PERSIST_PATHS
    })
  ]
})
