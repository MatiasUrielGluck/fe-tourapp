import TipoServicioEnum from 'src/enums/TipoServicioEnum';

type ServicioType = {
  id: number;
  tipo: TipoServicioEnum;
  precio: number;
  pais: string;
  ciudad: string;
};

export default ServicioType;
