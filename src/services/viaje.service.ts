import { AuthorizedService } from 'src/api/ServerApi';
import ViajeType from 'src/types/ViajeType';

const BASE_URL = '/viaje';

export const getViajes = async (): Promise<Array<ViajeType>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};
