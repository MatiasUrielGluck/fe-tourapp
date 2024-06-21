import { AuthorizedService } from 'src/api/ServerApi';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';

const BASE_URL = '/viaje';

export const getViajes = async (): Promise<Array<ViajeReviewDTO>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};

export const confirmTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/confirmar/${id}`);
  return response.data;
};

export const cancelTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/cancelar/${id}`);
  return response.data;
};

export const concludeTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/concluir/${id}`);
  return response.data;
};
