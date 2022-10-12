import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
  pathMap
} from '@/utils/index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  name: 'login',
  meta: {
    title: pathMap.login,
    requireAuth: false // 不需要权限
  },
  component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
}, {
  path: '/index',
  component: () => import(/* webpackChunkName: "home" */ '@/components/layout/Index.vue'),
  meta: {
    requireAuth: true // 需要权限
  },
  children: [{
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: pathMap.dashboard,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Index.vue')
  },
  {
    path: '/add',
    name: 'add',
    meta: {
      title: '添加商品',
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "add" */ '@/views/module/Add.vue')
  },
  {
    path: '/swiper',
    name: 'swiper',
    meta: {
      title: pathMap.swiper,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "swiper" */ '@/views/home/Swiper.vue')
  },
  {
    path: '/hot',
    name: 'hot',
    meta: {
      title: pathMap.hot,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "hot" */ '@/views/home/Hot.vue')
  },
  {
    path: '/new',
    name: 'new',
    meta: {
      title: pathMap.new,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "new" */ '@/views/home/New.vue')
  },
  {
    path: '/recommend',
    name: 'recommend',
    meta: {
      title: pathMap.recommend,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "recommend" */ '@/views/home/Recommend.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta: {
      title: pathMap.category,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "category" */ '@/views/module/Category.vue')
  },
  {
    path: '/category/level2',
    name: 'level2',
    component: () => import(/* webpackChunkName: "level2" */ '@/views/module/Level2.vue'),
    meta: {
      requireAuth: true // 需要权限
    }
  },
  {
    path: '/category/level3',
    name: 'level3',
    component: () => import(/* webpackChunkName: "level3" */ '@/views/module/Level3.vue'),
    meta: {
      requireAuth: true // 需要权限
    }
  },
  {
    path: '/good',
    name: 'good',
    meta: {
      title: pathMap.good,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "new" */ '@/views/module/Good.vue')
  },
  {
    path: '/guest',
    name: 'guest',
    meta: {
      title: pathMap.guest,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "guest" */ '@/views/module/Guest.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: pathMap.order,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "order" */ '@/views/module/Order.vue')
  },
  {
    path: '/order_detail',
    name: 'order_detail',
    meta: {
      title: pathMap.order_detail,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "order_detail" */ '@/views/module/OrderDetail.vue')
  },
  {
    path: '/account',
    name: 'account',
    meta: {
      title: pathMap.account,
      requireAuth: true // 需要权限
    },
    component: () => import(/* webpackChunkName: "account" */ '@/views/user/Account.vue')
  }
  ]
}]

const router = new VueRouter({
  routes
})

// 路由的前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.meta.requireAuth) { // 权限验证
  // 保存激活地址和名称
    store.commit('SET_ACTIVEPATH', to.path)
    store.commit('SET_ACTIVENAME', to.meta.title)
    // 修改页面标题
    document.title = to.meta.title
    next()
  } else { // 不需要权限验证 直接放行
    return next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
