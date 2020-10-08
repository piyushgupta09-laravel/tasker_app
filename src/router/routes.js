const routes = [

  // General Routes
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },

  // Secured Routes
  {
    path: '/dashboard',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/user/dashboard.vue')
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('pages/user/projects.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/user/profile.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('pages/user/settings.vue')
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/project',
    component: () => import('layouts/SubLayout.vue'),
    children: [
      {
        path: '',
        name: 'project',
        component: () => import('pages/user/project.vue')
      }
    ],
    meta: { requiresAuth: true }
  },

  // Auth Routes
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

  // Fallback Route
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
