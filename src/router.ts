import { createRouter, createWebHistory } from 'vue-router'

// Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  //Main page
  {
    path: '/',
    name: 'main',
    redirect: '/profile',
    component: () => import('./views/main.vue'),
    meta: { transition: 'scale' },
    children: [
      {
        path: '/board',
        name: 'board',
        component: () => import('./views/Board/index.vue'),
        meta: { transition: 'scale' },
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('./views/Test/index.vue'),
        meta: { transition: 'scale' },
      },
      {
        path: '/profile',
        name: 'profile',
        redirect: '/profile/dashboard',
        component: () => import('./views/Profile/index.vue'),
        meta: {},
        children: [
          {
            path: 'dashboard',
            component: () => import('./views/Profile/pages/dashboard.vue'),
          },
          {
            path: 'transactions',
            component: () => import('./views/Profile/pages/transactions.vue'),
          },
          {
            path: 'accounting',
            component: () => import('./views/Profile/pages/account.vue'),
          },
          {
            path: 'important-dates',
            component: () => import('./views/Profile/pages/important-dates.vue'),
          },
          {
            path: 'orders',
            component: () => import('./views/Profile/pages/orders.vue'),
          },
          {
            path: 'order/detail',
            component: () => import('./views/Profile/pages/order-detail.vue'),
          },
          {
            path: 'addresses',
            component: () => import('./views/Profile/pages/my-address.vue'),
          },
          {
            path: 'files',
            component: () => import('./views/Profile/pages/files.vue'),
          },
          {
            path: 'bookmark',
            component: () => import('./views/Profile/pages/bookmark.vue'),
          },
          {
            path: 'register-design',
            component: () => import('./views/Profile/pages/register-design.vue'),
          },
        ],
      },
    ],
  },
  //full page
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login/index.vue'),
    meta: { transition: 'scale' },
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
