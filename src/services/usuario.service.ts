import { AuthorizedService } from 'src/api/ServerApi';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';

const BASE_URL = '/usuario';

export const getFilteredGuides = async (
  params: FiltroDTO
): Promise<Array<GuiaResponseDTO>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/guia/buscar`, {
    params,
  });
  return response.data;
};
