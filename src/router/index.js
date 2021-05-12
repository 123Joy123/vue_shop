import { createRouter, createWebHistory } from 'vue-router'
const Home =() => import('../views/home/Home')
const Category =() => import('../views/category/Category')
const Detail =() => import('../views/detail/Detail')
const Profile =() => import('../views/profile/Profile')
const ShoppingCar =() => import('../views/shoppingcar/ShoppingCar')
const Register =() => import('../views/profile/Register')
const Login =() => import('../views/profile/Login')

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
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/shoppingcar',
    name: 'ShoppingCar',
    component: ShoppingCar
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//导航守卫，next是2的用法
router.beforeEach((to,from,next)=>{
  //用户没有登录，则调转到登录页面
  next()
  // document.title=to.meta.title
})

export default router
