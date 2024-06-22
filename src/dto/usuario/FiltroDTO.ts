import TipoServicioEnum from 'src/enums/TipoServicioEnum';

type FiltroDTO = {
  nombre?: string;
  apellido?: string;
  pais?: string;
  ciudad?: string;
  tipoServicio?: TipoServicioEnum;
  fechaInicio: string;
  fechaFin: string;
  idiomas?: string;
};

export default FiltroDTO;
