import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'inicio',
        path: '/',
        component: () => import('pages/dashboard/IndexPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'servicios',
        path: '/servicios',
        component: () => import('pages/dashboard/ServicioPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'viajes',
        path: '/viajes',
        component: () => import('pages/dashboard/ViajePage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'buscar',
        path: '/buscar',
        component: () => import('pages/dashboard/BusquedaPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'viajeDetails',
        path: '/details',
        component: () => import('pages/dashboard/ViajeDetailsPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'chats',
        path: '/chats',
        component: () => import('pages/dashboard/ChatsPage.vue'),
        meta: { transition: 'fade' },
      },
      {
        name: 'chat',
        path: '/chat/:id',
        component: () => import('pages/dashboard/IndividualChatPage.vue'),
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
