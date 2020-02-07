import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//首页
const index = () => import('../pages/index.vue')
const home = () => import('../pages/home.vue')
const cart = () => import('../pages/cart.vue')
const my = () => import('../pages/my.vue')
const sort = () => import('../pages/sort.vue')
const list = () => import('../pages/list.vue')
const login = () => import('../pages/login.vue')
const register = () => import('../pages/register.vue')
const details = () => import('../pages/details.vue')
//设置
const set = () => import('../pages/set.vue')

//收货地址
const address = () => import('../pages/address.vue')
const myaddress = () => import('../pages/myaddress.vue')
//修改密码
const xiugai = () => import('../pages/xiugai.vue')
//店铺申请
const shop = () => import('../pages/shop.vue')
//收藏
const collection=()=>import('../pages/collection.vue')
//确认订单
const order=()=>import('../pages/order.vue')
//购买页面
const buy=()=>import('../pages/buy.vue')
//全部订单
const all=()=>import('../pages/all.vue')
const fahuo=()=>import('../pages/fahuo.vue')
const harvest=()=>import('../pages/harvest.vue')
const comment=()=>import('../pages/comment.vue')

//评价
const pingjia=()=>import('../pages/pingjia.vue')


export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'home',
          component: home
        },
        {
          path: 'sort',
          component: sort,
    
        },
        {
          path: 'my',
          component: my
        },
        {
          path: 'cart',
          component: cart
        },

        {
          path: '',
          redirect: 'home'
        },

      ]
    },
    {
      path: '/list/:name',
      component: list
    }, {
      path: '/shop',
      component: shop
    },
    {path:'/order',
  component:order
  },
    {
      path: '/details/:id',
      component: details
    },
    {
      path: '/xiugai',
      component: xiugai
    },
    {
      path:'/collection',
      component:collection
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/myaddress',
      component: myaddress
    },
    {
      path: '/set',
      component: set
    },
    {
      path: '/address/:id',
      component: address
    },
    {
      path: '/buy',
      component: buy,
      children:[
        {
          path:'all',
          component:all
        },
        {
          path:'fahuo',
          component:fahuo
        },
        {
          path:'harvest',
          component:harvest
        },
        {
          path:'comment',
          component:comment
        },
        {
          path:'',
          redirect:'all'
        }
      ]
    },
    {
      path:'/pingjia',
      component:pingjia
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
