import { AuthorizedService } from 'src/api/ServerApi';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';

const BASE_URL = '/viaje';

export const getViajes = async (): Promise<Array<ViajeReviewDTO>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};
