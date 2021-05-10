import { createRouter, createWebHistory } from 'vue-router'
const Home =() => import('../views/home/Home')
const Category =() => import('../views/category/Category')
const Detail =() => import('../views/detail/Detail')
const Profile =() => import('../views/profile/Profile')
const ShoppingCar =() => import('../views/shoppingcar/ShoppingCar')

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
    path: '/shoppingcar',
    name: 'ShoppingCar',
    component: ShoppingCar
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
