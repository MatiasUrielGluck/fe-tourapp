import RolUsuarioEnum from 'src/enums/RolUsuarioEnum';
import GeneroEnum from 'src/enums/GeneroEnum';

type CredentialType = {
  numero: string;
  vencimiento: string;
  foto: string;
};

type KycInformationType = {
  rol: RolUsuarioEnum;
  nombre: string;
  apellido: string;
  genero: GeneroEnum;
  dni: string;
  numTelefono: string;
  foto: string;
  credencial: CredentialType;
  idiomas: Array<string>;
};

export default KycInformationType;
