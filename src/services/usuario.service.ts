import { AuthorizedService } from 'src/api/ServerApi';
import NotificatonResponseDTO from 'src/dto/notification/NotificatonResponseDTO';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';

const BASE_URL = '/usuario';

export const getFilteredGuides = async (
  params: FiltroDTO
): Promise<Array<NotificatonResponseDTO>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/guia/buscar`, {
    params,
  });
  return response.data;
};
