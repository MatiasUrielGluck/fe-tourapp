import GenderEnum from 'src/enums/GenderEnum';

type AccountType = {
  isGuide: boolean;
  authenticated: boolean;
  email: string;
  nombre: string;
  apellido: string;
  genero?: GenderEnum;
  dni: number;
  numTelefono: string;
  foto: string;
  kycCompleted: boolean;
};

export default AccountType;
