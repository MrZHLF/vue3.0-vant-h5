import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('./../layout/index.vue'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive:false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/Detail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
