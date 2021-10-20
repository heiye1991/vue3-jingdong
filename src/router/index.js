import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '@/views/home/Home.vue'),
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: 'shop' */ '@/views/shop/Shop.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(
        /* webpackChunkName: 'register' */ '@/views/register/Register.vue'
      ),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('login')
  if (isLogin) {
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/register' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
