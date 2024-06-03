import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import {
  destroyAuthentication,
  setAccountInfo,
} from 'src/helpers/authenticationHelper';
import { useAccountStore } from 'stores/account-store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
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
        await setAccountInfo();
        if (!accountStore.kycCompleted) return next({ name: 'kyc' });
        if (to.name === 'login' || to.name === 'signup' || to.name === 'kyc') {
          return next({ name: 'dashboard' });
        }
        return next();
      } else if (!accountStore.kycCompleted) {
        next();
      } else if (
        to.name === 'login' ||
        to.name === 'signup' ||
        to.name === 'kyc'
      ) {
        next({ name: 'dashboard' });
      } else next();
    } catch (e) {
      console.error(e);
      destroyAuthentication();
      next({
        name: 'login',
      });
    }
  });

  return Router;
});
