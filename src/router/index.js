import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
// import { useStore } from 'vuex'
import store from '../store'
import { Toast,Notify } from 'vant';
const Home =() => import('../views/home/Home')
const Category =() => import('../views/category/Category')
const Detail =() => import('../views/detail/Detail')
const Profile =() => import('../views/profile/Profile')
const ShoppingCar =() => import('../views/shoppingcar/ShoppingCar')
const Register =() => import('../views/profile/Register')
const Login =() => import('../views/profile/Login')
const CreateOrder =() => import('../views/order/CreateOrder')
const OrderDetail =() => import('../views/order/OrderDetail')


const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      isAuthRequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/shoppingcar',
    name: 'ShoppingCar',
    component: ShoppingCar,
    meta:{
      isAuthRequired:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/createorder',
    name: 'CreateOrder',
    component: CreateOrder,
  },
  {
    path: '/orderdetail',
    name: 'OrderDetail',
    component: OrderDetail,
  },
]

const router = createRouter({
  //打包要改成hash模式
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

//导航守卫，next是2的用法
router.beforeEach((to,from,next)=>{
  //用户没有登录，则调转到登录页面
  if(to.meta.isAuthRequired && store.state.user.isLogin===false){
    Notify('请先登录')
    return next('/login')
  }else{
    next()
  }
})

export default router
