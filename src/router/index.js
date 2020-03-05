import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/Chat.vue')
  },
  {
    path: '/my',
    component: () => import('@/views/My.vue'),
    children: [
      {
        path: '/my/myname',
        component: () => import('@/views/Myy/Myname.vue')
      }
    ]
  },
  {
    path: '/:list',
    component: () => import('@/views/List')
  }
]

const router = new VueRouter({
  routes
})

export default router
