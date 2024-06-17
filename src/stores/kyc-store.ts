import { defineStore } from 'pinia';
import KycInformationType from 'src/types/KycInformationType';
import RolUsuarioEnum from 'src/enums/RolUsuarioEnum';
import GeneroEnum from 'src/enums/GeneroEnum';

const initialState: KycInformationType = {
  rol: RolUsuarioEnum.TURISTA,
  nombre: '',
  apellido: '',
  genero: GeneroEnum.MASCULINO,
  dni: '',
  numTelefono: '',
  foto: '',

  credencial: {
    foto: '',
    numero: '',
    vencimiento: '',
  },
};

export const useKycStore = defineStore('kyc', {
  state: (): KycInformationType => initialState,

  getters: {},

  actions: {},
});
