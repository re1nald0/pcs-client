
const routes = [
  {
    path: '/inicio',
    name: 'inicio',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Inicio.vue') }
    ]
  },
  {
    meta: { requiresAuth: true },
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'principal',
        name: 'principal',
        component: () => import('pages/Principal.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
