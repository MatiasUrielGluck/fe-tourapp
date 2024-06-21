import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { destroyAuthentication } from 'src/helpers/authenticationHelper';
import { useAccountStore } from 'stores/account-store';
import { initializeInstance } from 'src/helpers/initializeInstance';

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === 'history'
  ? createWebHistory
  : createWebHashHistory;

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(process.env.VUE_ROUTER_BASE),
});

Router.beforeEach(async (to, from, next) => {
  const accountStore = useAccountStore();

  try {
    if (
      !localStorage.getItem('token') &&
      to.name !== 'login' &&
      to.name !== 'signup'
    ) {
      destroyAuthentication();
      next({
        name: 'login',
      });
    } else if (!localStorage.getItem('token')) {
      return next();
    } else if (!accountStore.authenticated) {
      await initializeInstance();

      if (!accountStore.kycCompleted) return next({ name: 'kyc' });
      if (to.name === 'login' || to.name === 'signup' || to.name === 'kyc') {
        return next({ name: 'inicio' });
      }
      return next();
    } else if (!accountStore.kycCompleted) {
      next();
    } else if (
      to.name === 'login' ||
      to.name === 'signup' ||
      to.name === 'kyc'
    ) {
      next({ name: 'inicio' });
    } else next();
  } catch (e) {
    console.error(e);
    destroyAuthentication();
    next({
      name: 'login',
    });
  }
});

export default Router;
