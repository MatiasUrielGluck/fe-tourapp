import { defineStore } from 'pinia';

const initialState = {
  isPreloaderShowing: false,
};

export const useAppStore = defineStore('app', {
  state: () => initialState,

  getters: {},

  actions: {
    showPreloader() {
      this.isPreloaderShowing = true;
    },

    hidePreloader() {
      this.isPreloaderShowing = false;
    },
  },
});
