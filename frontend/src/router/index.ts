import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
import { useUserStore } from '../composables/useUserStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Users/HomePage.vue') as Promise<{ default: Component }>
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Admins/DashboardHome.vue') as Promise<{ default: Component }>
    },
    {
      path: '/teachers/search',
      name: 'search',
      component: () => import('../views/Users/Teachers/SearchPage.vue') as Promise<{ default: Component }>
    },
    {
      path: '/teachers/result',
      name: 'result',
      component: () => import('../views/Users/Teachers/ResultPage.vue') as Promise<{ default: Component }>
    },
    {
      path: '/login',
      name: 'login',
      meta: { hideNavbar: true },
      component: () => import('../views/LoginView.vue')
    },
    // Unknown route : redirection home
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ]
})

router.beforeEach(async (to) => {
  const { ready, fetchMe, isLoggedIn, role } = useUserStore()

  if (!ready.value) {
    await fetchMe()
  }

  const isLoginPage = to.path === '/login'

  if (!isLoggedIn.value) {
    return isLoginPage ? true : '/login'
  }

  if (isLoginPage) {
    return role.value === 'Admin' ? '/dashboard' : '/'
  }

  if (to.path.startsWith('/dashboard') && role.value !== 'Admin') {
    return '/'
  }

  return true
})

export default router