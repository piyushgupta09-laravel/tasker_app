const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  {
    path: '/dashboard',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/user/dashboard.vue')
      }
    ],
    meta: { requiresAuth: true }
  },

  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/auth/Register.vue')
      },
      {
        path: '/forgot',
        name: 'forgot',
        component: () => import('pages/auth/Forgot.vue')
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
