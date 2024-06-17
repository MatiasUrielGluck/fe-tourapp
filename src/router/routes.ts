import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'dashboard',
        path: '/',
        component: () => import('pages/dashboard/IndexPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'settings',
        path: '/settings',
        component: () => import('pages/dashboard/SettingsPage.vue'),
        meta: { transition: 'fade' },
      },
    ],
    meta: { transition: 'fade' },
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    meta: { transition: 'fade' },
  },

  {
    name: 'signup',
    path: '/signup',
    component: () => import('pages/SignupPage.vue'),
    meta: { transition: 'fade' },
  },

  {
    name: 'kyc',
    path: '/kyc',
    component: () => import('pages/kyc/KycPage.vue'),
    meta: { transition: 'fade' },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { transition: 'fade' },
  },
];

export default routes;
