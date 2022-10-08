import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/dashboard'
},
{
  path: '/dashboard',
  name: 'dashboard',
  meta: {
    title: '数据分析'
  },
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Index.vue')
},
{
  path: '/login',
  name: 'login',
  meta: {
    title: '用户登录'
  },
  component: () => import(/* webpackChunkName: "login" */ '@/views/login/Login.vue')
},
{
  path: '/add',
  name: 'add',
  meta: {
    title: '商品管理'
  },
  component: () => import(/* webpackChunkName: "add" */ '@/views/module/Add.vue')
},
{
  path: '/swiper',
  name: 'swiper',
  meta: {
    title: '轮播图配置'
  },
  component: () => import(/* webpackChunkName: "swiper" */ '@/views/home/Swiper.vue')
},
{
  path: '/hot',
  name: 'hot',
  meta: {
    title: '热销商品配置'
  },
  component: () => import(/* webpackChunkName: "hot" */ '@/views/home/Hot.vue')
},
{
  path: '/new',
  name: 'new',
  meta: {
    title: '新品上线配置'
  },
  component: () => import(/* webpackChunkName: "new" */ '@/views/home/New.vue')
},
{
  path: '/recommend',
  name: 'recommend',
  meta: {
    title: '为您推荐配置'
  },
  component: () => import(/* webpackChunkName: "recommend" */ '@/views/home/Recommend.vue')
},
{
  path: '/category',
  name: 'category',
  meta: {
    title: '分类管理'
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
    title: '商品管理'
  },
  component: () => import(/* webpackChunkName: "new" */ '@/views/module/Good.vue')
},
{
  path: '/guest',
  name: 'guest',
  meta: {
    title: '会员管理'
  },
  component: () => import(/* webpackChunkName: "guest" */ '@/views/module/Guest.vue')
},
{
  path: '/order',
  name: 'order',
  meta: {
    title: '订单管理'
  },
  component: () => import(/* webpackChunkName: "order" */ '@/views/module/Order.vue')
},
{
  path: '/order_detail',
  name: 'order_detail',
  component: () => import(/* webpackChunkName: "order_detail" */ '@/views/module/OrderDetail.vue')
},
{
  path: '/account',
  name: 'account',
  meta: {
    title: '修改账户'
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
  // 保存激活地址和名称
  store.commit('SET_ACTIVEPATH', to.path)
  store.commit('SET_ACTIVENAME', to.meta.title)
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
