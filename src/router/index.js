import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { pathMap } from '@/utils/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/dashboard'
},
{
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: pathMap.dashboard
  },
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Index.vue')
},
{
  path: '/login',
  name: 'login',
  meta: {
    title: pathMap.login
  },
  component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
},
{
  path: '/add',
  name: 'add',
  meta: {
    title: '添加商品'
  },
  component: () => import(/* webpackChunkName: "add" */ '@/views/module/Add.vue')
},
{
  path: '/swiper',
  name: 'swiper',
  meta: {
    title: pathMap.swiper
  },
  component: () => import(/* webpackChunkName: "swiper" */ '@/views/home/Swiper.vue')
},
{
  path: '/hot',
  name: 'hot',
  meta: {
    title: pathMap.hot
  },
  component: () => import(/* webpackChunkName: "hot" */ '@/views/home/Hot.vue')
},
{
  path: '/new',
  name: 'new',
  meta: {
    title: pathMap.new
  },
  component: () => import(/* webpackChunkName: "new" */ '@/views/home/New.vue')
},
{
  path: '/recommend',
  name: 'recommend',
  meta: {
    title: pathMap.recommend
  },
  component: () => import(/* webpackChunkName: "recommend" */ '@/views/home/Recommend.vue')
},
{
  path: '/category',
  name: 'category',
  meta: {
    title: pathMap.category
  },
  component: () => import(/* webpackChunkName: "category" */ '@/views/module/Category.vue'),
  children: [{
    path: '/category/level2',
    name: 'level2',
    component: () => import(/* webpackChunkName: "level2" */ '@/views/module/Level2.vue')
  },
  {
    path: '/category/level3',
    name: 'level3',
    component: () => import(/* webpackChunkName: "level3" */ '@/views/module/Level3.vue')
  }
  ]
},
{
  path: '/good',
  name: 'good',
  meta: {
    title: pathMap.good
  },
  component: () => import(/* webpackChunkName: "new" */ '@/views/module/Good.vue')
},
{
  path: '/guest',
  name: 'guest',
  meta: {
    title: pathMap.guest
  },
  component: () => import(/* webpackChunkName: "guest" */ '@/views/module/Guest.vue')
},
{
  path: '/order',
  name: 'order',
  meta: {
    title: pathMap.order
  },
  component: () => import(/* webpackChunkName: "order" */ '@/views/module/Order.vue')
},
{
  path: '/order_detail',
  name: 'order_detail',
  meta: {
    title: pathMap.order_detail
  },
  component: () => import(/* webpackChunkName: "order_detail" */ '@/views/module/OrderDetail.vue')
},
{
  path: '/account',
  name: 'account',
  meta: {
    title: pathMap.account
  },
  component: () => import(/* webpackChunkName: "account" */ '@/views/user/Account.vue')
}
]

const router = new VueRouter({
  routes
})
// 解决重复路由的错误
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 路由的前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!store.state.isLogin) {
    return next('/login')
  }
  // 保存激活地址和名称
  store.commit('SET_ACTIVEPATH', to.path)
  store.commit('SET_ACTIVENAME', to.meta.title)
  // 修改页面标题
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
