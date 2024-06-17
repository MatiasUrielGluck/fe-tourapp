import RolUsuarioEnum from 'src/enums/RolUsuarioEnum';
import GeneroEnum from 'src/enums/GeneroEnum';

type GeneralKycRequestDTO = {
  rol: RolUsuarioEnum;
  nombre: string;
  apellido: string;
  genero: GeneroEnum;
  dni: number;
  numTelefono: string;
  foto: string;
};

export default GeneralKycRequestDTO;
