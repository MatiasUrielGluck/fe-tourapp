import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import AccountType from 'src/types/AccountType';

type ViajeType = {
  id: number;
  turista: AccountType;
  guia: AccountType;
  servicioId: number;
  fechaInicio: string;
  fechaFin: string;
  pais: string;
  ciudad: string;
  estado: EstadosViajeEnum;
};

export default ViajeType;
