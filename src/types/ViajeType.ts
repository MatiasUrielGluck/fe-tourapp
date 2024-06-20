import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';

type ViajeType = {
  id: number;
  turistaId: number;
  guiaId: number;
  servicioId: number;
  fechaInicio: string;
  fechaFin: string;
  pais: string;
  ciudad: string;
  estado: EstadosViajeEnum;
};

export default ViajeType;
