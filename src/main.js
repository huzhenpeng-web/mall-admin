import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// loading动画
import loading from 'vue-nice-loading'

// 引入全局样式
import '@/assets/css/global.css'
import '@/plugins/elementui'

// 引入animate.css
import 'animate.css'

Vue.use(loading)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
