import { defineStore } from 'pinia';
import AccountType from 'src/types/AccountType';

const initialState: AccountType = {
  authenticated: false,

  isGuide: false,
  email: '',
  nombre: '',
  apellido: '',
  genero: undefined,
  dni: 0,
  numTelefono: '',
  foto: '',
  kycCompleted: false,
};

export const useAccountStore = defineStore('account', {
  state: (): AccountType => initialState,

  getters: {},

  actions: {
    setAccount(payload: AccountType) {
      this.$state = payload;
      this.authenticated = true;
    },

    resetAccount() {
      this.$state = initialState;
    },
  },
});
