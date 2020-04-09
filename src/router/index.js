import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/home'
  }, ,
  {
    path: '/detail/:contentId',
    component: () => import('@/views/Detail.vue'),
    children: [{
        path: '/detail/:contentId/serve',
        component: () => import('@/views/Detail/serve.vue')
      },
      {
        path: '/detail/:contentId/dynamic',
        component: () => import('@/views/Detail/dynamic.vue')
      },
      {
        path: '/detail/:contentId',
        redirect: '/detail/:contentId/serve'
      }
    ]
  }, {
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
    children: [],
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/my/myname',
    component: () => import('@/views/Center/MyCenter')
  },
  {
    path: '/:list',
    component: () => import('@/views/List')
  },

]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/chat' || to.path === '/my' || to.path === '/my/myname') {
    axios.get("/ajax/isLogin").then(function (data) {
      if (!data.data.error) {
        next()
      } else {
        next('/login');
      }
    });
  } else {
    next()
  }

  // to代表将要跳转的路由
  // from代表当前的路由
  // next是个函数，可以用next()让路由继续加载

})
export default router
