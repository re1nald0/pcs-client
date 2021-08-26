
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
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: () => import('pages/Usuarios.vue')
      },
      {
        path: 'fila',
        name: 'fila',
        component: () => import('pages/Fila.vue')
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
