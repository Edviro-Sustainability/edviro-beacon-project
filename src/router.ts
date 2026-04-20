import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/Landing.vue'),
    meta: { title: 'The Beacon Project | Edviro' },
  },
  {
    path: '/apply',
    name: 'apply',
    component: () => import('./pages/Apply.vue'),
    meta: { title: 'Apply | The Beacon Project' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? 'The Beacon Project | Edviro'
  if (typeof document !== 'undefined') document.title = title
})
