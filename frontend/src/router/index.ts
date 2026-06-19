import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'

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
  ]
})

export default router