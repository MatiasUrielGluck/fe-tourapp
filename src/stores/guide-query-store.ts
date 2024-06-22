import { defineStore } from 'pinia';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import TipoServicioEnum from 'src/enums/TipoServicioEnum';

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
  tipoServicio: TipoServicioEnum.TOUR_INDIVIDUAL,
};

const recoveredState = localStorage.getItem('query');

export const useGuideQueryStore = defineStore('guideQuery', {
  state: (): FiltroDTO =>
    recoveredState ? JSON.parse(recoveredState) : initialState,

  getters: {},

  actions: {
    setQuery(payload: FiltroDTO) {
      this.$state = payload;
      localStorage.setItem('query', JSON.stringify(payload));
    },
  },
});
