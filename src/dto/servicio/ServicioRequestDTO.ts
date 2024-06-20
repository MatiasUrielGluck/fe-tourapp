import TipoServicioEnum from 'src/enums/TipoServicioEnum';

type ServicioRequestDTO = {
  tipo?: TipoServicioEnum;
  precio?: number;
  pais?: string;
  ciudad?: string;
};

export default ServicioRequestDTO;
