import { createRouter, createWebHistory } from 'vue-router'

// components
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'
import Song from '@/views/Song.vue'

// storages
import useUserSore from '@/stores/user'

// routes
const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    path: '/manage-music',
    component: Manage,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const userStore = useUserSore()
  if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
