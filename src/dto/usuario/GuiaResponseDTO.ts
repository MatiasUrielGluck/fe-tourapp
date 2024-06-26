import GeneroEnum from 'src/enums/GeneroEnum';
import ServicioType from 'src/types/ServicioType';
import ReviewType from 'src/types/ReviewType';
import CredencialType from 'src/types/CredencialType';

type GuiaResponseDTO = {
  id: number;
  nombre: string;
  apellido: string;
  mail: string;
  genero: GeneroEnum;
  dni: number;
  foto: string;
  credencial: CredencialType;
  servicios: Array<ServicioType>;
  puntuacion: number;
  reviewCount: number;
  reviews: Array<ReviewType>;
  idiomas: Array<string>;
};

export default GuiaResponseDTO;
