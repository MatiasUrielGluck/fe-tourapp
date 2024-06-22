import { defineStore } from 'pinia';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';

const today = new Date();
const future = new Date(today);
future.setDate(today.getDate() + 6);

const fechaInicial: DateRangeType = {
  from: formatDateSymbol(new Date(), '/'),
  to: formatDateSymbol(future, '/'),
};

const initialState: FiltroDTO = {
  apellido: undefined,
  ciudad: undefined,
  fechaInicio: formatDateSymbol(new Date(fechaInicial.from), '-'),
  fechaFin: formatDateSymbol(new Date(fechaInicial.to), '-'),
  idiomas: undefined,
  nombre: undefined,
  pais: undefined,
  tipoServicio: undefined,
};

export const useGuideQueryStore = defineStore('guideQuery', {
  state: (): FiltroDTO => initialState,

  getters: {},

  actions: {
    setQuery(payload: FiltroDTO) {
      this.$state = payload;
    },
  },
});
