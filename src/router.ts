import { createRouter, createWebHistory } from 'vue-router'

// Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

// @ts-ignore
// @ts-ignore
const routes = [
  {
    path: '/',
    name: 'main',
    redirect: '/board',
    component: () => import('./views/Profile'),
    meta: { transition: 'scale' },
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('./views/Board'),
    meta: { transition: 'scale' },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('./views/Test'),
    meta: { transition: 'scale' },
  },
  {
    path: '/profile',
    name: 'profile',
    redirect: '/profile/dashboard',
    component: () => import('./views/Profile'),
    meta: {},
    children: [
      {
        path: 'dashboard',
        component: () => import('./views/Profile/pages/dashboard'),
      },
      {
        path: 'transactions',
        component: () => import('./views/Profile/pages/transactions'),
      },
      {
        path: 'accounting',
        component: () => import('./views/Profile/pages/account'),
      },
      {
        path: 'important-dates',
        component: () => import('./views/Profile/pages/important-dates'),
      },
      {
        path: 'orders',
        component: () => import('./views/Profile/pages/orders'),
      },
      {
        path: 'order/detail',
        component: () => import('./views/Profile/pages/order-detail'),
      },
      {
        path: 'addresses',
        component: () => import('./views/Profile/pages/my-address'),
      },
      {
        path: 'files',
        component: () => import('./views/Profile/pages/files'),
      },
      {
        path: 'bookmark',
        component: () => import('./views/Profile/pages/bookmark'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/404.vue'),
    meta: {},
  },
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior(to, from, savedPosition) {
    // return desired position
  },
})

router.beforeEach((to, from, next) => {
  //console.log(`Navigating to: ${to.name}`)
  next()
})

router.afterEach((to, from, failure) => {})

export default router
