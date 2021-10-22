import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: 'home' */ '@/views/home/Home.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () =>
      import(/* webpackChunkName: 'shop' */ '@/views/shop/Shop.vue'),
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () =>
      import(
        /* webpackChunkName: 'orderConfirmation' */ '@/views/orderConfirmation/OrderConfirmation.vue'
      ),
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () =>
      import(
        /* webpackChunkName: 'cartList' */ '@/views/cartList/CartList.vue'
      ),
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () =>
      import(
        /* webpackChunkName: 'orderList' */ '@/views/orderList/OrderList.vue'
      ),
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
    component: () =>
      import(
        /* webpackChunkName: 'personalInfo' */ '@/views/personalInfo/PersonalInfo.vue'
      ),
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
